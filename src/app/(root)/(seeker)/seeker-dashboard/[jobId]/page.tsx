"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

import Spinner from "@/Components/Loaders/Spinner";
import { swalFailed, swalSuccess } from "@/lib/helpers/swal";
import { useRouter } from "next/navigation";
import JobDetailsCard from "@/Components/Cards/JobDetailsCard";
import JobApplicationModal from "@/Components/Modals/JobApplicationModal";

interface JobDetails {
  id: number;
  posted_by: {
    company_name: string;
    company_photo_url: string;
    company_website: string;
  };

  job_role: string;
  job_description: string;
  job_location: string;
  industry: string;
  employment_type: string;
  experience_needed: string;
  skills_required: string;

  currency_type: string;
  annual_salary_min: number;
  annual_salary_max: number;
  benefits: string;

  application_deadline: string;
  how_to_apply: string;
  apply_url: string;

  created_at: string;
  is_active: boolean;
}

const JobDetails = ({ params }: { params: { jobId: number } }) => {
  const router = useRouter();
  const jobId = params.jobId;
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isResumePresent, setIsResumePresent] = useState<boolean>(false);

  useEffect(() => {
    const fetchJobDetailsAndCheckApplicationStatus = async () => {
      try {
        const url = `${baseurl}/jobs/${jobId}/`;
        // console.log(url);
        const token = localStorage.getItem("access_token");
        const config = token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};

        const jobDetails = await axios.get(url, config);
        // console.log(jobDetails.data);
        setJobDetails(jobDetails.data);

        if (token) {
          // Check application status
          const applicationStatus = await axios.get(
            `${baseurl}/jobs/${jobId}/application-status/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log(applicationStatus.data);
          const status = applicationStatus.data?.status;

          setIsApplied(status === "applied");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchJobDetailsAndCheckApplicationStatus();
  }, [jobId, baseurl]);

  const handleApplyJob = async () => {
    const access_token = localStorage.getItem("access_token");

    if (!access_token) {
      // console.log("Not logged in");
      return router.push("/login");
    }

    try {
      // Step 1: Check if the job seeker has a resume uploaded
      const profileResponse = await axios.get(
        `${baseurl}/accounts/job-seeker-profile/`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      // console.log(profileResponse.data);
      const { resume_url } = profileResponse.data;

      if (resume_url) {
        setIsResumePresent(true);
      }
      setIsModalOpen(true);
    } catch (error: any) {
      console.error("Error applying for job", error.response.data || error);
      swalFailed({
        title: "Error!",
        error: "Failed to submit the application. Please try again.",
      });
    }
  };

  if (!jobDetails)
    return (
      <div className="flex items-center justify-center w-full h-[100dvh]">
        <Spinner />
      </div>
    );

  return (
    <section className="w-full min-h-screen bg-white">
      {isModalOpen && !isResumePresent && (
        <>
          {/* Overlay */}
          <div className="fixed z-[60] w-[100vw] h-[100dvh] inset-0 bg-black opacity-70 backdrop-blur-sm transition-opacity duration-1000"></div>

          <JobApplicationModal
            isResumePresent={isResumePresent}
            setIsModalOpen={setIsModalOpen}
            jobId={jobId}
            setIsApplied={setIsApplied}
          />
        </>
      )}

      <div className="max-w-6xl mx-auto py-4 sm:px-6 md:px-10">
        <JobDetailsCard
          jobDetails={jobDetails}
          handleApplyJob={handleApplyJob}
          isApplied={isApplied}
        />
      </div>
    </section>
  );
};

export default JobDetails;
