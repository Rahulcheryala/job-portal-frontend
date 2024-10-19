"use client";
import React, { useState } from "react";
import EducationForm from "../Forms/EducationForm";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";

interface EducationCardProps {
  index: number;
  college_name: string;
  year_of_graduation: number | null;
  degree: string;
  gpa: number;
  major: string;

  //prop drill
  educationArray: any[];
  setEducationArray: Function;
  onSubmitArrays: Function;
  defaultPostEditFormInputCls: string;
}

const EducationCard: React.FC<EducationCardProps> = ({
  index,
  college_name,
  year_of_graduation,
  degree,
  gpa,
  major,
  educationArray,
  setEducationArray,
  onSubmitArrays,
  defaultPostEditFormInputCls,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    const filteredEducationArray = educationArray.filter(
      (_: any, i: number) => i !== index
    );

    setEducationArray(filteredEducationArray);
    onSubmitArrays(undefined, filteredEducationArray);
  };

  return (
    <div className="flex-1 w-full">
      {!isEditing && (
        <div
          className="border rounded-lg p-4 shadow-sm 
        hover:shadow-md transition-all duration-300 hover:border-blue-400 bg-white"
        >
          <div className="relative w-full">
            <div className="space-y-2">
              <div className="block line-clamp-1 max-w-[90%]">
                <h3 className="font-semibold text-gray-800 inline">{degree}</h3>{" "}
                <span className="font-normal text-gray-600 italic inline">
                  from{" "}
                </span>
                <h3 className="font-semibold text-gray-800 inline">
                  {college_name}
                </h3>
              </div>

              <div className="flex gap-2 text-gray-600">
                <p>
                  {year_of_graduation
                    ? "Graduated in " + year_of_graduation
                    : "Currently Studying"}
                </p>
                <span>|</span>
                <p>{gpa} GPA</p>
              </div>
            </div>

            <div className="absolute right-0 top-0 flex flex-row items-center gap-1.5">
              <button
                className="text-sm text-blue-600 outline-none rounded p-0.5"
                title="Edit"
                onClick={() => setIsEditing(true)}
              >
                <MdOutlineEdit size={20} />
              </button>
              <button
                className="text-sm text-red-600 outline-none rounded p-0.5"
                title="Delete"
                onClick={handleDelete}
              >
                <MdOutlineDeleteForever size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditing && (
        <EducationForm
          index={index}
          setIsEditing={setIsEditing}
          formData={{
            college_name: college_name,
            year_of_graduation: year_of_graduation,
            degree: degree,
            gpa: gpa,
            major: major,
          }}
          // prop drill
          onSubmitArrays={onSubmitArrays}
          setEducationArray={setEducationArray}
          defaultPostEditFormInputCls={defaultPostEditFormInputCls}
        />
      )}
    </div>
  );
};

export default EducationCard;
