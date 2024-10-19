import React, { useState } from "react";
import PdfUploadForm from "../Forms/Custom/ResumeUpload";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { swalFailed, swalSuccess } from "@/lib/helpers/swal";

interface JobApplicationModalProps {
  isResumePresent: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  jobId: number;
  setIsApplied: React.Dispatch<React.SetStateAction<boolean>>;
}

const JobApplicationModal = ({
  isResumePresent,
  setIsModalOpen,
  jobId,
  setIsApplied,
}: JobApplicationModalProps) => {
  const [resume, setResume] = useState<File | null>(null);
  const [resumeChanged, setResumeChanged] = useState<boolean>(false);
  const [isResumeSaved, setIsResumeSaved] = useState<boolean>(false);
  const [description, setDescription] = useState("");
  const maxDescriptionLength = 1000;

  const handleResumeChange = (name: string, file: File | null) => {
    setResumeChanged(true);
    setResume(file);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setDescription(value.slice(0, maxDescriptionLength)); // Limit to max length
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const access_token = localStorage.getItem("access_token");

    if (resume && resumeChanged && !isResumeSaved) {
      await handleFileUpload(resume, "resume");
    }

    try {
      const response = await axios.post(
        `${baseurl}/jobs/${jobId}/apply/`,
        {
          cover_letter: description,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      // console.log("Applied for job", response.data);

      setIsApplied(true);
      swalSuccess({
        title: "Job Applied",
        message:
          "Application submitted successfully. Please wait for the recruiter to contact you.",
      });
    } catch (error: any) {
      console.error("Error applying for job", error.response.data || error);
      swalFailed({
        title: "Error!",
        error: "Failed to submit the application. Please try again.",
      });
    }
    setIsModalOpen(false);
  };

  const handleFileUpload = async (file: File, fileType: string) => {
    // console.log(file);
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const token = localStorage.getItem("access_token");

    const formData = new FormData();
    formData.append("file", file); // Append the file to FormData

    try {
      // console.log(`Uploading ${fileType}...`);
      const response = await fetch(`${baseurl}/accounts/upload/resume/`, {
        method: "PUT",
        body: formData, // Send the file data
        headers: {
          Authorization: `Bearer ${token}`, // Include the token
        },
      });

      const result = await response.json();
      // console.log(result);

      if (response.ok) {
        // console.log(`${fileType} uploaded successfully`, result);
        setIsResumeSaved(true);
      } else {
        console.error(`Error uploading ${fileType}:`, result);
      }
    } catch (error) {
      console.error(`Network error while uploading ${fileType}:`, error);
    }
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed z-[70] flex justify-center items-center w-full inset-0 h-full select-none">
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 border-gray-300">
            <h3 className="text-lg font-semibold text-gray-900">
              {!isResumePresent && "Resume & "} Cover Letter
            </h3>
            <button
              type="button"
              className="bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1 ml-auto inline-flex items-center"
              onClick={() => setIsModalOpen(false)}
            >
              <IoMdClose size={24} className="text-gray-500" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isResumePresent && (
              <PdfUploadForm
                name="resume"
                onChange={handleResumeChange}
                submit={handleFileUpload}
                setFlag={setResumeChanged}
              />
            )}

            <div>
              <label
                htmlFor="cover_letter"
                className="text-gray-500 font-semibold block pb-1"
              >
                Cover Letter
              </label>
              <textarea
                id="cover_letter"
                name="cover_letter"
                rows={7}
                value={description}
                onChange={handleDescriptionChange}
                maxLength={maxDescriptionLength}
                placeholder="Enter your Cover Letter here...(max 1000 characters)"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400 scrollbar-hide"
              />
              <div className="text-xs text-gray-500 text-right">
                {description.length}/{maxDescriptionLength} characters
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 mt-6">
              <button
                type="submit"
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationModal;
