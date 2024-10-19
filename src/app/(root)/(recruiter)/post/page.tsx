"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postJobSchema } from "@/lib/validator";
import { swalFailed, swalSuccess, swalWarning } from "@/lib/helpers/swal";
import JobPostForm from "@/Components/Forms/JobPostForm";
import CompanyDetailsModal from "@/Components/Modals/CompanyDetailsModal";
import { CgDanger } from "react-icons/cg";
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

const JobForm = () => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
  const [isLoading, setIsLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMissingDataFilled, setIsMissingDataFilled] =
    useState<boolean>(false);

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
  } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      job_role: "",
      apply_url: "",
    },
  });

  const currencyInBaseUSD = (currencyType: string, amount: number) => {
    // console.log(currencyType, amount);
    const rate = currencyRates[currencyType];
    // console.log(rate);
    // console.log(Math.round(amount / rate));
    return Math.round(amount / rate);
  };

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
      setHandleError((prevState) => ({
        ...prevState,
        minsalMaxsalError: "Minimum salary should be less than maximum salary",
      }));
    } else {
      setHandleError((prevState) => ({
        ...prevState,
        minsalMaxsalError: "",
      }));
    }
  }, [formData.annual_salary_min, formData.annual_salary_max]);

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
          // setCompanyData(response.data); // Set the company data in the state
          setFormData((prevData) => ({
            ...prevData,
            company_name: response.data.company_name,
            company_website: response.data.company_website,
            company_photo: null, // this is done intentionally to avoid photo upload
            company_photo_url: response.data.company_photo_url,
          }));

          const emptyFieldsArr = [];
          if (!response.data.company_name) {
            emptyFieldsArr.push("company_name");
          }
          if (!response.data.company_website) {
            emptyFieldsArr.push("company_website");
          }
          if (!response.data.company_photo_url) {
            emptyFieldsArr.push("company_photo");
          }

          setEmptyFields(emptyFieldsArr);
          if (emptyFieldsArr.length > 0) {
            setIsModalOpen(true);
          }
          setLoaded(true);
          setIsLoading(false);
        }
      } catch (error: any) {
        console.error("Error fetching company profile", error);
      }
    };

    fetchCompanyProfile(); // Call the function immediately after mounting
  }, [isMissingDataFilled]);

  const onSubmit = async (data: Schema) => {
    if (
      formData.company_name === "" ||
      formData.company_website === "" ||
      formData.company_photo_url === ""
    ) {
      setIsModalOpen(true);
    }

    if (
      handleError.minsalMaxsalError ||
      handleError.jobDescriptionError ||
      handleError.howToApplyError
    )
      return;

    if (isPosting) return;

    setIsPosting(true);

    const token = localStorage.getItem("access_token");
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

    let allBenefits = "";
    for (let i = 0; i < benefits.length; i++) {
      allBenefits = allBenefits + benefits[i];
      if (i < benefits.length - 1) {
        allBenefits = allBenefits + ",";
      }
    }

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
      const response = await axios.post(`${baseUrl}/jobs/create/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response.data);

      // If successful, show success message and navigate
      swalSuccess({ title: "Job registered successfully", type: "toast" });
      router.push("/postedJobs");
    } catch (error) {
      // Log the error if necessary and show failure message
      swalFailed({ title: "Failed to register the job", type: "toast" });
    }

    setIsPosting(false);
  };

  // useEffect(() => {
  //   console.log(formData.currency_type);
  // }, [formData.currency_type]);
  // console.log(watch("job_role"), watch("apply_url"));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[100dvh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto">
      {/* Conditional rendering of the pop-up if there are empty fields */}
      {loaded && emptyFields.length > 0 && isModalOpen && (
        <>
          <div className="fixed z-[60] w-[100vw] h-[100dvh] inset-0 bg-black opacity-70 backdrop-blur-sm transition-opacity duration-1000"></div>

          <CompanyDetailsModal
            emptyFields={emptyFields}
            setIsModalOpen={setIsModalOpen}
            setIsMissingDataFilled={setIsMissingDataFilled}
            setMainFormData={setFormData}
          />
        </>
      )}

      {loaded && emptyFields.length > 0 && (
        <button
          className="flex items-center gap-x-2 flex-nowrap ml-auto mt-4 mr-4 bg-red-500 px-2 py-1 rounded-lg"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <CgDanger className="text-white inline" />
          <span className="text-white">Fill Company Details</span>
        </button>
      )}

      <JobPostForm
        type="post"
        // preview mode
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        // form data and zod
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        watch={watch}
        errors={errors}
        formData={formData}
        setFormData={setFormData}
        // currency conversion
        currencyList={currencyList}
        setCurrencyList={setCurrencyList}
        setCurrencyRates={setCurrencyRates}
        // manual error handling
        handleError={handleError}
        isDirty={isDirty}
        isFormDirty={isFormDirty}
        setIsFormDirty={setIsFormDirty}
        isPosting={isPosting}
      />
    </div>
  );
};

export default JobForm;
