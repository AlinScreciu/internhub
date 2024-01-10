import React, { forwardRef } from "react";
interface InputProps {
  label: string;
  name: string;
  value?: string;
  defaultValue?: string;
  autoComplete?: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
}

const TextareaInput = forwardRef<HTMLTextAreaElement, InputProps>(
  (props: InputProps, ref) => {
    return (
      <div>
        <label
          htmlFor="description"
          className="mb-2 block font-bold text-gray-700"
        >
          {props.label}
        </label>
        <textarea
          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          {...props}
          ref={ref}
        />
      </div>
    );
  },
);

TextareaInput.displayName = "TextareaInput";
export default TextareaInput;
