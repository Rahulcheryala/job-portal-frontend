import React, { useState, useEffect } from "react";
import Tag from "@/Components/Tag";
import ClickOutsideDiv from "../Components/ClickoutsideDiv";

interface Option {
  label: string;
}

interface Props {
  closeable?: boolean;
  linktg?: boolean;
  color?: string;
  dynamic?: boolean;
  size?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  settgs?: Function;
  cls?: string;
  options: Option[];
  req?: boolean;
  placeholder?: string;
  onSelect: (selectedTags: string[]) => void;
}

let mySet: Set<string> = new Set();

export const Tags2: React.FC<Props> = ({
  closeable = false,
  linktg = false,
  color = "white",
  dynamic = false,
  size = "sm",
  cls = "select",
  settgs = () => {},
  value,
  onChange,
  placeholder = "Type a tag or keyword to search and add it",
  options,
  req = false,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sel, setSel] = useState(0);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    settgs(tags);
    onSelect(tags); // Notify parent component of the selected tags
  }, [tags]);

  const filt = (option: Option) => {
    return (
      (option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.label === "REGION" ||
        option.label === "COUNTRIES") &&
      !mySet.has(option.label)
    );
  };

  const filteredOptions = options.filter((option) => filt(option));

  const handleOutsideClick = () => {
    setSel(0);
    setSearchTerm("");
  };

  const removeTag = (tag: string) => {
    mySet.delete(tag);
    const nextTags = tags.filter((item) => item !== tag);
    setTags(nextTags);
  };

  const unicodeRemoval = (tag: string) => {
    return tag.replace(/[^\p{L}\p{M}\s]/gu, "");
  };

  const addTag = (tag: string) => {
    mySet.add(tag);
    setTags((prevTags) => [...prevTags, tag]);
    setSearchTerm("");
  };

  const renderInput = () => {
    return (
      <input
        type="text"
        className={`search-input ${cls} w-full border-none p-2 rounded-full border border-gray-300 placeholder-white`}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setSel(1);
        }}
        onClick={(e) => setSel(1)}
      />
    );
  };

  const renderOption = (option: Option) => {
    if (option.label === "REGION" || option.label === "COUNTRIES") {
      return (
        <div key={option.label}>
          <br />
          <p>
            <b>{option.label}</b>
          </p>
          <br />
        </div>
      );
    }
    return (
      <li key={option.label}>
        <button
          className="block px-4 py-2 text-left w-full"
          onClick={() => {
            addTag(option.label);
            setSel(0);
          }}
        >
          {option.label}
        </button>
      </li>
    );
  };

  const renderSelectedTags = () => {
    return (
      <div className="flex flex-wrap mt-2">
        {tags.map((item, index) => (
          <Tag
            tag={{ label: item }}
            key={index}
            onRemove={() => removeTag(item)}
          >
            {item}
          </Tag>
        ))}
      </div>
    );
  };

  return (
    <ClickOutsideDiv onOutsideClick={handleOutsideClick}>
      <div
        className={`searchable-select ${cls} border border-gray-300 rounded-full max-w-md overflow-hidden`}
      >
        <div className="flex items-center">{renderInput()}</div>
        {sel === 1 && (
          <div className="absolute bg-white border text-black border-gray-300 rounded-lg mt-2 shadow-lg z-50 w-full max-w-md h-[200px] overflow-y-scroll scrollbar-hide">
            <ul className="menu p-2 max-w-full">
              {filteredOptions.map((option) => renderOption(option))}
            </ul>
          </div>
        )}
      </div>
      <div className="mt-2 text-white max-w-md">{renderSelectedTags()}</div>
    </ClickOutsideDiv>
  );
};
