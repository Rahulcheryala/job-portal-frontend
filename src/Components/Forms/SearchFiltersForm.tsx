"use client";

import { useState } from "react";
import locOpns from "@/constants/data/location.json";
import SkillTags from "@/constants/data/skillTags.json";
import primaryTags from "@/constants/data/primaryTags.json";
import empOpns from "@/constants/data/employmentType.json";
import { LuFilter } from "react-icons/lu";
import SearchSelectDropdown from "./Custom/SearchSelectDropdown";
import RangeSlider from "./Custom/RangeSlider";
import SignupFormInput from "./Inputs/SignupFormInput";

interface SearchFiltersFormProps {
  searchParams: {
    industry: string;
    skills_required: string[];
    job_location: string;
    employment_type: string;
    annual_salary_min: string;
    annual_salary_max: string;
    currency_type: string;
  };
  handleChange: (name: string, value: string) => void;
  handleSkillChange: (skills: string[]) => void;
  handleSubmit: () => void;
  handleReset: () => void;
  resetFlag?: boolean;
  setResetFlag?: (flag: boolean) => void;
  setShowFilters?: (show: boolean) => void;
}

const SearchFiltersForm = ({
  searchParams,
  handleChange,
  handleSkillChange,
  handleSubmit,
  handleReset,
  resetFlag,
  setResetFlag,
  setShowFilters,
}: SearchFiltersFormProps) => {
  const LocationTags = locOpns.countries;

  const defaultFieldStylesCls =
    "relative w-full mt-1 p-2 bg-gray-50 text-gray-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic";

  return (
    <section className="sticky w-full h-fit lg:px-4 lg:py-6 p-3 shadow-sm rounded-md border bg-white border-gray-100 max-w-sm sm:max-lg:w-80 min-w-[18rem]">
      <h2 className="hidden text-center text-gray-700 lg:flex justify-center items-center gap-2.5 font-semibold mb-3">
        <span>
          <LuFilter size={18} className="inline-block text-blue-500" />
        </span>
        Search Filters
      </h2>

      <form
        className="space-y-2 px-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="grid grid-rows-[min(fit_content, fit_content)] gap-x-6 items-start">
          <SearchSelectDropdown
            req={false}
            label="Industry/ Field of Work"
            name="industry"
            labelCls="text-gray-700 text-sm font-semibold relative flex items-center gap-2 mt-2"
            placeholder="Eg: Marketing"
            cls={defaultFieldStylesCls}
            tags={primaryTags}
            onSingleChange={handleChange}
            description="Only fill if you'd only like to hire people from a specific location or timezone this job is restricted to. If not restricted, please leave it as worldwide."
            multiple={false}
            resetFlag={resetFlag}
            setResetFlag={setResetFlag}
          />
        </div>

        <div className="grid grid-rows-[min(fit_content, fit_content)] gap-x-6 items-start">
          <SearchSelectDropdown
            req={false}
            label="Skills"
            labelCls="text-gray-700 text-sm font-semibold relative flex items-center gap-2 mt-2"
            cls={defaultFieldStylesCls}
            tags={SkillTags}
            onChange={handleSkillChange}
            placeholder="Eg: Software Developer"
            description="Short tags like industry and tech stack are preferred. Only the first 3 or 4 tags are displayed on the site, but all tags ensure the job appears on relevant tag-specific pages. Additional tags may be auto-generated after posting/editing to supplement."
            resetFlag={resetFlag}
            setResetFlag={setResetFlag}
          />
        </div>

        <div className="grid grid-rows-[min(fit_content, fit_content)] gap-x-6 items-start">
          <SearchSelectDropdown
            req={false}
            label="Location"
            name="job_location"
            labelCls="text-gray-700 text-sm font-semibold relative flex items-center gap-2 mt-2"
            placeholder="Eg: London"
            cls={defaultFieldStylesCls}
            tags={LocationTags}
            onSingleChange={handleChange}
            description="Only fill if you'd only like to hire people from a specific location or timezone this job is restricted to. If not restricted, please leave it as worldwide."
            multiple={false}
            resetFlag={resetFlag}
            setResetFlag={setResetFlag}
          />
        </div>

        <div className="grid grid-rows-[min(fit_content, fit_content)] gap-x-6 items-start">
          <SearchSelectDropdown
            req={false}
            label="Employment Type"
            name="employment_type"
            labelCls="text-gray-700 text-sm font-semibold relative flex items-center gap-2 mt-2"
            placeholder="Eg: Full-Time"
            cls={defaultFieldStylesCls}
            tags={empOpns}
            onSingleChange={handleChange}
            description="Select the type of employment you would like to filter with."
            multiple={false}
            resetFlag={resetFlag}
            setResetFlag={setResetFlag}
          />
        </div>

        <RangeSlider
          label="Salary"
          name="salary"
          labelCls="text-gray-700 text-base font-semibold relative flex items-center gap-2"
          handleChange={handleChange}
          minSalary={searchParams.annual_salary_min}
          maxSalary={searchParams.annual_salary_max}
          currencyType={searchParams.currency_type}
        />

        <div className="flex gap-3 items-center flex-nowrap">
          <button
            type="submit"
            onClick={() => setShowFilters && setShowFilters(false)}
            className="flex-1 bg-blue-500 text-white py-1.5 rounded transition-colors duration-150 hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-300 outline-none"
          >
            Search
          </button>

          <button
            type="button"
            className="w-1/4 bg-red-500 text-white py-1.5 rounded transition-colors duration-150 hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-300 outline-none"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
};

export default SearchFiltersForm;
