import React from "react";
import { IoMdClose } from "react-icons/io";

type CoverLetterModalProps = {
  setIsCoverLetterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // jobDetails: any;
  // index: number;
  cover_letter: string;
};

const CoverLetterModal = ({
  setIsCoverLetterOpen,
  // jobDetails,
  // index,
  cover_letter,
}: CoverLetterModalProps) => {
  return (
    <div className="overflow-y-auto overflow-x-hidden fixed z-[70] flex justify-center items-center w-full inset-0 h-full select-none">
      <div className="relative w-full max-w-lg h-auto">
        <div className="relative p-4 flex flex-col w-full text-center bg-gray-100 rounded-lg shadow dark:bg-gray-800 sm:p-8">
          <h2 className="text-gray-500 font-semibold w-full mb-4">
            Cover Letter
          </h2>
          <hr className="border-gray-300 mb-4 " />
          <button className="absolute top-5 right-5 rounded-md bg-transparent hover:bg-gray-200 p-1">
            <IoMdClose
              size={24}
              className="text-red-500 "
              onClick={() => setIsCoverLetterOpen(false)}
            />
          </button>
          <p className="text-left">
            {cover_letter ||
              "I'm interested in this opportunity and I believe I have the right skills for this opportunity."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterModal;
