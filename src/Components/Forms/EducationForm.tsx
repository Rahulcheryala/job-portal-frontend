"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CollegeSelect from "./Inputs/apiLinked/CollegeSelect";
import SignupFormInput from "./Inputs/SignupFormInput";
import SearchSelectDropdown from "./Custom/SearchSelectDropdown";
import degreeOpns from "@/constants/data/degree.json";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { educationSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import majorOpns from "@/constants/data/major.json";

type EducationSchema = z.infer<typeof educationSchema>;

type Education = {
  college_name: string;
  degree?: string;
  major?: string;
  year_of_graduation?: number | null;
  gpa?: number | null;
};

interface EducationFormProps {
  onSubmitArrays: Function;
  setEducationArray: Function;
  defaultPostEditFormInputCls?: string;
  dropdown?: Dispatch<SetStateAction<boolean>>;
  formData?: Education;
  index?: number;
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
  educationArray?: Education[];
  onSubmit?: Function;
}

const EducationForm = ({
  onSubmitArrays,
  setEducationArray,
  defaultPostEditFormInputCls,
  dropdown,
  formData,
  index,
  setIsEditing,
  educationArray,
  onSubmit,
}: EducationFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EducationSchema>({
    resolver: zodResolver(educationSchema),
    mode: "onChange",
    defaultValues: {
      year_of_graduation: Number(new Date().getFullYear()),
      gpa: 0,
    },
  });

  const [educationFormData, setEducationFormData] = useState<Education>({
    college_name: "",
    degree: "",
    major: "",
  });
  const [educationFormReset, setEducationFormReset] = useState(false);

  useEffect(() => {
    if (formData) {
      // console.log("setting form data");
      // console.log("formData", formData);
      setEducationFormData(formData);
    }
    setValue("year_of_graduation", formData?.year_of_graduation!);
    setValue("gpa", formData?.gpa!);
  }, [formData]); // do not add setValue in the dependency array, that may cause the variable sized argument error

  const handleEducationChange = (key: string, value: string | boolean) => {
    setEducationFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleAddEducation = (data: EducationSchema) => {
    // console.log("submitting");

    const finalFormData = {
      ...educationFormData,
      ...data,
    };

    let updatedEducationArray: Education[] = [];

    if (index !== undefined) {
      // Editing an existing entry
      setEducationArray((prev: Education[]) => {
        const updatedArray = [...prev];
        updatedArray[index] = finalFormData;
        updatedEducationArray = updatedArray;
        return updatedArray;
      });
    } else {
      // Adding a new entry
      setEducationArray((prev: Education[]) => {
        const updatedArray = [...prev, finalFormData];
        updatedEducationArray = updatedArray;
        return updatedArray;
      });
    }

    // Call onSubmitArrays with the updated education array
    if (onSubmitArrays) {
      onSubmitArrays(undefined, updatedEducationArray);
    }

    dropdown && dropdown(true);
    setIsEditing && setIsEditing(false);
  };

  const handleEducationFormReset = () => {
    // console.log("resetting experience form");
    setEducationFormReset(true);
    setValue("year_of_graduation", null);
    setValue("gpa", null);
    setEducationFormData({
      college_name: "",
      degree: "",
      major: "",
    });
  };

  // useEffect(() => {
  //   console.log("educationFormData", educationFormData);
  // }, [educationFormData]);

  return (
    <form onSubmit={handleSubmit(handleAddEducation)} className="w-full">
      <div className="flex flex-col gap-y-4">
        <div className="flex-1 max-sm:w-full">
          <label className="text-gray-500 font-semibold block mb-1.5 me-1.5">
            University <span className="text-red-500">*</span>
          </label>
          <CollegeSelect
            handle={(val: string) => handleEducationChange("college_name", val)}
            val={
              formData?.college_name !== ""
                ? formData?.college_name!
                : educationFormData.college_name
            }
            reset={educationFormReset}
          />
          {/* {errors.college_name && (
                <p className="text-red-500">{errors.college_name.message}</p>
              )} */}
        </div>

        <div className="grid sm:grid-cols-[1fr,20%] max-sm:grid-flow-row max-sm:grid-rows-2 gap-x-6 gap-y-4 items-start">
          <div className="flex flex-col justify-center w-full">
            <SearchSelectDropdown
              selected={educationFormData.degree}
              label="Degree"
              name="degree"
              labelCls="text-gray-500 text-base font-semibold relative flex items-center gap-2"
              placeholder="Eg: B.Tech"
              cls={defaultPostEditFormInputCls}
              tags={degreeOpns}
              onSingleChange={handleEducationChange}
              multiple={false}
            />
          </div>

          <div className="flex-1 flex flex-col justify-center w-full">
            <SignupFormInput
              id="year_of_graduation"
              name="year_of_graduation"
              type="number"
              label="Graduation"
              placeholder="20xx"
              cls={defaultPostEditFormInputCls}
              control={control}
              error={errors.year_of_graduation}
              req={true}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-[1fr,20%] max-sm:grid-flow-row max-sm:grid-rows-2 gap-x-6 gap-y-4 items-start">
          <div className="flex flex-col justify-center w-full">
            <SearchSelectDropdown
              selected={educationFormData.major}
              label="Major"
              name="major"
              labelCls="text-gray-500 text-base font-semibold relative flex items-center gap-2"
              placeholder="Eg: Computer Science"
              cls={defaultPostEditFormInputCls}
              tags={majorOpns}
              onSingleChange={handleEducationChange}
              multiple={false}
            />
          </div>

          <div className="flex flex-col justify-center w-full">
            <SignupFormInput
              id="gpa"
              name="gpa"
              type="number"
              label="CGPA"
              placeholder="Eg: 8.45"
              cls={defaultPostEditFormInputCls}
              control={control}
              req={true}
              error={errors.gpa}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-x-4 pt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold px-8 py-2 rounded-lg"
        >
          Save
        </button>

        <button
          type="reset"
          onClick={handleEducationFormReset}
          className="bg-blue-500 text-white font-bold px-8 py-2 rounded-lg"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default EducationForm;
