"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DeleteConfirmationModal from "@/Components/Modals/DeleteConfirmationModal";
import Spinner from "@/Components/Loaders/Spinner";
import { useRouter } from "next/navigation";
import CoverLetterModal from "@/Components/Modals/CoverLetterModal";
import JobDetailsCard from "@/Components/Cards/JobDetailsCard";

interface Application {
  job: any;
  applicant: {
    first_name: string;
    last_name: string;
    email: string;
  };

  resume_url: string;
  cover_letter: string;

  applied_at?: string;
}

interface JobDetails {
  id?: number;
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

  applications?: Application[];
}

const JobDetails = ({ params }: { params: { jobId: number } }) => {
  const router = useRouter();
  const jobId = params.jobId;

  const [index, setIndex] = useState<number>(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [searchParams, setSearchParams] = useState<{ skillTags: string[] }>({
    skillTags: [],
  });
  const [applications, setApplications] = useState<Application[]>([]);
  const [visibleApplications, setVisibleApplications] = useState<Application[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const displayApplicantsLength = 4; // with this also change the max-h- in the div below appropriately to show the scrollbar

  const handleSkillChange = (skills: string[]) => {
    setSearchParams((prevState) => ({
      ...prevState,
      skillTags: skills,
    }));
  };

  const baseurl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";

  useEffect(() => {
    // Ensure this runs only in the browser
    const access_token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    const fetchJobDetails = async () => {
      if (access_token) {
        try {
          const response = await axios.get(`${baseurl}/jobs/${jobId}/`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });
          console.log(response.data);
          setJobDetails(response.data);

          const applicants = await axios.get(
            `${baseurl}/jobs/${jobId}/applications/`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          // console.log(applicants.data.applications);

          if (applicants.data?.applications?.length > 0) {
            setApplications(applicants.data.applications); // Assuming applications are part of the job details response
            setVisibleApplications(applicants.data.applications); // need to change this
            // setVisibleApplicants(
            //   response.data.applications.slice(0, displayApplicantsLength)
            // );
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchJobDetails();
  }, [jobId, baseurl]);

  // useEffect(() => {
  //   console.log(applications);
  // }, [applications]);

  // const loadMoreApplicants = () => {
  //   // console.log("Loading more applicants...");
  //   if (loading || !hasMore) return;

  //   setLoading(true);

  //   setTimeout(() => {
  //     const nextApplicants = applicants.slice(
  //       visibleApplicants.length,
  //       visibleApplicants.length + displayApplicantsLength
  //     );
  //     setVisibleApplicants((prev) => [...prev, ...nextApplicants]);
  //     setLoading(false);

  //     if (nextApplicants.length < displayApplicantsLength) {
  //       setHasMore(false); // No more applicants to load
  //     }
  //   }, 1000); // Simulate loading delay
  // };

  // const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
  //   const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

  //   if (scrollTop + clientHeight >= scrollHeight - 5) {
  //     loadMoreApplicants();
  //   }
  // };

  const deleteJob = (id: any) => {
    const access_token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    axios
      .delete(`${baseurl}/jobs/${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        Swal.fire("Deleted Successfully", "", "success");
        router.push("/postedJobs");
      })
      .catch((error) => {
        console.error((error as any)?.response?.data || error);
      });
  };

  useEffect(() => {
    if (isDeleteModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isDeleteModalOpen]);

  if (!jobDetails)
    return (
      <div className="flex items-center justify-center w-full h-[100dvh]">
        <Spinner />
      </div>
    );

  return (
    <section className="w-full min-h-screen bg-white min-[450px]:max-sm:px-2">
      {isDeleteModalOpen && (
        <>
          <div className="fixed z-[60] w-[100vw] h-[100dvh] inset-0 bg-black opacity-70 backdrop-blur-sm transition-opacity duration-1000"></div>

          <DeleteConfirmationModal
            deletefn={() => deleteJob(jobId)}
            closemodal={() => setIsDeleteModalOpen(false)}
          />
        </>
      )}

      <div className="max-w-6xl mx-auto py-4 sm:px-6 md:px-10">
        <JobDetailsCard
          type="posted"
          jobDetails={jobDetails}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleSkillChange={handleSkillChange}
          // handleScroll={handleScroll}
          loading={loading}
          visibleApplications={visibleApplications}
          setIndex={setIndex}
        />
      </div>
    </section>
  );
};

export default JobDetails;
