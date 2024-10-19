import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import PostFormInput from "./Inputs/PostFormInput";
import SearchSelectDropdown from "./Custom/SearchSelectDropdown";
import ExperienceTags from "@/constants/data/experience.json";
import EmploymentTags from "@/constants/data/employmentType.json";
import primaryTags from "@/constants/data/primaryTags.json";
import SkillTags from "@/constants/data/skillTags.json";
import locOpns from "@/constants/data/location.json";
import QuillEditorComponent from "./Custom/QuillComponent";
import SignupFormInput from "./Inputs/SignupFormInput";
import BenefitOptions from "./Custom/BenefitOptions";
import benefitOpns from "@/constants/data/benefits.json";
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import PreviewModeModal from "../Modals/PreviewModeModal";
import DotLoader from "../Loaders/DotLoader";
import ImgUpload from "./Custom/ImgUpload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormData {
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
  company_website?: string;
  company_photo_url?: string;
}

type JobPostFormProps = {
  type: string;
  // only post page props
  previewMode: boolean;
  setPreviewMode: Dispatch<SetStateAction<boolean>>;

  // react-hook-form props
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (data: any) => void;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  errors: any;

  // currency conversion props
  currencyList: string[];
  setCurrencyList: Dispatch<SetStateAction<string[]>>;
  setCurrencyRates: Dispatch<SetStateAction<{ [key: string]: number }>>;

  // manual form data and error handling props
  formData: FormData;
  setFormData: Dispatch<SetStateAction<any>>;
  handleError: {
    jobDescriptionError: string;
    howToApplyError: string;
    minsalMaxsalError: string;
  };
  setIsFormDirty: any;
  isDirty: boolean;
  isFormDirty: boolean;
  isPosting: boolean;
};

