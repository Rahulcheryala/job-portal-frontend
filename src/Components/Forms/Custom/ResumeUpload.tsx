import Link from "next/link";
import React, { useState, useEffect, ChangeEvent } from "react";
import { IoCloudUpload } from "react-icons/io5";

interface PdfUploadFormProps {
  name: string;
  Url?: string;
  onChange: (name: string, file: File | null) => void;
  submit: (file: File, fileType: string) => void;
  setFlag?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PdfUploadForm: React.FC<PdfUploadFormProps> = ({
  name,
  Url,
  onChange,
  submit,
  setFlag,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [existingUrl, setExistingUrl] = useState<string | null>(Url!);

  useEffect(() => {
    if (Url) {
      setExistingUrl(Url);
    }
  }, [Url]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const urlToUse = file ? URL.createObjectURL(file) : existingUrl;
      // console.log(urlToUse);
      setSelectedFile(file);
      // console.log("Selected File:", file);
      onChange(name, file);
      setFlag && setFlag(true);
    }
  };

  return (
    <div>
      <label htmlFor="resume" className="text-gray-500 font-semibold block">
        Resume
      </label>
      {existingUrl && (
        <Link
          href={existingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline inline-block cursor-pointer mt-2"
        >
          Existing Resume File
        </Link>
      )}
      <input
        type="file"
        name="resume"
        id="resume"
        accept=".pdf"
        multiple={false}
        onChange={handleFileChange}
        className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm outline-none focus-visible:ring-2 focus:ring-blue-300 file:bg-gray-500 file:border-0 file:me-4 file:py-2 file:px-2.5 placeholder:text-gray-400"
        required={true}
      />
      {selectedFile && (
        <button
          onClick={() => submit(selectedFile, name)}
          className="flex items-center mx-auto gap-1.5 mt-2 text-sm text-gray-500 cursor-pointer"
        >
          <IoCloudUpload className="text-lg text-gray-500" />
          <span className="text-gray-500 font-semibold">Upload Resume</span>
        </button>
      )}
    </div>
  );
};

export default PdfUploadForm;
