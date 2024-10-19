"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { recruiterSignupFormSchema } from "@/lib/validator";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import SignupForm from "@/Components/Forms/SignupForm";
import { swalSuccess, swalFailed } from "@/lib/helpers/swal";

type Schema = z.infer<typeof recruiterSignupFormSchema>;

const Signup = () => {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  const [formData, setFormData] = useState<{
    phone_number: string;
    looking_for: string;
    // hiring_skills: string[];
  }>({
    phone_number: "",
    looking_for: "",
    // hiring_skills: [],
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(recruiterSignupFormSchema),
    mode: "onChange", // onChange might effect browser performance so use onBlur/onTouched if needed
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      work_email: "",
      username: "",
      password: "",
      confirm_password: "",
      how_heard_about_company: "",
    },
  });

  const [formDataErrors, setFormDataErrors] = useState<{
    phone_number: string;
  }>({
    phone_number: "",
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    if (key === "phone_number") {
      validatePhoneNumber(value);
    }
  };

  const handleSkillChange = (skills: string[]) => {
    setFormData((prevState) => ({
      ...prevState,
      hiring_skills: skills,
    }));
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    // const fullNumber = phoneNumber;
    const parsedNumber = parsePhoneNumberFromString("+" + phoneNumber);

    if (parsedNumber && parsedNumber.isValid()) {
      // console.log("Valid number:", parsedNumber.formatInternational());
      setFormDataErrors((prevState) => ({
        ...prevState,
        phone_number: "",
      }));
      setFormData((prevState) => ({
        ...prevState,
        phone_number: parsedNumber.formatInternational(),
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

  const onSubmit = async (data: Schema) => {
    // console.log("Recruiter form data:", data, formData);
    const {
      first_name,
      last_name,
      email,
      work_email,
      username,
      password,
      how_heard_about_company,
    } = data;
    const { phone_number, looking_for } = formData;

    // removing spaces from the phone number
    const formattedPhoneNumber = phone_number.replace(/\s/g, "");

    try {
      const response = await axios.post(
        `${baseurl}/accounts/register/job-hirer/`,
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
          job_hirer_profile: {
            work_email,
            looking_for,
          },
        }
      );
      // console.log(response.data);

      swalSuccess({
        title: "Registration Successful",
        message:
          "You have registered successfully! <br> Please check your email to activate your account",
      });
      // Redirect to the homepage
      router.push("/login");

      // console.log("Signed up successfully");
    } catch (error: any) {
      console.error("Registration failed:", error.response);

      console.error(
        axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 400
      );

      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 500
      ) {
        swalFailed({
          title: "Registration Failed",
          error: "Internal Server Error, Please try again!",
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
      type="Recruiter"
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

export default Signup;
