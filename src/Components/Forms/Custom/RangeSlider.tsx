"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import SearchSelectDropdown from "./SearchSelectDropdown";

type RangeSliderProps = {
  label?: string;
  name?: string;
  labelCls?: string;
  minSalary: string;
  maxSalary: string;
  currencyType?: string;
  handleChange: (name: string, value: string) => void;
};

const RangeSlider = ({
  label,
  name,
  labelCls,
  minSalary,
  maxSalary,
  currencyType = "USD",
  handleChange,
}: RangeSliderProps) => {
  // Fixed bounds for the slider
  const [sliderBounds, setSliderBounds] = useState({
    min: 0,
    max: 100000,
    step: 500,
  });

  // Current values of the slider in displayed currency
  const [values, setValues] = useState([
    minSalary ? Number(minSalary) : sliderBounds.min,
    maxSalary ? Number(maxSalary) : sliderBounds.max,
  ]);

  const [currencyList, setCurrencyList] = useState<string[]>([]);
  const [currencyRates, setCurrencyRates] = useState<{ [key: string]: number }>(
    {
      USD: 1,
    }
  );

  const determineStepValue = (currencyType: string) => {
    switch (currencyType) {
      case "INR":
        return 100000; // 1 LPA
      case "USD":
        return 500;
      case "EUR":
        return 400;
      case "JPY":
        return 5000;
      case "GBP":
        return 300;
      default:
        return 500;
    }
  };

  // Convert displayed currency value to USD
  const convertToUSD = (amount: number, fromCurrency: string) => {
    if (fromCurrency === "USD") return amount;
    const rate = currencyRates[fromCurrency.toLowerCase()];
    return Math.round(amount / rate);
  };

  // Convert USD to display currency
  const convertFromUSD = (amount: number, toCurrency: string) => {
    if (toCurrency === "USD") return amount;
    const rate = currencyRates[toCurrency.toLowerCase()];
    return Math.round(amount * rate);
  };

  // Initialize or update bounds based on currency
  useEffect(() => {
    if (currencyType) {
      const newStep = determineStepValue(currencyType);
      const newBounds = {
        min: currencyType === "INR" ? 0 : 0,
        max: currencyType === "INR" ? 10000000 : 100000, // 1 Cr for INR, 1M for others
        step: newStep,
      };
      setSliderBounds(newBounds);

      // Convert USD values from props to display currency
      const displayMin = minSalary
        ? convertFromUSD(Number(minSalary), currencyType)
        : newBounds.min;
      const displayMax = maxSalary
        ? convertFromUSD(Number(maxSalary), currencyType)
        : newBounds.max;

      setValues([displayMin, displayMax]);
    }
  }, [currencyType, minSalary, maxSalary, currencyRates]);

  useEffect(() => {
    const getVals = async () => {
      const apiUrl =
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";

      try {
        const response = await axios.get(apiUrl);
        const List = Object.keys(response.data.usd);
        setCurrencyList(List);
        setCurrencyRates(response.data.usd);
      } catch (error) {
        console.error("Failed to fetch currency rates:", error);
      }
    };

    if (currencyList.length === 0) getVals();
  }, []);

  const handleValueChange = (newValues: number[]) => {
    if (newValues[0] >= newValues[1]) return;
    setValues(newValues);
  };

  const handleCurrencyChange = (name: string, newCurrencyType: string) => {
    // First convert current values to USD
    const usdMin = convertToUSD(values[0], currencyType);
    const usdMax = convertToUSD(values[1], currencyType);

    // Then convert USD values to new currency for display
    const newMin = convertFromUSD(usdMin, newCurrencyType);
    const newMax = convertFromUSD(usdMax, newCurrencyType);

    const newStep = determineStepValue(newCurrencyType);
    const roundedMin = Math.round(newMin / newStep) * newStep;
    const roundedMax = Math.round(newMax / newStep) * newStep;

    setValues([roundedMin, roundedMax]);

    // Store USD values in search params
    handleChange("annual_salary_min", usdMin.toString());
    handleChange("annual_salary_max", usdMax.toString());
    handleChange(name, newCurrencyType.toLocaleUpperCase());
  };

  const formatValue = (value: number) => {
    if (currencyType === "INR") {
      return `${Math.round(value / 100000)} LPA`;
    }
    return `${Math.round(value / 1000)}K`;
  };

  return (
    <div className="flex flex-col justify-center w-full py-4 px-1">
      <div className="flex justify-between items-start">
        <label htmlFor={name} className={labelCls + " text-left"}>
          {label}
        </label>

        {currencyList.length > 0 && (
          <SearchSelectDropdown
            name="currency_type"
            tags={currencyList}
            cls="w-24 px-2 py-0.5 bg-gray-50 text-gray-700 rounded-lg border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic"
            onSingleChange={handleCurrencyChange}
            selected={currencyType}
            placeholder="Currency"
            multiple={false}
          />
        )}
      </div>

      <Slider.Root
        className="relative flex items-center w-full h-6 my-2"
        value={values}
        min={sliderBounds.min}
        max={sliderBounds.max}
        step={sliderBounds.step}
        onValueChange={handleValueChange}
        onValueCommit={(committedValues) => {
          // Convert to USD before storing in search params
          const usdMin = convertToUSD(committedValues[0], currencyType);
          const usdMax = convertToUSD(committedValues[1], currencyType);

          handleChange("annual_salary_min", usdMin.toString());
          handleChange("annual_salary_max", usdMax.toString());
        }}
      >
        <Slider.Track className="bg-gray-300 relative flex-grow h-1 rounded-full">
          <Slider.Range className="absolute bg-blue-500 h-full rounded-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-blue-500 border rounded-full outline-none relative focus-visible:ring-2 ring-gray-700"
          aria-label="Minimum Value"
        >
          <div className="absolute font-semibold -bottom-6 right-full translate-x-full text-xs text-gray-500 whitespace-nowrap">
            {formatValue(values[0])}
          </div>
        </Slider.Thumb>
        <Slider.Thumb
          className="block w-5 h-5 bg-blue-500 border rounded-full outline-none relative focus-visible:ring-2 ring-gray-700"
          aria-label="Maximum Value"
        >
          <div className="absolute font-semibold -bottom-6 left-full -translate-x-[70%] text-xs text-gray-500 whitespace-nowrap">
            {formatValue(values[1])}
          </div>
        </Slider.Thumb>
      </Slider.Root>
    </div>
  );
};

export default RangeSlider;
