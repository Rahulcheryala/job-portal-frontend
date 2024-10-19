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

const CompanySelect = ({ handle, val, reset }: Props) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(
    { value: val, label: val }
  );
  const [inputValue, setInputValue] = useState("");

  if (inputValue === "" && options.length) setOptions([]);

  // useEffect(() => {
  //   setInputValue(val);
  //   // selectedOption?.value !== val && setSelectedOption(null);
  // }, [val]);

  // useEffect(() => {
  //   if (reset) {
  //     setSelectedOption(null);
  //     setInputValue("");
  //   }
  // }, [reset]);

  useEffect(() => {
    if (reset) {
      setSelectedOption({ value: "", label: "" });
    }
  }, [reset]);

  // console.log(inputValue);

  const fetchOptions = async (input: string) => {
    if (!input) return;

    try {
      const response = await axios.get(
        "https://autocomplete.clearbit.com/v1/companies/suggest",
        {
          params: {
            query: input,
          },
        }
      );

      const newOptions = response.data.map((company: any) => ({
        value: company.name,
        label: company.name,
      }));

      setOptions(newOptions);
    } catch (error) {
      console.error("Error fetching company data:", error);
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
          placeholder="Search for your college"
          menuIsOpen={inputValue != ""}
          components={{ Menu: CustomMenu }}
          isClearable
        />
      </div>
    </ClickOutsideDiv>
  );
};

export default CompanySelect;
