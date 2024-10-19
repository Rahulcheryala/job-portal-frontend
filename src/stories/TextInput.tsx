"use client";
import React, { useState } from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

interface InputProps {
  keyy?: string;
  cls?: string;
  placeholder?: string;
  req?: boolean;
  val?: string;
  disabled?: boolean;
  onChange?: Function;
  type?: string;
  iconColor?: string; // Add iconColor prop
  register?: UseFormRegister<any>;
  errors?: FieldError;
}

interface TextAreaProps {
  keyy?: string;
  cls?: string;
  req?: boolean;
  placeholder?: string;
  val?: string;
  onChange?: Function;
}

export const TextInput = ({
  register,
  errors,
  keyy = "",
  cls = "input w-full max-w-xs",
  placeholder = "",
  val,
  req = false,
  disabled = false,
  onChange,
  type = "text",
  iconColor = "black", // Default to black color for the icon
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const iconClasses = iconColor === "white" ? "text-white" : "text-black"; // Set icon color class

  return (
    <div className="relative w-full">
      <input
        {...register && register(keyy, { required: req })}
        type={type === "password" && !showPassword ? "password" : "text"}
        required={req}
        className={`w-full ${cls} py-2 px-3 border border-gray-300 rounded-lg shadow-sm text-white bg-[#101011]`}
        placeholder={placeholder}
        // value={val}
        disabled={disabled}
        onChange={(event) => onChange && onChange(keyy, event.target.value)}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={handleToggleVisibility}
          className={`absolute top-3 bottom-0 right-2 p-1 flex items-center text-sm h-fit ${iconClasses} outline-none focus-visible:ring-2 ring-gray-400 rounded-xl`} // Apply icon color class
        >
          {showPassword ? (
            <FaRegEye size={20} className="text-gray-500" />
          ) : (
            <FaRegEyeSlash size={20} className="text-gray-500" />
          )}
        </button>
      )}
    </div>
  );
};

export const TextArea = ({
  keyy = "",
  cls = "textarea w-full max-w-xs",
  placeholder = "",
  val,
  req = false,
  onChange,
}: TextAreaProps) => {
  return (
    <textarea
      style={{ height: "250px" }}
      required={req}
      className={cls}
      placeholder={placeholder}
      value={val}
      onChange={(event) => onChange && onChange(keyy, event.target.value)}
    />
  );
};
