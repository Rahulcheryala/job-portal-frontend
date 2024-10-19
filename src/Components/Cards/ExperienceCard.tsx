"use client";
import React, { useState } from "react";
import ExperienceForm from "../Forms/ExperienceForm";
import Link from "next/link";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";

interface ExperienceCardProps {
  index: number;
  company_name: string;
  title: string;
  start_date: string;
  end_date: string | null;
  currently_working: boolean;
  description: string;

  // prop drill
  workExperienceArray: any[];
  setWorkExperienceArray: Function;
  onSubmitArrays: Function;
  defaultPostEditFormInputCls: string;
}

const ExperienceCard = ({
  index,
  company_name,
  title,
  start_date,
  end_date,
  currently_working,
  description,
  workExperienceArray,
  setWorkExperienceArray,
  onSubmitArrays,
  defaultPostEditFormInputCls,
}: ExperienceCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    const filteredWorkExperienceArray = workExperienceArray.filter(
      (_: any, i: number) => i !== index
    );

    setWorkExperienceArray(filteredWorkExperienceArray);
    onSubmitArrays(filteredWorkExperienceArray);
  };

  return (
    <div className="flex-1 w-full">
      {!isEditing && (
        <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-400 bg-white">
          <div className="relative w-full">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <span className="font-normal text-gray-600 italic">at</span>
                <Link
                  href={`https://${company_name.toLowerCase().replace(/\s+/g, "")}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Company Website"
                  className="text-blue-600 font-semibold hover:underline outline-none focus-visible:underline focus-visible:underline-offset-2"
                >
                  {company_name}
                </Link>
              </div>
              <div className="text-gray-500 text-sm">
                {start_date!}
                <span className="text-gray-500 mx-2">-</span>
                {end_date ? end_date : "Currently Working"}
              </div>
              <p className="mt-2 text-xs">{description}</p>
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
        <ExperienceForm
          index={index}
          setIsEditing={setIsEditing}
          formData={{
            company_name: company_name,
            title: title,
            start_date: start_date,
            end_date: end_date,
            currently_working: currently_working,
            description: description,
          }}
          // prop drill
          setWorkExperienceArray={setWorkExperienceArray}
          onSubmitArrays={onSubmitArrays}
          defaultPostEditFormInputCls={defaultPostEditFormInputCls}
        />
      )}
    </div>
  );
};

export default ExperienceCard;
