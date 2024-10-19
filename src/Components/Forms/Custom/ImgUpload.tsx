"use client";

import React, { useRef, useState, useEffect } from "react";
import { MdCancel, MdDone } from "react-icons/md";

interface ImgProps {
  label: string;
  name: string;
  Url: string | null;
  onChange?: (name: string, file: File | null) => void;
  submit?: (file: File, fileType: string) => void;
  setFlag?: React.Dispatch<React.SetStateAction<boolean>>;
  readOnly?: boolean;
}

const ImgUpload: React.FC<ImgProps> = ({
  label,
  name,
  Url,
  onChange,
  setFlag,
  submit,
  readOnly,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [backgroundImg, setBackgroundImg] = useState<string | null>(null);
  const [isFileChanged, setIsFileChanged] = useState<boolean>(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setBackgroundImg(imageUrl);
      setUploadedFile(selectedFile);
      setIsFileChanged(true);

      onChange && onChange(name, selectedFile);
      // Reset input value to allow selecting the same file again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input value
      }
    }

    setFlag && setFlag(true);
  };

  const handleFileRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (Url) {
      // If there is an initial URL, revert to that
      setBackgroundImg(Url);
      onChange && onChange(name, null); // Notify parent of removal
      setUploadedFile(null); // Reset uploaded file state
      setIsFileChanged(false); // Reset file changed state
    } else {
      // If no initial URL, reset to null
      setBackgroundImg(null);
      onChange && onChange(name, null); // Notify parent of removal
      setUploadedFile(null); // Reset uploaded file state
      setIsFileChanged(false); // Reset file changed state
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input to clear selection
    }
  };

  useEffect(() => {
    if (Url) {
      setBackgroundImg(Url); // Set initial background if `Url` is provided
      setUploadedFile(null); // Reset uploaded file state when initial URL is set
      setIsFileChanged(false); // Reset file changed state when initial URL is set
    }
  }, [Url]);

  // useEffect(() => {
  //   console.log(backgroundImg);
  // }, [backgroundImg]);

  return (
    <div className="space-y-2">
      <h1 className="text-gray-700 font-Nunito">{label}</h1>
      <div
        className={`flex items-center justify-center w-28 h-28 border-2 border-gray-300 rounded-full cursor-pointer relative bg-white`}
        style={{
          backgroundImage: `url(${backgroundImg || "/assets/images/default-profile.webp"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          cursor: readOnly ? "default" : "pointer",
        }}
        onClick={handleButtonClick}
        title={
          readOnly
            ? "This field is read-only, you can edit it in profile edit page"
            : "Upload Image"
        }
      >
        {!backgroundImg && (
          <span className="text-sm text-gray-200 font-semibold absolute top-1/2 -translate-y-1/2 bg-gray-500 px-1.5 py-1 rounded cursor-pointer">
            Upload
          </span>
        )}

        <input
          id="image"
          name="image"
          type="file"
          ref={fileInputRef}
          className="hidden disabled:bg-gray-300 disabled:cursor-default"
          onChange={handleFileChange}
          accept="image/jpeg, image/png" // Allow only jpg, jpeg, and png formats
          readOnly={readOnly}
          disabled={readOnly}
        />

        {isFileChanged && uploadedFile && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFileRemove(e);
              }}
              className="absolute right-0 bottom-1 flex items-center gap-x-0.5"
            >
              <MdCancel
                size={24}
                className="text-red-500 bg-white rounded-full"
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                submit && submit(uploadedFile!, name);
              }}
              className="absolute -right-2 bottom-7 flex items-center gap-x-0.5"
            >
              <MdDone
                size={20}
                className="text-white bg-green-500 rounded-full"
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImgUpload;
