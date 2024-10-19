"use client";

import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface FormInputProps {
  key?: string;
  cls?: string;
  placeholder?: string;
  req?: boolean;
  disabled?: boolean;
  id: string;
  label?: string;
  value?: string;
  type: string;
  register?: UseFormRegister<any>;
  errors?: FieldError;
  name: string;
  description?: string;
}

const PostFormInput = ({
  id,
  name,
  type,
  label,
  value,
  register,
  placeholder,
  req,
  disabled,
  cls,
  errors,
  description,
}: FormInputProps) => {
  return (
    <div className="flex flex-col justify-center w-full">
      <label
        className="text-gray-700 font-semibold relative flex items-center gap-2"
        htmlFor={name}
      >
        {label}
        {description && (
          <>
            <button
              type="button"
              className="w-2 h-2 p-2.5 bg-gray-200 text-gray-400 text-sm rounded-full flex items-center justify-center outline-none hover:bg-gray-300 hover:text-gray-500 focus:bg-gray-300 focus:text-gray-500 peer"
            >
              ?
            </button>
            <div className="absolute z-10 left-0 transform top-full translate-y-8 mb-2 max-w-sm bg-blue-100 text-gray-600 text-xs font-medium px-2 py-1 rounded opacity-0 peer-hover:opacity-100 peer-hover:translate-y-0 peer-hover:z-10 transition-all duration-300 ease-in-out pointer-events-none">
              {description}
            </div>
          </>
        )}
        <span
          className={`text-red-500 ${req && label ? "inline-block" : "hidden"}`}
        >
          *
        </span>
      </label>

      <div className="relative w-full flex flex-col isolate">
        <input
          {...(register ? register(name) : {})}
          id={id}
          name={name}
          type={type}
          required={req}
          className={`${cls} read-only:bg-gray-300 read-only:cursor-default`}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={value || ""} // Use defaultValue for read-only fields
          title={
            value &&
            "This field is read-only, you can edit it in profile edit page"
          }
          readOnly={!!value} // Keep it read-only if value is provided
        />

        <span
          className={`text-red-500 text-xs absolute font-semibold  ${errors ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} transition-all transform duration-300 absolute z-10 bg-red-50 rounded-b-md top-full px-2 py-0.5 before:content-[''] before:absolute before:w-2 before:h-2 before:bg-red-50 before:left-0 before:bottom-full after:content-[''] after:absolute after:z-10 after:w-2 after:h-2 after:bg-gray-50 after:rounded-bl-md after:border-l after:border-b after:border-gray-300 after:left-0 after:bottom-full`}
        >
          {errors?.message}
        </span>
      </div>
    </div>
  );
};

export default PostFormInput;
