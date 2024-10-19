"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import benefitOpns from "@/constants/data/benefits.json";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postJobSchema } from "@/lib/validator";
import { swalFailed, swalSuccess, swalWarning } from "@/lib/helpers/swal";
import JobPostForm from "@/Components/Forms/JobPostForm";
import Spinner from "@/Components/Loaders/Spinner";

type Schema = z.infer<typeof postJobSchema>;

type FormData = {
  job_role: string;
  job_description: string;
  job_location: string; // need to make it as string[] later
  industry: string;
  employment_type: string;
  experience_needed: string;
  skills_required: string[];
  benefits: string[];

  how_to_apply: string;
  apply_url: string;
  application_deadline: string;

  currency_type: string;
  annual_salary_min: number;
  annual_salary_max: number;

  // prefetched data
  company_name?: string;
  company_photo?: File | null;
  company_website?: string;
  company_photo_url?: string;
};

const EditJobForm = ({ params }: { params: { jobId: string } }) => {
  const router = useRouter();
  const jobId = params.jobId;
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

  const [formData, setFormData] = useState<FormData>({
    job_role: "",
    job_description: "",
    job_location: "",
    industry: "",
    employment_type: "",
    experience_needed: "",
    skills_required: [],
    benefits: [],

    how_to_apply: "",
    apply_url: "",
    application_deadline: "",

    currency_type: "USD",
    annual_salary_min: 0,
    annual_salary_max: 0,

    company_name: "",
    company_photo: null,
    company_website: "",
    company_photo_url: "",
  });

  const [currencyList, setCurrencyList] = useState<string[]>([]);
  const [currencyRates, setCurrencyRates] = useState<{ [key: string]: number }>(
    { USD: 1 }
  );

  const [isPosting, setIsPosting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [handleError, setHandleError] = useState({
    jobDescriptionError: "",
    howToApplyError: "",
    minsalMaxsalError: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      job_role: "",
      apply_url: "",
    },
  });

  benefitOpns.sort((a, b) => {
    const aInSubset = formData.benefits!.includes(a);
    const bInSubset = formData.benefits!.includes(b);

    if (aInSubset && bInSubset) {
      return formData.benefits!.indexOf(a) - formData.benefits!.indexOf(b);
    } else if (aInSubset) {
      return -1;
    } else if (bInSubset) {
      return 1;
    } else {
      return 0;
    }
  });

  // To Fetch data of the job post
  useEffect(() => {
    const fetchCompanyProfile = async () => {
      const baseurl = process.env.NEXT_PUBLIC_BASE_URL; // Your base URL from environment variables
      const access_token = localStorage.getItem("access_token"); // Access access_token from localStorage

      try {
        const response = await axios.get(
          `${baseurl}/accounts/company-profile/`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        // console.log(response);

        if (response.status === 200) {
          setFormData((prevData) => ({
            ...prevData,
            company_name: response.data.company_name,
            company_website: response.data.company_website,
            company_photo: null, // this is done intentionally to avoid photo upload
            company_photo_url: response.data.company_photo_url,
          }));
        }
      } catch (error: any) {
        console.error("Error fetching company profile", error);
      }
    };

    const fetchJobData = async () => {
      const access_token =
        typeof window !== "undefined"
          ? localStorage.getItem("access_token")
          : null;

      if (access_token) {
        try {
          const response = await axios.get(`${baseurl}/jobs/${jobId}/`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });

          // console.log(response.data);
          reset({
            job_role: response.data.job_role,
            apply_url: response.data.apply_url,
          });

          setFormData((prevData) => ({
            ...prevData,
            job_role: response.data.job_role,
            job_description: response.data.job_description,
            job_location: response.data.job_location,
            industry: response.data.industry,
            employment_type: response.data.employment_type,
            experience_needed: response.data.experience_needed,
            skills_required: splitStringByComma(response.data.skills_required),
            benefits: splitStringByComma(response.data.benefits),
            how_to_apply: response.data.how_to_apply,
            apply_url: response.data.apply_url,
            application_deadline: response.data.application_deadline,
            currency_type: "USD",
            annual_salary_min: response.data.annual_salary_min,
            annual_salary_max: response.data.annual_salary_max,
          }));

          setIsLoaded(true);
        } catch (error: any) {
          console.error(error);
          swalFailed({ title: "Failed to fetch job data 🤖", type: "toast" });
        }
      }
    };

    fetchCompanyProfile();
    fetchJobData();
  }, [jobId, reset, baseurl]);

  const splitStringByComma = (inputString: string): string[] => {
    return inputString.split(",").map((tag) => tag.trim());
  };

  const currencyInBaseUSD = (currencyType: string, amount: number) => {
    // console.log(currencyType, amount);
    const rate = currencyRates[currencyType];
    // console.log(rate);
    // console.log(Math.round(amount / rate));
    return Math.round(amount / rate);
  };

  // To handle errors manually for minSal and maxSal
  useEffect(() => {
    if (
      (formData.job_description === "" ||
        formData.job_description === "<p><br></p>") &&
      isFormDirty
    ) {
      setHandleError((prevState) => ({
        ...prevState,
        jobDescriptionError: "This Field is Required",
      }));
    } else {
      setHandleError((prevState) => ({
        ...prevState,
        jobDescriptionError: "",
      }));
    }
  }, [formData.job_description, isFormDirty]);

  useEffect(() => {
    if (
      (formData.how_to_apply === "" ||
        formData.how_to_apply === "<p><br></p>") &&
      isFormDirty
    ) {
      setHandleError((prevState) => ({
        ...prevState,
        howToApplyError: "This Field is Required",
      }));
    } else {
      setHandleError((prevState) => ({
        ...prevState,
        howToApplyError: "",
      }));
    }
  }, [formData.how_to_apply, isFormDirty]);

  useEffect(() => {
    if (
      Number(formData.annual_salary_min) > Number(formData.annual_salary_max)
    ) {
      // console.log("Min Salary should be less than Max Salary");
      setHandleError((prevState) => {
        return {
          ...prevState,
          minsalMaxsalError:
            "Minimum salary should be less than maximum salary",
        };
      });
    } else {
      setHandleError((prevState) => ({
        ...prevState,
        minsalMaxsalError: "",
      }));
    }
  }, [formData.annual_salary_min, formData.annual_salary_max]);

  const onSubmit = async (data: Schema) => {
    if (
      handleError.minsalMaxsalError ||
      handleError.jobDescriptionError ||
      handleError.howToApplyError
    )
      return;

    if (isPosting) return;

    setIsPosting(true);

    const token = localStorage.getItem("access_token");
    const job_update_url = `${baseurl}/jobs/${jobId}/update/`; // Update your endpoint
    // Prepare your payload and send the update request...
    const { job_role, apply_url } = data;
    const {
      job_description,
      job_location,
      industry,
      employment_type,
      experience_needed,
      skills_required,
      benefits,

      how_to_apply,
      application_deadline,

      currency_type,
      annual_salary_min,
      annual_salary_max,
    } = formData;

    let skills = "";
    for (let i = 0; i < skills_required.length; i++) {
      skills = skills + skills_required[i];
      if (i < skills_required.length - 1) {
        skills = skills + ",";
      }
    }

    const removeEmojis = (text: string) => {
      return text
        .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
        .trim();
    };

    let allBenefits = "";
    for (let i = 0; i < benefits.length; i++) {
      allBenefits = allBenefits + removeEmojis(benefits[i]);
      if (i < benefits.length - 1) {
        allBenefits = allBenefits + ",";
      }
    }

    // console.log("updating job");

    const payload = {
      job_role,
      job_description,
      job_location,
      industry,
      employment_type,
      experience_needed,
      skills_required: skills,
      benefits: allBenefits,

      how_to_apply,
      apply_url,
      application_deadline,

      currency_type: "USD",
      annual_salary_min:
        currency_type !== "USD"
          ? currencyInBaseUSD(currency_type, Number(annual_salary_min))
          : annual_salary_min,
      annual_salary_max:
        currency_type !== "USD"
          ? currencyInBaseUSD(currency_type, Number(annual_salary_max))
          : annual_salary_max,
    };
    // console.log(payload);

    // Check if any required fields are empty
    const hasEmptyFields = Object.values(payload).some((value) => !value);
    if (hasEmptyFields) {
      swalWarning({ title: "Please fill in all the fields", type: "toast" });
      setIsPosting(false);
      return;
    }

    try {
      const response = await axios.put(job_update_url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Uncomment if needed for debugging
      // console.log(response.data);
      // console.log("Job Post Updated Successfully");

      swalSuccess({
        title: "Job Post Updated Successfully",
        type: "toast",
      });
      router.push("/postedJobs");
    } catch (error) {
      // Uncomment if needed for debugging
      // console.error("There was an error registering the job!", error);

      swalFailed({ title: "Error occurred at server 🤖", type: "toast" });
    }

    setIsPosting(false);
  };

  // console.log(formData.application_deadline);

  return (
    <>
      {isLoaded ? (
        <JobPostForm
          type="edit"
          previewMode={previewMode}
          setPreviewMode={setPreviewMode}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          watch={watch}
          errors={errors}
          formData={formData}
          setFormData={setFormData}
          currencyList={currencyList}
          setCurrencyList={setCurrencyList}
          setCurrencyRates={setCurrencyRates}
          handleError={handleError}
          isDirty={isDirty}
          isFormDirty={isFormDirty}
          setIsFormDirty={setIsFormDirty}
          isPosting={isPosting}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-[100dvh]">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default EditJobForm;
