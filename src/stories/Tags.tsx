// import React, { useEffect } from "react";
// import Tag from "@/Components/Tag";
// import ClickOutsideDiv from "@/Components/ClickoutsideDiv";
// import "@/Components/Clickoutsidediv.css";

// import { useState } from "react";

// interface Option {
//   label: string;
// }

// interface Props {
//   closeable?: boolean;
//   linktg?: boolean;
//   color?: string;
//   dynamic?: boolean;
//   size?: string;
//   phdr: string;
//   border?: string;
//   onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
//   settgs?: Function;
//   cls?: string;
//   keyy?: string;
//   options: Option[];
//   req?: boolean;
//   srchwdth?: string;
//   scrollht?: string;
//   optionMrgn: string;
//   optionWdth: string;
// }

// /*

// */
// let mySet: Set<string> = new Set();

// export const Tags = ({
//   closeable = false,
//   linktg = false,
//   color = "white",
//   dynamic = false,
//   size = "sm",
//   cls = "select",
//   settgs = () => {},
//   phdr = "Type a tag or keyword to search and add it",
//   keyy,
//   srchwdth = "350px",
//   scrollht = "200px",
//   border = "",
//   options,
//   optionMrgn = "1%",
//   optionWdth = "95%",
//   req = false,
// }: Props) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sel, setsel] = useState(0);

//   const filt = (option: Option) => {
//     return (
//       (option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         option.label == "REGION" ||
//         option.label == "COUNTRIES") &&
//       !mySet.has(option.label)
//     );
//   };

//   const filteredOptions = options.filter((option) => filt(option));

//   const [tags, setTags] = React.useState<string[]>([]);
//   const [typing, setTyping] = React.useState(false);
//   const [inputValue, setInputValue] = React.useState("$$");

//   useEffect(() => {
//     settgs(keyy, tags.join(","));
//   }, [tags, keyy, settgs]);

//   const handleOutsideClick = () => {
//     setsel(0);
//     setSearchTerm("");
//   };

//   const removeTag = (tag: string) => {
//     mySet.delete(tag);
//     const nextTags = tags.filter((item) => item !== tag);
//     setTags(nextTags);
//   };

//   const addTag = () => {
//     const nextTags = searchTerm ? [...tags, searchTerm] : tags;
//     setTags(nextTags);
//     setTyping(false);
//     setInputValue("$$");
//     setSearchTerm("");
//   };

//   const handleButtonClick = () => {
//     setTyping(true);
//   };

//   if (inputValue == "done") addTag();

//   const renderInput = () => {
//     return (
//       <div style={{ display: "inline" }}>
//         <input
//           type="text"
//           className={`search-input ${cls}`}
//           style={{ width: srchwdth, height: "2%", borderStyle: "none" }}
//           placeholder={phdr}
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setsel(1);
//           }}
//           onClick={(e) => setsel(1)}
//         />
//       </div>
//     );
//   };
//   const fun = (option: Option) => {
//     if (option.label == "REGION" || option.label == "COUNTRIES")
//       return (
//         <div key={option.label}>
//           <br />
//           <p>
//             <b>{option.label}</b>
//           </p>
//           <br />
//         </div>
//       );
//     if (option.label != "")
//       return (
//         <li key={option.label}>
//           <button
//             onClick={() => {
//               setInputValue("done");
//               setSearchTerm(option.label);
//               setsel(0);
//               mySet.add(option.label);
//             }}
//           >
//             {option.label}
//           </button>
//         </li>
//       );
//   };

//   const printtag = (item: string, index: number) => {
//     return (
//       <Tag tag={{ label: item }} key={item} onRemove={() => removeTag(item)}>
//         {item}
//       </Tag>
//     );
//   };

//   return (
//     <ClickOutsideDiv onOutsideClick={handleOutsideClick}>
//       <div
//         className={`searchable-select ${cls}`}
//         style={{ justifyItems: "center" }}
//       >
//         {tags.map((item, index) => printtag(item, index))}
//         {renderInput()}
//       </div>
//       {sel == 1 && (
//         <div
//           role="listbox"
//           className="h-[200px] overflow-y-scroll border-2 border-[#ccc] rounded-2xl scrollbar-hide"
//           style={{
//             backgroundColor: `white`,
//             marginLeft: optionMrgn,
//             zIndex: "20000px",
//             width: optionWdth,
//             color: "black",
//             maxHeight: scrollht,
//           }}
//         >
//           <ul
//             tabIndex={0}
//             className={`dropdown-content z-[1] text-white menu p-2 shadow bg-[#101011] rounded-box`}
//           >
//             {filteredOptions.map((option) => fun(option))}
//           </ul>
//         </div>
//       )}
//     </ClickOutsideDiv>
//   );
// };


import React, { useEffect, useState } from "react";
import Tag from "@/Components/Tag";
import ClickOutsideDiv from "@/Components/ClickoutsideDiv";

interface Option {
  label: string;
}

interface Props {
  closeable?: boolean;
  color?: string;
  dynamic?: boolean;
  size?: string;
  phdr: string;
  settgs?: (key: string, value: string) => void;
  cls?: string;
  keyy?: string;
  options: Option[];
  req?: boolean;
  srchwdth?: string;
  scrollht?: string;
  optionMrgn?: string;
  optionWdth?: string;
}

const mySet = new Set<string>();

const Tags = ({
  closeable = false,
  color = "white",
  dynamic = false,
  size = "sm",
  cls = "select",
  settgs = () => {},
  phdr = "Type a tag or keyword to search and add it",
  keyy,
  srchwdth = "350px",
  scrollht = "200px",
  optionMrgn = "1%",
  optionWdth = "95%",
  options,
  req = false,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sel, setSel] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("$$");

  useEffect(() => {
    settgs(keyy || "", tags.join(","));
  }, [tags, keyy, settgs]);

  const handleOutsideClick = () => {
    setSel(0);
    setSearchTerm("");
  };

  const removeTag = (tag: string) => {
    mySet.delete(tag);
    setTags(tags.filter((item) => item !== tag));
  };

  const addTag = () => {
    if (searchTerm) {
      mySet.add(searchTerm);
      setTags([...tags, searchTerm]);
      setSearchTerm("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSel(1);
  };

  const handleOptionClick = (label: string) => {
    setSearchTerm(label);
    setSel(0);
    addTag();
  };

  return (
    <ClickOutsideDiv onOutsideClick={handleOutsideClick}>
      <div className={`searchable-select ${cls}`}>
        {tags.map((item, index) => (
          <Tag tag={{ label: item }} key={item} onRemove={() => removeTag(item)} />
        ))}
        <input
          type="text"
          className={`search-input ${cls}`}
          style={{ width: srchwdth, border: "none" }}
          placeholder={phdr}
          value={searchTerm}
          onChange={handleInputChange}
          onClick={() => setSel(1)}
        />
      </div>
      {sel === 1 && (
        <div
          className="h-[200px] overflow-y-scroll border-2 border-[#ccc] rounded-2xl scrollbar-hide"
          style={{ backgroundColor: "white", marginLeft: optionMrgn, zIndex: 20000, width: optionWdth, color: "black", maxHeight: scrollht }}
        >
          <ul className="dropdown-content z-[1] text-white menu p-2 shadow bg-[#101011] rounded-box">
            {options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()) && !mySet.has(option.label)).map((option) => (
              <li key={option.label}>
                <button onClick={() => handleOptionClick(option.label)}>
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </ClickOutsideDiv>
  );
};

export default Tags;
