"use client";

import React, { useEffect, useState } from "react";
import JobsList from "./JobsList";
import SearchFiltersForm from "@/Components/Forms/SearchFiltersForm";
import { LuFilter } from "react-icons/lu";

interface SearchParams {
  industry: string;
  skills_required: string[];
  job_location: string;
  employment_type: string;
  annual_salary_min: string;
  annual_salary_max: string;
  currency_type: string;
}

const JobsPage = ({ type }: { type: string }) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const values = {
    industry: "",
    skills_required: [],
    job_location: "",
    employment_type: "",
    annual_salary_min: "",
    annual_salary_max: "",
    currency_type: "USD",
  };

  const [searchParams, setSearchParams] = useState<SearchParams>({
    ...values,
  });
  const [tempParams, setTempParams] = useState<SearchParams>({
    ...values,
  });

  const [resetFlag, setResetFlag] = useState<boolean>(false);

  const handleChange = (name: string, value: string) => {
    setTempParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSkillChange = (skills: string[]) => {
    setTempParams((prevState) => ({
      ...prevState,
      skills_required: skills,
    }));
  };

  const handleSubmit = () => {
    // console.log(tempParams);
    setSearchParams(tempParams);
  };

  const handleReset = () => {
    setResetFlag(true);
    setTempParams({
      ...values,
    });
    setSearchParams({
      ...values,
    });
  };

  // useEffect(() => {
  //   console.log(tempParams.currency_type);
  // }, [tempParams.currency_type]);

  return (
    <div className="bg-[#FAFAFA] flex-1 sm:px-6 max-[450px]:px-2 px-3 flex flex-col min-h-screen max-h-screen relative scroll-smooth">
      <div className="w-full text-left max-lg:grid max-lg:grid-flow-col max-lg:justify-between max-lg:items-center max-[450px]:pt-5 mt-4 mb-2">
        <h1 className="md:text-4xl sm:text-3xl text-2xl ms-2 text-blue-500 font-semibold 2xl:ps-12 tracking-tighter whitespace-nowrap">
          {type === "posted"
            ? "Posted Jobs"
            : type === "applied"
              ? "Applied Jobs"
              : "Jobs"}
        </h1>

        {type !== "applied" && (
          <div className="block lg:hidden sm:pe-4 relative justify-self-end">
            <button
              className="text-center md:text-lg text-base max-[450px]:text-sm text-gray-700 flex justify-center items-center sm:gap-2.5 gap-1 font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-blue-300 rounded-md px-2 py-1 whitespace-nowrap"
              onClick={() => setShowFilters((curr) => !curr)}
            >
              <span className="sm:p-2 p-1.5 bg-blue-100 rounded-full">
                <LuFilter className="text-blue-500 w-4 h-4" />
              </span>
              Search Filters
            </button>
            <div
              className={`absolute z-10 top-12 right-2 transition-all duration-300 ease-in-out ${showFilters ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}
            >
              <SearchFiltersForm
                searchParams={tempParams}
                handleChange={handleChange}
                handleSkillChange={handleSkillChange}
                handleSubmit={handleSubmit}
                handleReset={handleReset}
                resetFlag={resetFlag}
                setResetFlag={setResetFlag}
                setShowFilters={setShowFilters}
              />
            </div>
          </div>
        )}
      </div>

      <div
        className={`flex-1 w-full max-h-[calc(100%-4.5rem)] grid grid-flow-col lg:grid-cols-[1fr,minmax(0,384px)] max-lg:grid-cols-1 justify-end gap-x-6`}
      >
        <JobsList type={type} searchParams={searchParams} />

        {type !== "applied" && (
          <div className="hidden lg:block">
            <SearchFiltersForm
              searchParams={tempParams}
              handleChange={handleChange}
              handleSkillChange={handleSkillChange}
              handleSubmit={handleSubmit}
              handleReset={handleReset}
              resetFlag={resetFlag}
              setResetFlag={setResetFlag}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
