"use client";

import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import ClickOutsideDiv from "../../ClickoutsideDiv";

type SearchSelectDropdownProps = {
  usingIn?: string;
  req?: boolean;
  label?: string;
  tags: string[];
  cls?: string;
  labelCls?: string;
  onChange?: (tags: string[]) => void;
  onSingleChange?: (key: string, tag: string) => void;
  multiple?: boolean;
  name?: string;
  placeholder?: string;
  description?: string;
  displayTagsLength?: number;
  selected?: string;
  existingTags?: string[];
  resetFlag?: boolean;
  setResetFlag?: (val: boolean) => void;
};

const SearchSelectDropdown: React.FC<SearchSelectDropdownProps> = ({
  usingIn = "other",
  req = true,
  label,
  tags,
  cls,
  labelCls,
  name,
  onChange,
  onSingleChange,
  multiple = true,
  placeholder = "Search for a tag...",
  description,
  displayTagsLength = 10,
  selected,
  existingTags,
  resetFlag,
  setResetFlag,
}) => {
  const techTags = tags;
  const [inputValue, setInputValue] = useState<string>(selected || "");
  const [filteredTags, setFilteredTags] = useState<string[]>(techTags);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    existingTags || []
  );
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string>("");

  const tagsToShow = isExpanded
    ? selectedTags
    : selectedTags.slice(0, displayTagsLength);
  const excessTagsCount = selectedTags.length - displayTagsLength;

  useEffect(() => {
    if (selected) {
      setInputValue(selected);
    } else {
      setInputValue(""); // Clear input if selected is empty
    }
  }, [selected]);

  useEffect(() => {
    if (resetFlag) {
      setSelectedTags([]);
      setInputValue("");
      setFilteredTags(techTags);
      setResetFlag && setResetFlag(false);
    }
  }, [resetFlag, setResetFlag]);

  useEffect(() => {
    if (existingTags && existingTags.length > 0) {
      setSelectedTags(existingTags);
    }

    // Exclude existingTags from techTags
    const newFilteredTags = techTags.filter(
      (tag) => !existingTags?.includes(tag)
    );

    setFilteredTags(newFilteredTags); // Update state with the filtered tags
  }, [existingTags]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);
    const newFilteredTags = techTags.filter(
      (tag) =>
        tag.toLowerCase().includes(value.toLowerCase()) &&
        !selectedTags.includes(tag)
    );
    setFilteredTags(newFilteredTags);
    if (newFilteredTags.length === 0) {
      setError("No tags with such a value found");
    } else {
      setError("");
    }
    setDropdownOpen(true);
  };

  const handleTagClick = (tag: string): void => {
    if (multiple) {
      if (!selectedTags.includes(tag)) {
        const newSelectedTags = [...selectedTags, tag];
        // console.log(newSelectedTags);
        setSelectedTags(newSelectedTags);
        // console.log("Selected Tags:", newSelectedTags);

        setFilteredTags(
          techTags.filter(
            (tag) =>
              tag.toLowerCase().includes(inputValue.toLowerCase()) &&
              !newSelectedTags.includes(tag)
          )
        );
        if (onChange) {
          onChange(newSelectedTags);
        }
      }
      setInputValue("");
      setDropdownOpen(true);
    } else {
      setInputValue(tag);
      handleSingleSelect(name!, tag);
      setDropdownOpen(false);
    }
  };

  const handleSingleSelect = (name: string, tag: string): void => {
    if (onSingleChange) {
      onSingleChange(name, tag);
    }
  };

  const handleTagRemove = (tag: string): void => {
    const newSelectedTags = selectedTags.filter(
      (selectedTag) => selectedTag !== tag
    );
    setSelectedTags(newSelectedTags);
    setFilteredTags(
      techTags.filter(
        (tag) =>
          tag.toLowerCase().includes(inputValue.toLowerCase()) &&
          !newSelectedTags.includes(tag)
      )
    );
    if (onChange) {
      onChange(newSelectedTags);
    }
    if (onSingleChange) {
      onSingleChange(name!, "");
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLDivElement>
  ) => {
    // If the blur event does not involve the dropdown or input, close it
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
      setDropdownOpen(false);
    }
  };

  return (
    <>
      {label && (
        <label
          className={`text-gray-500 font-semibold relative flex gap-1.5 items-center ${labelCls}`}
          htmlFor="technical_skills"
        >
          {label}
          {description && (
            <>
              <button
                type="button"
                className="w-2 h-2 p-2.5 text-sm bg-gray-200 text-gray-400 rounded-full flex items-center justify-center outline-none hover:bg-gray-300 hover:text-gray-500 focus:bg-gray-300 focus:text-gray-500 peer"
              >
                ?
              </button>
              <div className="absolute z-10 left-0 transform top-full translate-y-8 mb-2 max-w-sm bg-blue-100 text-gray-600 text-xs font-medium px-2 py-1 rounded opacity-0 peer-hover:opacity-100 peer-hover:translate-y-0 peer-hover:z-10 transition-all duration-300 ease-in-out pointer-events-none">
                {description}
              </div>
            </>
          )}
          {req && <span className="text-red-500">*</span>}
        </label>
      )}
      <ClickOutsideDiv onOutsideClick={() => setDropdownOpen(false)}>
        <div
          className={`flex w-full gap-x-6 gap-y-2 ${usingIn !== "signup" ? (dropdownOpen ? "flex-col-reverse" : "flex-col") : "flex-row max-[500px]:flex-col-reverse"}`}
        >
          <div
            className="relative flex-1 h-fit w-full"
            ref={dropdownRef}
            onBlur={handleBlur}
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => setDropdownOpen(true)}
              placeholder={placeholder}
              className={cls}
            />
            {dropdownOpen && filteredTags.length > 0 && (
              <ul
                className="absolute w-full z-50 max-h-40 overflow-y-auto border border-gray-300 bg-white rounded-md custom-scrollbar snap-y snap-mandatory overscroll-contain text-gray-500"
                style={{ top: "calc(100% + 0.125rem)" }} // Do not remove this, this is kept intentionally to fix the dropdown position rather than passing it as an arbitrary value which is not considered by tailwind css
                onMouseDown={(e) => e.preventDefault()}
              >
                {filteredTags.map((tag, index) => (
                  <li
                    key={index}
                    onClick={() => handleTagClick(tag)}
                    className={`py-2 px-4 cursor-pointer hover:bg-blue-50 select-none rounded-md snap-start ${name === "currency_type" && "uppercase"}`}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            <span
              className={`text-red-500 text-[11px] font-semibold max-w-full text-wrap ${error ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} transition-all transform duration-300 absolute z-10 bg-red-50 rounded-b-md top-full left-0 px-2 py-0.5 whitespace-nowrap before:content-[''] before:absolute before:w-2 before:h-2 before:bg-red-50 before:left-0 before:bottom-full after:content-[''] after:absolute after:z-10 after:w-2 after:h-2 after:bg-gray-50 after:rounded-bl-md after:border-l after:border-b after:border-gray-300 after:left-0 after:bottom-full`}
            >
              {error}
            </span>
          </div>

          {multiple && tagsToShow.length > 0 && (
            <div className="flex flex-1 flex-wrap gap-1 max-w-md">
              {tagsToShow.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 text-gray-600 px-2.5 py-1 rounded-full text-sm h-fit"
                >
                  {tag}
                  <span
                    className="ml-2 cursor-pointer text-red-500"
                    onClick={() => handleTagRemove(tag)}
                  >
                    &times;
                  </span>
                </div>
              ))}
              {excessTagsCount > 0 && (
                <button
                  type="button"
                  onClick={() => setIsExpanded((curr) => !curr)}
                  className={`text-blue-500 text-sm font-semibold py-1 px-2 hover:bg-gray-200 rounded-full transition-colors duration-150 ${isExpanded && "px-3"}`}
                >
                  {isExpanded ? "Show less" : `+${excessTagsCount}`}
                </button>
              )}
            </div>
          )}
        </div>
      </ClickOutsideDiv>
    </>
  );
};

export default SearchSelectDropdown;