const JobPostForm = ({
  type,
  previewMode,
  setPreviewMode,
  handleSubmit,
  onSubmit,
  register,
  watch,
  errors,
  currencyList,
  setCurrencyList,
  setCurrencyRates,
  formData,
  setFormData,
  handleError,
  setIsFormDirty,
  isDirty,
  isFormDirty,
  isPosting,
}: JobPostFormProps) => {
  const LocationTags = locOpns.countries;
  const [loaded, setLoaded] = useState(false);

  const handlePreview = () => {
    setPreviewMode((prev: boolean) => !prev);
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));

    setIsFormDirty(true);
  };

  const handleSkillChange = (skills: string[]) => {
    setFormData((prevState: any) => ({
      ...prevState,
      skills_required: skills,
    }));
    setIsFormDirty(true);
  };

  const handleBenefitsChange = (benefitsList: string[]) => {
    setFormData((prevState: any) => ({
      ...prevState,
      benefits: benefitsList,
    }));
    setIsFormDirty(true);
  };

  useEffect(() => {
    const getVals = async () => {
      const apiUrl =
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";

      try {
        const response = await axios.get(apiUrl);
        // console.log("Fetched currency rates:", response.data);
        const List = Object.keys(response.data.usd);
        setCurrencyList(List);
        const currencyRates = response.data.usd;
        // console.log("Fetched currency rates:", currencyRates);
        setCurrencyRates(currencyRates);
      } catch (error) {
        console.error("Failed to fetch currency rates:", error);
      }

      setLoaded(true);
    };

    if (currencyList.length === 0) getVals();
  }, []);

  const parseDateString = (dateString: string | null) => {
    if (!dateString) return null;

    // If the date is already in ISO format
    if (dateString.includes("T")) {
      return new Date(dateString);
    }

    // If the date is in dd/MM/yyyy format
    const [day, month, year] = dateString.split("/");
    if (day && month && year) {
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }

    return null;
  };

  // To show a warning on reload request
  useEffect(() => {
    const handleBeforeUnload = (e: Event) => {
      if (isFormDirty || isDirty) {
        e.preventDefault();
        const message = "Form data will be lost if you leave the page.";
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormDirty, isDirty]);

  useEffect(() => {
    if (previewMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [previewMode]);

  const postFormCls =
    "relative w-full mt-0.5 p-2 bg-gray-50 text-gray-800 rounded border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic";

  const labelCls =
    "text-gray-700 text-base font-semibold relative flex items-center gap-2";

  const manualErrorCls =
    "text-red-500 text-xs absolute font-semibold transition-all transform duration-300 absolute z-10 bg-red-50 rounded-b-md top-full px-2 py-0.5 before:content-[''] before:absolute before:w-2 before:h-2 before:bg-red-50 before:left-0 before:bottom-full after:content-[''] after:absolute after:z-10 after:w-2 after:h-2 after:bg-gray-50 after:rounded-bl-md after:border-l after:border-b after:border-gray-300 after:left-0 after:bottom-full";

  return (
    <div className="flex-1 bg-gray-50 min-h-screen md:mx-2 block">
      <form
        id="post-form"
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white md:space-y-4 space-y-2 sm:p-8 py-6 px-2 max-w-5xl mx-auto sm:border sm:rounded-xl sm:my-5"
      >
        <h2 className="text-blue-500 font-bold pt-3 lg:text-3xl text-2xl">
          Primary Details
        </h2>

        {formData.company_photo_url && (
          <div className="w-full flex justify-center">
            <ImgUpload
              label="Company Logo"
              name="company_photo"
              Url={formData.company_photo_url!}
              readOnly={true}
            />
          </div>
        )}

        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4">
          {formData.company_name && (
            <PostFormInput
              id="company_name"
              name="company_name"
              type="text"
              label="Company Name"
              placeholder="Google"
              value={formData?.company_name}
              req={true}
              cls={postFormCls}
            />
          )}

          {formData.company_website && (
            <PostFormInput
              id="company_website"
              name="company_website"
              type="url"
              label="Company Website"
              placeholder="https://"
              value={formData?.company_website}
              req={true}
              cls={postFormCls}
            />
          )}

          <PostFormInput
            id="job_role"
            name="job_role"
            type="text"
            label="Job Role"
            register={register}
            placeholder="Software Engineer"
            req={true}
            cls={postFormCls}
            errors={errors.job_role}
            description="Enter the position you are hiring for in your company or organization. This will be displayed on the job post. Eg: Software Engineer, Product Manager, etc. "
          />

          <div className="flex flex-col justify-center w-full">
            <SearchSelectDropdown
              label="Employment type"
              name="employment_type"
              labelCls={labelCls}
              placeholder="Internship, Full-time, etc."
              cls={postFormCls}
              tags={EmploymentTags}
              onSingleChange={handleChange}
              multiple={false}
              selected={type === "edit" ? formData.employment_type : ""}
            />
          </div>

          <div className="flex flex-col justify-center w-full self-start">
            <SearchSelectDropdown
              label="Industry"
              name="industry"
              labelCls={labelCls}
              placeholder="Software, Finance, etc."
              cls={postFormCls}
              tags={primaryTags}
              onSingleChange={handleChange}
              multiple={false}
              selected={type === "edit" ? formData.industry : ""}
            />
          </div>

          <div className="flex flex-col justify-center w-full self-start">
            <SearchSelectDropdown
              label="Job Location"
              name="job_location"
              labelCls={labelCls}
              placeholder="Job Location"
              cls={postFormCls}
              tags={LocationTags}
              onSingleChange={handleChange}
              description="Only fill if you'd only like to hire people from a specific location or timezone this job is restricted to. If not restricted, please leave it as worldwide."
              multiple={false}
              selected={type === "edit" ? formData.job_location : ""}
            />
          </div>

          <div className="flex flex-col justify-center w-full self-end">
            <SearchSelectDropdown
              label="Skills Required"
              labelCls={labelCls}
              cls={postFormCls}
              tags={SkillTags}
              onChange={handleSkillChange}
              description="Short tags like industry and tech stack are preferred. Only the first 3 or 4 tags are displayed on the site, but all tags ensure the job appears on relevant tag-specific pages. Additional tags may be auto-generated after posting/editing to supplement."
              existingTags={type === "edit" ? formData.skills_required : []}
            />
          </div>

          <div className="flex flex-col justify-center w-full self-start">
            <SearchSelectDropdown
              label="Experience Required"
              name="experience_needed"
              labelCls="text-gray-500 font-semibold relative flex items-center gap-2"
              placeholder="Experience"
              cls={postFormCls}
              tags={ExperienceTags}
              onSingleChange={handleChange}
              multiple={false}
              req={true}
              selected={type === "edit" ? formData.experience_needed : ""}
            />
          </div>
        </div>

        <h2 className="text-blue-500 font-bold pt-3 lg:text-3xl text-2xl">
          Job Details
        </h2>

        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <label className={labelCls} htmlFor="jobDescription">
              Job description
              <span className="text-red-500">*</span>
            </label>
            <div className="col-span-1">
              <div className="relative">
                <QuillEditorComponent
                  name="job_description"
                  value={formData.job_description}
                  onChange={handleChange}
                  setIsFormDirty={setIsFormDirty}
                />
                <span
                  className={`${manualErrorCls} ${handleError.jobDescriptionError ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} `}
                >
                  {handleError.jobDescriptionError}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              className="text-gray-700 text-base font-semibold relative flex items-start gap-2"
              htmlFor="HowToApply"
            >
              How to apply ?<span className="text-red-500">*</span>
            </label>
            <div className="col-span-1">
              <div className="relative">
                <QuillEditorComponent
                  name="how_to_apply"
                  value={formData.how_to_apply}
                  onChange={handleChange}
                  setIsFormDirty={setIsFormDirty}
                />
                <span
                  className={`${manualErrorCls} ${handleError.howToApplyError ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                >
                  {handleError.howToApplyError}
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 items-end">
            <PostFormInput
              id="apply_url"
              name="apply_url"
              type="text"
              label="Apply URL"
              register={register}
              placeholder="https://"
              req={true}
              cls={postFormCls}
              errors={errors.apply_url}
              description="If you'd like to use your own apply form or ATS you can enter the URL here for people to apply."
            />

            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <label
                  className="flex-1 text-gray-700 text-base font-semibold relative flex items-start gap-2"
                  htmlFor="salary"
                >
                  Salary Margin
                  <button
                    type="button"
                    className="w-2 h-2 p-2.5 text-sm bg-gray-200 text-gray-400 rounded-full flex items-center justify-center outline-none hover:bg-gray-300 hover:text-gray-500 focus:bg-gray-300 focus:text-gray-500 peer"
                  >
                    ?
                  </button>
                  <span title="Required" className="text-red-500 inline-block">
                    *
                  </span>
                  <div className="absolute z-10 left-0 transform top-full translate-y-8 mb-2 max-w-sm bg-blue-100 text-gray-600 text-xs font-medium px-2 py-1 rounded opacity-0 peer-hover:opacity-100 peer-hover:translate-y-0 peer-hover:z-10 transition-all duration-300 ease-in-out pointer-events-none">
                    It&apos;s illegal to not share salary range on job posts
                    since 2021. Posts without salary will automatically show an
                    estimate of salary based on similar jobs.
                  </div>
                </label>

                {loaded ? (
                  currencyList.length > 0 && (
                    <SearchSelectDropdown
                      name="currency_type"
                      tags={currencyList}
                      cls="w-24 px-2 py-0.5 bg-gray-50 text-gray-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic uppercase"
                      onSingleChange={handleChange}
                      placeholder="Currency"
                      multiple={false}
                      selected={formData.currency_type}
                    />
                  )
                ) : (
                  <div className="w-24 h-8 bg-gray-300 rounded animate-pulse"></div>
                )}
              </div>

              {loaded ? (
                <div className="flex w-full justify-between relative items-center gap-2.5 mt-0.5">
                  <SignupFormInput
                    id="annual_salary_min"
                    name="annual_salary_min"
                    type="number"
                    placeholder="Min Salary"
                    cls={postFormCls}
                    handleChange={handleChange}
                    req={true}
                    value={
                      type === "edit" ? String(formData.annual_salary_min) : ""
                    }
                  />
                  <span className="text-lg italic"> to </span>
                  <SignupFormInput
                    id="annual_salary_max"
                    name="annual_salary_max"
                    type="number"
                    placeholder="Max Salary"
                    cls={postFormCls}
                    handleChange={handleChange}
                    req={true}
                    value={
                      type === "edit" ? String(formData.annual_salary_max) : ""
                    }
                  />
                  <span
                    className={`text-red-500 text-xs mt-1 font-semibold absolute ${handleError.minsalMaxsalError ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} transition-all transform duration-300 top-full`}
                  >
                    {handleError.minsalMaxsalError}
                  </span>
                </div>
              ) : (
                <div className="w-full h-16">
                  <DotLoader />
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-2 items-start">
            <div className={`flex flex-col justify-center w-full`}>
              <label className="text-gray-500 font-semibold block mb-1.5 me-1.5">
                Application Deadline<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center bg-gray-100 w-full rounded relative border border-gray-300 h-[2.6875rem]">
                <DatePicker
                  required
                  dateFormat="dd/MM/yyyy"
                  selected={parseDateString(formData.application_deadline)}
                  minDate={new Date()}
                  onKeyDown={(e) => e.preventDefault()}
                  onChange={(date: Date | null) => {
                    setFormData((prev: any) => {
                      return {
                        ...prev,
                        application_deadline: date
                          ? date.toISOString() // Store the date in ISO format (preferred for databases)
                          : null,
                      };
                    });

                    setIsFormDirty(true);
                  }}
                  className="input-field pl-3 caret-transparent rounded"
                  wrapperClassName="datePicker"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 text-base font-semibold relative flex items-start gap-2">
                Benefits
              </label>
              <div className="col-span-1 mt-2 space-y-2">
                <div className="flex items-center">
                  <div>
                    <BenefitOptions
                      options={benefitOpns}
                      onChange={handleBenefitsChange}
                      selected={type === "edit" ? formData.benefits : []}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <h2 className="text-blue-500 font-bold pt-3 lg:text-3xl text-2xl">
          Feedback
        </h2>

        <div className="flex flex-col gap-y-2">
          <label
            className="text-gray-700 text-base font-semibold relative flex items-start gap-2"
            htmlFor="jobDescription"
          >
            Feedback about CodeUnity
            <button
              type="button"
              className="w-2 h-2 p-2.5 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center outline-none hover:bg-gray-300 hover:text-gray-500 focus:bg-gray-300 focus:text-gray-500 peer"
            >
              ?
            </button>
            <div className="absolute z-10 left-0 transform top-full translate-y-8 mb-2 max-w-sm bg-blue-100 text-gray-600 text-xs font-medium px-2 py-1 rounded opacity-0 peer-hover:opacity-100 peer-hover:translate-y-0 peer-hover:z-10 transition-all duration-300 ease-in-out pointer-events-none">
              If you have any feature requests or general feedback about posting
              a job at Code Unity, leave it here.
            </div>
          </label>
          <div className="col-span-1">
            <QuillEditorComponent
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              setIsFormDirty={setIsFormDirty}
            />
          </div>
        </div> */}

        <div className="mx-auto w-fit">
          <div className="flex gap-4 flex-wrap mt-12">
            {type === "post" && (
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-gray-200 hover:bg-blue-200 hover:text-blue-500 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-200 disabled:hover:text-gray-500"
                disabled={(!isDirty && !isFormDirty) || isPosting}
              >
                Post
              </button>
            )}

            {type === "edit" && (
              <button
                type="submit"
                className="px-4 py-2 rounded-full font-semibold bg-blue-200 text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isFormDirty && !isDirty}
              >
                Update Job Post
              </button>
            )}

            <button
              className="px-4 py-2 rounded-full bg-gray-200 hover:bg-blue-200 hover:text-blue-500 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-200 disabled:hover:text-gray-500"
              type="button"
              onClick={handlePreview}
              disabled={!isDirty && !isFormDirty}
            >
              Preview
            </button>
          </div>
        </div>
      </form>

      {previewMode && (
        <>
          {/* Overlay Background */}
          <div className="fixed inset-0 bg-black opacity-80 backdrop-blur-sm z-[60] transition-opacity duration-300"></div>

          <PreviewModeModal
            watch={watch}
            formData={formData}
            handlePreview={handlePreview}
          />
        </>
      )}
    </div>
  );
};

export default JobPostForm;
