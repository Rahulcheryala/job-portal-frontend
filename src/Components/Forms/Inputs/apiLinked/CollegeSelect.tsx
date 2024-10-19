import React, { useEffect, useState } from "react";
import Select, {
  SingleValue,
  ActionMeta,
  InputActionMeta,
  components,
} from "react-select";
import axios from "axios";
import ClickOutsideDiv from "@/Components/ClickoutsideDiv";
import "./Styling.css";

interface OptionType {
  value: string;
  label: string;
}

interface Props {
  handle: Function;
  val: string;
  reset?: boolean;
}

const CollegeSelect: React.FC<Props> = ({ handle, val, reset }) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(
    { value: val, label: val }
  );
  const [inputValue, setInputValue] = useState("");

  if (inputValue === "" && options.length) setOptions([]);

  useEffect(() => {
    if (reset) {
      setSelectedOption({ value: "", label: "" });
    }
  }, [reset]);

  const fetchOptions = async (input: string) => {
    if (!input) return;

    try {
      const response = await axios.get(
        `http://universities.hipolabs.com/search`,
        {
          params: {
            name: input,
          },
        }
      );

      const newOptions = response.data.map((university: any) => ({
        value: university.name,
        label: university.name,
      }));

      setOptions(newOptions);
    } catch (error) {
      console.error("Error fetching education data:", error);
    }
  };

  const handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
    if (actionMeta.action === "input-change") {
      setInputValue(newValue);
      fetchOptions(newValue);
    }
  };

  const handleChange = (
    selected: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    if (actionMeta.action === "select-option") {
      setSelectedOption(selected);
      handle(selected?.value || "");
      setOptions([]);
      setInputValue("");
    } else if (actionMeta.action === "clear") {
      setSelectedOption(null);
      handle("");
      setInputValue("");
    }
  };

  const handleCreate = () => {
    const newOption = { value: inputValue, label: inputValue };
    setSelectedOption(newOption);
    handle(inputValue);
    setOptions([]);
    setInputValue("");
  };

  const CustomMenu = (props: any) => {
    return (
      <components.Menu {...props}>
        {props.children}
        {inputValue && (
          <div
            className="p-2 cursor-pointer border border-white rounded text-center bg-gray-100 text-black"
            onMouseDown={(e) => {
              e.preventDefault();
              handleCreate();
            }}
          >
            Create &quot;{inputValue}&quot;
          </div>
        )}
      </components.Menu>
    );
  };

  return (
    <ClickOutsideDiv
      onOutsideClick={() => {
        if (inputValue != "") {
          setOptions([]);
          setInputValue("");
        }
      }}
    >
      <div className="custom-select-container bg-gray-100">
        <Select
          options={options}
          value={selectedOption}
          instanceId={1}
          classNamePrefix="react-select"
          onInputChange={handleInputChange}
          onChange={handleChange}
          placeholder="Search for a company"
          isClearable
          menuIsOpen={inputValue != ""}
          components={{ Menu: CustomMenu }}
        />
      </div>
    </ClickOutsideDiv>
  );
};

export default CollegeSelect;
