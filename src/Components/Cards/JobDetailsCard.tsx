import { CiMoneyBill, CiLocationOn } from "react-icons/ci";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { GiSandsOfTime, GiSkills } from "react-icons/gi";
import { IoTimerOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { GrUserExpert } from "react-icons/gr";
import { FaPlusSquare } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import SkillTags from "@/constants/data/skillTags.json";
import ApplicantCard from "@/Components/Cards/ApplicantCard";
import SearchSelectDropdown from "@/Components/Forms/Custom/SearchSelectDropdown";
import Spinner from "../Loaders/Spinner";

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

interface Job {
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
}

type JobDetailsCardProps = {
  type?: string;
  jobDetails: Job;
  handleApplyJob?: () => void;
  isApplied?: boolean;
  setIsDeleteModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  handleSkillChange?: (tags: string[]) => void;
  // handleScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  setIndex?: React.Dispatch<React.SetStateAction<number>>;
  visibleApplications?: Application[];
  loading?: boolean;
};

const JobDetailsCard = ({
  type,
  jobDetails,
  handleApplyJob,
  isApplied,
  setIsDeleteModalOpen,
  handleSkillChange,
  // handleScroll,
  setIndex,
  visibleApplications,
  loading,
}: JobDetailsCardProps) => {
  const jobId = jobDetails.id;

  const formatDate = (deadline: string) => {
    const date = new Date(deadline);

    // Format the date to DD/MM/YYYY
    const formattedDate = date.toLocaleDateString("en-GB"); // 'en-GB' formats to DD/MM/YYYY
    return formattedDate;
  };

  const getTimePast = (date: string) => {
    const currentDate = new Date();
    const pastDate = new Date(date);
    const timeDiff = currentDate.getTime() - pastDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    if (daysDiff === 0) {
      return "today";
    } else if (daysDiff === 1) {
      return "yesterday";
    } else if (daysDiff < 7) {
      return `${daysDiff} days ago`;
    } else if (daysDiff < 30) {
      const weeksDiff = Math.floor(daysDiff / 7);
      return `${weeksDiff} week${weeksDiff > 1 ? "s" : ""} ago`;
    } else if (daysDiff < 365) {
      const monthsDiff = Math.floor(daysDiff / 30);
      return `${monthsDiff} month${monthsDiff > 1 ? "s" : ""} ago`;
    } else {
      const yearsDiff = Math.floor(daysDiff / 365);
      return `${yearsDiff} year${yearsDiff > 1 ? "s" : ""} ago`;
    }
  };

  const skillsArray = jobDetails?.skills_required.split(",");
  const benefitsArray = jobDetails?.benefits.split(",");

  return (
    <>
      <h1 className="text-center lg:text-4xl md:text-3xl text-2xl font-bold text-gray-800 font-RadioGrotesk tracking-wide">
        {jobDetails.job_role || "Job Title"}
      </h1>

      <div className="sm:mx-4 sm:my-6 my-3 sm:px-14 px-6 max-[450px]:px-4 sm:py-8 py-4 border-2 sm:border-gray-300 sm:rounded-xl rounded-sm relative">
        <div className="flex justify-between items-start gap-10">
          <div>
            <h4 className="sm:text-lg text-base font-semibold text-gray-600 mb-1">
              {jobDetails.industry} -{" "}
              <span className="hover:text-blue-500 transition-colors duration-300 cursor-default">
                {jobDetails.employment_type} Opportunity
              </span>
            </h4>
            <h5 className="text-sm font-semibold text-gray-400 sm:mb-2 mb-1">
              {jobDetails.posted_by.company_name}
            </h5>

            <div className="sm:my-3 sm:mb-5 mb-3 my-1.5 flex flex-wrap items-center sm:gap-x-10 gap-x-6 gap-y-2">
              <h2 className="block">
                <CiLocationOn
                  size={18}
                  className="inline me-1.5 text-gray-700"
                />
                <p className="text-gray-500 text-sm inline-block">
                  <span className="inline-block font-semibold">Location -</span>{" "}
                  {jobDetails.job_location}
                </p>
              </h2>

              <h2 className="block">
                <CiMoneyBill
                  size={20}
                  className="inline me-1.5 text-gray-700"
                />
                <p className="text-gray-500 text-sm inline-block">
                  <span className="inline-block font-semibold">Salary -</span> ₹
                  {jobDetails.annual_salary_min} -{jobDetails.annual_salary_max}{" "}
                  {jobDetails.currency_type.toLocaleUpperCase()}
                </p>
              </h2>

              <h2 className="block">
                <GiSandsOfTime
                  size={16}
                  className="inline me-1.5 text-gray-700"
                />
                <p className="text-gray-500 text-sm inline-block">
                  <span className="inline-block font-semibold">Apply by -</span>{" "}
                  {formatDate(jobDetails.application_deadline)}
                </p>
              </h2>

              <h2 className="block">
                <GrUserExpert
                  size={16}
                  className="inline me-1.5 text-gray-500"
                />
                <p className="text-gray-500 text-sm inline-block">
                  <span className="inline-block font-semibold">
                    Experience -
                  </span>{" "}
                  {jobDetails.experience_needed}
                </p>
              </h2>
            </div>

            <div className="flex items-center gap-2 sm:my-6 my-3">
              <span className="bg-gray-200 text-xs text-gray-600 px-1.5 py-1 rounded-lg">
                <IoTimerOutline size={14} className="inline me-1.5" />
                Posted {getTimePast(jobDetails.created_at)}
              </span>
              <span className="bg-gray-200 text-xs text-gray-600 px-1.5 py-1 rounded-lg">
                {jobDetails.employment_type}
              </span>
            </div>
          </div>

          <div className="rounded-md relative w-32 h-32 sm:block hidden shrink-0">
            <Link
              href={jobDetails.posted_by.company_website || "#"}
              className="block w-full h-full relative"
            >
              <Image
                src={
                  jobDetails.posted_by.company_photo_url ||
                  "/assets/images/default-profile.webp"
                }
                alt={jobDetails.posted_by.company_name}
                sizes="100%"
                fill
                className="object-contain rounded-md"
              />
            </Link>
          </div>

          {type === "posted" && (
            <div className="absolute right-2 top-2 p-2 space-y-3">
              <Link
                href={`/postedJobs/${jobId}/edit`}
                title="Edit Job"
                className="p-1 block outline-none border-2 border-gray-300 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                <MdEdit size={20} className="text-blue-500" />
              </Link>
              <button
                title="Delete Job"
                onClick={() => {
                  setIsDeleteModalOpen!((curr) => !curr);
                }}
                className="p-1 block outline-none border-2 border-gray-300 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                <MdDeleteForever size={20} className="text-red-500" />
              </button>
            </div>
          )}
        </div>

        <hr className="border-gray-200 border sm:mt-4 mt-2 sm:mb-6 mb-4" />

        <h2 className="text-lg font-semibold text-blue-600 mb-4">
          About the internship /Job
        </h2>

        <div className="sm:text-base text-sm">
          <article
            dangerouslySetInnerHTML={{ __html: jobDetails.job_description }}
          ></article>
        </div>

        <div className="sm:space-y-6 space-y-4 sm:my-8 my-5">
          <div className="flex flex-wrap gap-x-2 gap-y-2 items-start">
            <h2 className="flex items-center pt-0.5">
              <GiSkills size={18} className="inline me-1.5 text-gray-700" />
              <span className="font-semibold text-sm text-gray-500 text-nowrap">
                Skills required -
              </span>
            </h2>

            <div className="flex flex-wrap gap-x-2 gap-y-2">
              {skillsArray?.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-lg font-semibold whitespace-nowrap"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-y-2 gap-x-2 items-start">
            <h2 className="flex items-center pt-0.5">
              <FaPlusSquare size={18} className="inline me-1.5 text-gray-700" />
              <span className="font-semibold text-sm text-gray-500 text-nowrap">
                Benefits -
              </span>
            </h2>

            <div className="flex flex-wrap gap-x-2 gap-y-2">
              {benefitsArray?.map((benefit, index) => (
                <span
                  key={index}
                  className="px-2 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-lg font-semibold whitespace-nowrap"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-blue-600 mt-6 mb-4 flex justify-between">
          <Link
            href={jobDetails.apply_url || "#"} // need to change this
            className="hover:underline underline-offset-2"
          >
            How to Apply
            <IoIosLink size={20} className="inline ms-2 text-blue-600" />
          </Link>

          <Link
            href={jobDetails.apply_url || "#"} // need to change this
            className="px-3 py-1 rounded-md bg-blue-200 text-blue-500 text-sm "
          >
            Link
          </Link>
        </h2>

        <div className="sm:text-base text-sm">
          <article
            dangerouslySetInnerHTML={{ __html: jobDetails.how_to_apply }}
          ></article>
        </div>

        {type === "posted" ? (
          <>
            <hr className="border-gray-200 border sm:my-6 my-3" />
            <h2 className="mb-2 flex flex-wrap justify-between items-start gap-y-2">
              <span className="text-base font-semibold text-blue-600">
                Applicants
              </span>
              {/* <div className="flex items-end max-w-sm gap-3">
                <SearchSelectDropdown
                  req={false}
                  label="Skills"
                  labelCls="text-gray-700 font-semibold relative flex items-center gap-2"
                  cls="relative w-full p-2 bg-gray-100 text-primary-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic"
                  tags={SkillTags}
                  onChange={handleSkillChange}
                  placeholder="Eg: Software Developer"
                  displayTagsLength={4}
                />
              </div> */}
            </h2>
            {visibleApplications!.length > 0 ? (
              <div
                className="overflow-y-auto max-h-72 scrollbar-hide grid lg:grid-cols-2 grid-cols-1 gap-4 py-6"
                // onScroll={handleScroll}
              >
                {visibleApplications!.map((applicant, index) => (
                  <ApplicantCard
                    key={index}
                    val={index}
                    applicant={applicant}
                    setIndex={setIndex}
                  />
                ))}
                {loading && <Spinner />}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-fit">
                <p className="text-gray-500 font-semibold sm:text-2xl text-xl">
                  No applicants found
                </p>
                <Image
                  src="/assets/icons/no-applications.svg"
                  alt="No applicants found"
                  width={500}
                  height={500}
                  className="sm:w-40 sm:h-40 h-20 w-20"
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center pt-4">
            <button
              onClick={handleApplyJob}
              disabled={isApplied}
              className="bg-blue-500 hover:bg-blue-600 text-white sm:px-8 px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isApplied ? "Applied" : "Apply"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default JobDetailsCard;
