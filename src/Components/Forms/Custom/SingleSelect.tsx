import React, { useState, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface SingleSelectProps {
  label: string;
  options: Option[]; // Updated to accept an array of objects with value and label
  onSelectionChange: (selectedOption: string) => void;
  val: string | undefined;
}

const SingleSelect: React.FC<SingleSelectProps> = ({
  label,
  options,
  onSelectionChange,
  val,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    if (val && val !== selectedOption) {
      setSelectedOption(val);
    }
  }, [val, selectedOption]);

  const handleOptionChange = (optionValue: string) => {
    setSelectedOption(optionValue);
    onSelectionChange(optionValue);
  };

  return (
    <div>
      <label className="block font-semibold text-gray-500 mb-1">{label}</label>

      {options.map((option) => (
        <div key={option.value} className="mt-2 text-[14px]">
          <label>
            <input
              type="radio"
              checked={option.value === selectedOption}
              onChange={() => handleOptionChange(option.value)}
              className="mr-2"
            />
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SingleSelect;
