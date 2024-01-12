import React, { type HTMLInputTypeAttribute, forwardRef } from "react";
interface InputProps {
  label?: string;
  name: string;
  value?: string;
  defaultValue?: string;
  autoComplete?: string;
  placeholder?: string;
  min?: number | string;
  max?: number | string;
  type: HTMLInputTypeAttribute;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
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
          id={props.name}
          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          {...props}
          ref={ref}
        />
      </div>
    );
  },
);

Input.displayName = "TextareaInput";
export default Input;
