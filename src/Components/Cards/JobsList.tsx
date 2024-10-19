"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import Skeleton from "@/Components/Loaders/Skeleton";
import Image from "next/image";
import Link from "next/link";
import { BiSolidArrowToTop } from "react-icons/bi";
import { useRouter } from "next/router";

// Define an interface representing the structure of a job object
interface Job {
  id?: number;
  posted_by: {
    company_name: string;
    // company_logo: string;
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

interface SearchParams {
  type: string;
  searchParams: {
    industry: string;
    skills_required: string[];
    job_location: string;
    employment_type: string;
    annual_salary_min: string;
    annual_salary_max: string;
    currency_type: string;
  };
}

const JobsList: React.FC<SearchParams> = React.memo(
  ({ searchParams, type = "jobs" }) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [jobsCopy, setJobsCopy] = useState<Job[]>([]);

    const [loaded, setLoaded] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [fetchCount] = useState(3);
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollToTopRef = useRef<HTMLAnchorElement>(null);
    const fetchingMore = useRef<boolean>(false);
    const [loadingMore, setLoadingMore] = useState<boolean>(false); // State for the loading message

    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

    // useEffect(() => {
    //   const filteredJobs = jobsCopy.filter((job) => {
    //     const position = job.position.toLowerCase();
    //     return position.includes(searchParams.query.toLowerCase());
    //   });
    //   setJobs(filteredJobs);
    // }, [searchParams.query, jobsCopy]);

    const fetchJobs = useCallback(
      async (page: number = 1) => {
        if (fetchingMore.current) return;

        fetchingMore.current = true;
        setLoadingMore(true); // Set loadingMore to true before fetching

        try {
          const params = new URLSearchParams();
          if (searchParams.industry)
            params.append("industry", searchParams.industry);
          if (searchParams.skills_required.length > 0)
            params.append(
              "skills_required",
              searchParams.skills_required.join(",")
            );
          if (searchParams.job_location)
            params.append("job_location", searchParams.job_location);
          if (searchParams.employment_type)
            params.append("employment_type", searchParams.employment_type);
          if (searchParams.annual_salary_min)
            params.append("annual_salary_min", searchParams.annual_salary_min);
          if (searchParams.annual_salary_max)
            params.append("annual_salary_max", searchParams.annual_salary_max);

          params.append("page", String(page));

          const endpoint =
            type === "posted"
              ? "posted-jobs"
              : type === "applied"
                ? "applied-jobs"
                : "jobs";

          const url = `${baseurl}/${endpoint}/${params.toString() ? `?${params.toString()}` : ""}`;

          // console.log("Fetching jobs from URL:", url);
          const token = localStorage.getItem("access_token");
          const config =
            type === "posted" || type === "applied"
              ? { headers: { Authorization: `Bearer ${token}` } }
              : {};

          const response = await axios.get(url, config);
          // console.log(response.data);
          const fetchedJobs = response.data.results; // for posted and all jobs

          // Get pagination metadata
          const next = response.data.next;

          // console.log("Extracted jobs:", fetchedJobs);
          // Preserve the current scroll position
          const scrollTop = scrollRef.current?.scrollTop || 0;
          const scrollHeight = scrollRef.current?.scrollHeight || 0;

          if (fetchedJobs.length > 0) {
            setJobs((prevJobs) => [...prevJobs, ...fetchedJobs]);
            setJobsCopy((prevJobs) => [...prevJobs, ...fetchedJobs]);
          }
          // Restore the scroll position after updating jobs
          setTimeout(() => {
            if (scrollRef.current) {
              scrollRef.current.scrollTop =
                scrollRef.current.scrollHeight - scrollHeight + scrollTop;
            }
          }, 0);

          // If there's no `next` URL, stop fetching more pages
          if (!next) {
            setHasMore(false); // You can use this flag to stop further pagination
          }

          setLoaded(true);
          setLoadingMore(false);
          fetchingMore.current = false;
        } catch (error: any) {
          console.error("Error fetching jobs:", error?.response?.data);
          setLoadingMore(false);
          fetchingMore.current = false;
        }
      },
      [searchParams, type]
    );

    useEffect(() => {
      setJobs([]); // Clear previous jobs when tags change
      setPage(1); // Reset page number when tags change to refetch from the beginning
    }, [searchParams]);

    useEffect(() => {
      setJobs([]); // Clear previous jobs when tags change
      setLoaded(false);
      fetchJobs();
    }, [searchParams, type]);

    // Fetch jobs whenever the page state changes
    useEffect(() => {
      fetchJobs(page); // Fetch jobs for the current page
    }, [page]);

    // useEffect(() => {
    //   if (page > 1) {
    //     setLoaded(false);
    //     fetchJobs();
    //   }
    // }, [page]);

    useEffect(() => {
      const handleScroll = () => {
        if (scrollRef.current) {
          const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;

          // Check if the user has scrolled to the bottom of the container
          if (
            scrollTop + clientHeight >= scrollHeight - 5 &&
            !loadingMore &&
            hasMore
          ) {
            // console.log("Fetching more jobs...");
            setPage((prevPage) => prevPage + 1); // Increment page for the next fetch
          }

          // Show "scroll to top" button if user scrolls down
          if (scrollTop > 10) {
            scrollToTopRef.current!.style.display = "block";
          } else {
            scrollToTopRef.current!.style.display = "none";
          }
        }
      };

      // Attach scroll event listener
      const ref = scrollRef.current;
      if (ref) {
        ref.addEventListener("scroll", handleScroll);
      }

      // Cleanup scroll event listener on unmount
      return () => {
        if (ref) {
          ref.removeEventListener("scroll", handleScroll);
        }
      };
    }, [loadingMore, hasMore]);

    // useEffect(() => {
    //   console.log(jobs.length);
    // }, [jobs]);

    return (
      <section
        ref={scrollRef}
        className="max-h-full overflow-y-auto scrollbar-hide overscroll-contain w-full justify-self-center scroll-smooth"
      >
        {!loaded && jobs.length === 0 ? (
          <Skeleton />
        ) : (
          <>
            {/* <div id="start" className="absolute top-0" /> */}
            {jobs.length > 0 ? (
              <>
                <ul className="sm:space-y-4 space-y-3 w-full flex flex-col items-center">
                  {jobs.map((job, index) => (
                    <JobCard
                      key={index}
                      job={job}
                      // seekerside={appliedJobs || !postedJobs}
                      seekerside={type === "applied" || type === "jobs"}
                    />
                  ))}
                </ul>
                {loadingMore && (
                  <div style={{ textAlign: "center", padding: "1rem" }}>
                    Fetching more jobs...
                  </div>
                )}
              </>
            ) : type === "applied" ? (
              <div className="w-full h-full flex flex-col items-center justify-center gap-y-2">
                <h1 className="text-2xl text-gray-600 font-semibold my-4">
                  No jobs applied
                </h1>
                <Image
                  src="/assets/icons/no-applications.svg"
                  alt="No applicants found"
                  width={500}
                  height={500}
                  className="sm:w-80 sm:h-80 h-32 w-32"
                />
                <p className="text-gray-500">Try changing the search filters</p>
                <span className="uppercase text-xl font-semibold text-gray-300">
                  or
                </span>
                <Link href="/seeker-dashboard">
                  <p className="text-blue-500 underline hover:underline-offset-2">
                    Go to all jobs posted
                  </p>
                </Link>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-y-2">
                <h1 className="text-2xl text-gray-600 font-semibold my-4">
                  No jobs found
                </h1>
                <Image
                  src="/assets/icons/no-applications.svg"
                  alt="No applicants found"
                  width={500}
                  height={500}
                  className="sm:w-80 sm:h-80 h-32 w-32"
                />
                <p className="text-gray-500">
                  Try changing the search filters to find more jobs
                </p>
                <span className="uppercase text-xl font-semibold text-gray-300">
                  or
                </span>
                <Link href="/post">
                  <p className="text-blue-500 underline hover:underline-offset-2">
                    Post a job
                  </p>
                </Link>
              </div>
            )}
          </>
        )}

        <Link
          href="#start"
          title="Scroll to top"
          onClick={() => scrollRef.current?.scrollTo(0, 0)}
          ref={scrollToTopRef}
          className="bg-blue-100 text-blue-500 absolute sm:right-6 right-2 lg:bottom-4 bottom-2 px-2 pt-2 pb-1 rounded"
          style={{ display: "none" }} // Initially hide the link
        >
          <BiSolidArrowToTop className="w-6 h-6 animate-bounce" />
        </Link>
      </section>
    );
  }
);

// Add a displayName for better debugging
JobsList.displayName = "JobsList";

export default JobsList;
