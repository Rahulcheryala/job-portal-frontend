import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CoverLetterModal from "../Modals/CoverLetterModal";

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

interface ApplicantProps {
  val: number;
  applicant: Application;
  setIndex?: React.Dispatch<React.SetStateAction<number>>;
}

const ApplicantCard = ({ applicant, val, setIndex }: ApplicantProps) => {
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isCoverLetterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isCoverLetterOpen]);

  return (
    <>
      {isCoverLetterOpen && (
        <>
          <div className="fixed z-[60] w-[100vw] h-[100dvh] inset-0 bg-black opacity-70 backdrop-blur-sm transition-opacity duration-1000"></div>

          <CoverLetterModal
            setIsCoverLetterOpen={setIsCoverLetterOpen}
            cover_letter={applicant.cover_letter}
          />
        </>
      )}
      <div className="flex border justify-between flex-wrap p-4 rounded-lg bg-gray-100 gap-y-3">
        <div className="flex items-center gap-x-4">
          <div className="shrink-0">
            <Image
              src={
                // applicant.applicant_profile_picture || // need to change this
                "/assets/images/default-profile.webp"
              }
              alt={
                applicant.applicant.first_name +
                " " +
                applicant.applicant.last_name
              }
              width={64}
              height={64}
              className="rounded-full sm:w-16 sm:h-16 max-[450px]:w-12 max-[450px]:h-12 w-8 h-8 object-cover"
            />
          </div>

          <div className="sm:space-y-1 space-y-0.5 w-full max-w-md">
            <h3 className="font-bold text-gray-700 xl:text-base lg:text-sm text-xs line-clamp-1">
              {applicant.applicant.first_name} {applicant.applicant.last_name}
            </h3>
            <p className="md:text-sm text-xs text-gray-500 line-clamp-1">
              {applicant.applicant.email}
            </p>
            {/* <p className="md:text-sm text-xs text-gray-500 line-clamp-1">
            {applicant.applicant_phone}
          </p> */}
            <p className="sm:text-xs text-[10px] text-gray-400 line-clamp-1">
              Applied - {new Date(applicant.applied_at!).toDateString()}
            </p>
          </div>
        </div>

        <div className="flex sm:flex-col flex-row max-sm:mx-auto items-center sm:justify-center gap-2">
          <button
            onClick={() => {
              setIndex && setIndex(val);
              setIsCoverLetterOpen && setIsCoverLetterOpen(true);
            }}
            className="sm:px-4 sm:py-2 px-2.5 py-1 text-sm w-full font-semibold text-gray-600 hover:text-gray-50 bg-gray-300 hover:bg-blue-400 rounded-lg transition-colors duration-300 whitespace-nowrap"
          >
            Cover Letter
          </button>
          <Link
            href={applicant.resume_url || ""}
            className="sm:px-4 sm:py-2 px-2.5 py-1 text-sm w-full font-semibold text-gray-600 hover:text-gray-50 bg-gray-300 hover:bg-blue-400 rounded-lg transition-colors duration-300 text-center"
          >
            Resume
          </Link>
        </div>
      </div>
    </>
  );
};

export default ApplicantCard;
