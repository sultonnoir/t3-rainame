import React, { useState } from "react";
import { DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PriceInputProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  placeholder?: string;
}

export function PriceInput({
  value,
  onChange,
  label = "Price",
  placeholder = "0.00",
}: PriceInputProps) {
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Only allow numbers and decimals
    if (/^\d*\.?\d{0,2}$/.test(newValue) || newValue === "") {
      setInputValue(newValue);
      const numericValue = parseFloat(newValue);
      if (!isNaN(numericValue)) {
        onChange(numericValue);
      } else if (newValue === "") {
        onChange(0);
      }
    }
  };

  const formatValue = (val: number) => {
    return val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="w-full">
      <label className="sr-only" htmlFor={label}>
        {label}
      </label>
      <div className="focus-within:ring-primary relative flex w-full items-center rounded-lg border outline-none focus-within:ring-2 focus-within:outline-none">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <Input
          id={label}
          type="text"
          value={focused ? inputValue : formatValue(value)}
          onChange={handleChange}
          onFocus={() => {
            setFocused(true);
            setInputValue(value === 0 ? "" : value.toString());
          }}
          onBlur={() => {
            setFocused(false);
            if (inputValue === "") {
              onChange(0);
            }
          }}
          placeholder={placeholder}
          className="rounded-none border-none pl-10 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
}
