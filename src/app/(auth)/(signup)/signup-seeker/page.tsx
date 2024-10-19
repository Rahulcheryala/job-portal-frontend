"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { seekerSignupFormSchema } from "@/lib/validator";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { swalFailed, swalSuccess } from "@/lib/helpers/swal";
import SignupForm from "@/Components/Forms/SignupForm";

type Schema = z.infer<typeof seekerSignupFormSchema>;

const SignupSeeker = () => {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  const [formData, setFormData] = useState<{
    phone_number: string;
    technical_skills: string[];
    location: string;
    years_of_experience: string;
  }>({
    phone_number: "",
    technical_skills: [],
    location: "",
    years_of_experience: "",
  });

  const [formDataErrors, setFormDataErrors] = useState<{
    phone_number: string;
    location: string;
    years_of_experience: string;
  }>({
    phone_number: "",
    location: "",
    years_of_experience: "",
  });

  const handleChange = (key: string, value: string) => {
    if (key === "years_of_experience") {
      // console.log("handling change");
      setFormData((prevState) => ({
        ...prevState,
        [key]: value,
      }));

      if (value) {
        setFormDataErrors((prevState) => ({
          ...prevState,
          years_of_experience: "",
        }));
      } else {
        setFormDataErrors((prevState) => ({
          ...prevState,
          years_of_experience: "Years of experience is required",
        }));
      }
    } else if (key === "phone_number") {
      const val = value;
      setFormData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
      validatePhoneNumber(val);
    } else if (key === "location") {
      setFormData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
      if (value) {
        setFormDataErrors((prevState) => ({
          ...prevState,
          location: "",
        }));
      } else {
        setFormDataErrors((prevState) => ({
          ...prevState,
          location: "Location is required",
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  const handleSkillChange = (skills: string[]) => {
    setFormData((prevState) => ({
      ...prevState,
      technical_skills: skills,
    }));
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const fullNumber = phoneNumber;
    const parsedNumber = parsePhoneNumberFromString("+" + fullNumber);

    if (parsedNumber && parsedNumber.isValid()) {
      // console.log("Valid number:", parsedNumber.formatInternational());
      setFormDataErrors((prevState) => ({
        ...prevState,
        phone_number: "",
      }));
      return true;
    } else {
      setFormDataErrors((prevState) => ({
        ...prevState,
        phone_number: "Invalid phone number",
      }));
      return false;
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(seekerSignupFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      confirm_password: "",
      how_heard_about_company: "",
    },
  });

  const onSubmit = async (data: Schema) => {
    const {
      first_name,
      last_name,
      email,
      username,
      password,
      how_heard_about_company,
    } = data;
    const { technical_skills, phone_number, location, years_of_experience } =
      formData;

    let skills = "";
    for (let i = 0; i < technical_skills.length; i++) {
      if (i === technical_skills.length - 1) {
        skills += technical_skills[i];
      } else {
        skills += technical_skills[i] + ", ";
      }
    }
    // removing spaces from the phone number
    const formattedPhoneNumber = phone_number.replace(/\s/g, "");

    try {
      const response = await axios.post(
        `${baseurl}/accounts/register/job-seeker/`,
        {
          first_name,
          last_name,
          email,
          username,
          password,
          personal_info: {
            phone_number: formattedPhoneNumber,
            how_heard_about_company,
          },
          job_seeker_profile: {
            location,
            years_of_experience,
            technical_skills: skills,
          },
        }
      );

      // console.log(response.data);

      swalSuccess({
        title: "Registration Successful",
        message:
          "You have registered successfully! <br> Please check your email to activate your account",
      });
      router.push("/login");
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data);

      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 500
      ) {
        swalFailed({
          title: "Registration Failed",
          error: error.response?.data,
        });
      } else if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        if (
          error.response?.data?.username[0] ||
          error.response?.data.email[0]
        ) {
          swalFailed({
            title: "Registration Failed",
            error:
              error.response?.data?.username[0] ||
              error.response?.data.email[0],
          });
        }
      } else {
        swalFailed({
          title: "Registration Failed",
          error: "Please try again later!",
        });
      }
    }
  };

  return (
    <SignupForm
      type="Seeker"
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      errors={errors}
      isSubmitting={isSubmitting}
      formData={formData}
      formDataErrors={formDataErrors}
      handleChange={handleChange}
      handleSkillChange={handleSkillChange}
    />
  );
};

export default SignupSeeker;
