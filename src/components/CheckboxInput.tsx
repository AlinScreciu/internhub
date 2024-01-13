import React, { forwardRef } from "react";
interface InputProps {
  label?: string;
  name: string;
  value?: string;
  defaultChecked?: boolean;
  min?: number | string;
  max?: number | string;
  onChange: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const CheckboxInput = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    return (
      <div>
        {props.label && (
          <label
            htmlFor={props.name}
            className="mb-2 block font-bold text-gray-700"
          >
            {props.label}
          </label>
        )}
        <input
          type="checkbox"
          className="block h-4 w-4 rounded-md border border-gray-300 text-xl text-inherit placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
          {...props}
          ref={ref}
        />
      </div>
    );
  },
);

CheckboxInput.displayName = "CheckboxInput";
export default CheckboxInput;
