import React, { forwardRef } from "react";

export interface InputProps {
  label: string;
  name: string;
  defaultValue?: string;
  options: { name: string; value: string; id?: string }[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
}

const SelectInput = forwardRef<HTMLSelectElement, InputProps>(
  (
    { label, name, onChange, onBlur, options, defaultValue }: InputProps,
    ref,
  ) => {
    return (
      <div className="flex w-full flex-col">
        <label htmlFor={name} className="mb-1 font-bold text-gray-700">
          {label}
        </label>
        <select
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={defaultValue}
          ref={ref}
          className="rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
        >
          {options.map((option) => {
            return (
              <option
                key={option.id ?? option.name}
                // selected={defaultValue ? defaultValue === option.value : false}
                value={option.value}
              >
                {option.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  },
);

SelectInput.displayName = "SelectInput";

export default SelectInput;
