import React, { useState, useEffect } from "react";

interface BenefitOptionsProps {
  selected?: string[];
  options: string[];
  onChange: (benefits: string[]) => void;
}

const BenefitOptions = ({
  selected = [],
  options = [],
  onChange,
}: BenefitOptionsProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selected);
  const [displayedOptions, setDisplayedOptions] = useState<string[]>([]);
  const [excessTagsCount, setExcessTagsCount] = useState<number>(0);

  const displayTagsLength = 10;
  const increment = 5;

  const removeEmojis = (text: string) => {
    return text
      .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
      .trim();
  };

  const isSelected = (option: string) => {
    const normalizedOption = removeEmojis(option);
    return selectedOptions.some(
      (selected) => removeEmojis(selected).trim() === normalizedOption.trim()
    );
  };

  const handleOptionClick = (option: string) => {
    const normalizedOption = removeEmojis(option);
    let newSelectedOptions: string[];

    if (
      selectedOptions.some(
        (item) => removeEmojis(item).trim() === normalizedOption.trim()
      )
    ) {
      newSelectedOptions = selectedOptions.filter(
        (item) => removeEmojis(item).trim() !== normalizedOption.trim()
      );
    } else {
      newSelectedOptions = [...selectedOptions, option];
    }

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  const handleExpansion = () => {
    if (!options) return;

    // Sort all options with selected items first
    const sortedOptions = [...options].sort((a, b) => {
      const aSelected = isSelected(a);
      const bSelected = isSelected(b);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return 0;
    });

    if (excessTagsCount > increment) {
      setDisplayedOptions(
        sortedOptions.slice(0, displayedOptions.length + increment)
      );
      setExcessTagsCount((prev) => prev - increment);
    } else if (excessTagsCount <= increment && excessTagsCount > 0) {
      setDisplayedOptions(sortedOptions);
      setExcessTagsCount(0);
    } else {
      setDisplayedOptions(sortedOptions.slice(0, displayTagsLength));
      setExcessTagsCount(sortedOptions.length - displayTagsLength);
    }
  };

  // Initialize selected options when 'selected' prop changes
  useEffect(() => {
    if (selected && selected.length !== 0) {
      setSelectedOptions(selected);
    }
  }, [selected]);

  // Initialize and sort displayed options when options or selections change
  useEffect(() => {
    if (!options) return;

    // Sort options with selected items first
    const sortedOptions = [...options].sort((a, b) => {
      const aSelected = isSelected(a);
      const bSelected = isSelected(b);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return 0;
    });

    const initialDisplayed = sortedOptions.slice(0, displayTagsLength);
    setDisplayedOptions(initialDisplayed);
    setExcessTagsCount(Math.max(0, options.length - displayTagsLength));
  }, [options, selectedOptions]); // Added selectedOptions as dependency for re-sorting

  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center">
      {displayedOptions.map((option, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleOptionClick(option)}
          className={`m-1 px-2 py-1.5 ${
            isSelected(option)
              ? "bg-blue-100 text-blue-500"
              : "bg-gray-100 text-gray-500"
          } border rounded-md inline-flex items-center text-sm cursor-pointer font-semibold transition-colors duration-150`}
        >
          {option}
        </button>
      ))}
      {excessTagsCount > 0 && (
        <button
          type="button"
          onClick={handleExpansion}
          className="text-blue-500 text-xs font-semibold h-fit px-2.5 py-1 hover:bg-gray-200 rounded-full transition-colors duration-150"
        >
          {excessTagsCount ? `+${excessTagsCount}` : "Show less"}
        </button>
      )}
    </div>
  );
};

export default BenefitOptions;
