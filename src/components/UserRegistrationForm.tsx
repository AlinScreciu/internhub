"use client;";
// RegistrationForm.tsx
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import TextareaInput from "./TextareaInput";
import Input from "./Input";
import { UploadButton } from "~/utils/uploadthing";
export interface UserRegistrationFormData {
  university: string;
  faculty: string;
  description: string;
  dob: Date;
  cv?: string;
}

interface UserRegistrationFormProps {
  onSubmit: SubmitHandler<UserRegistrationFormData>;
}

export const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({
  onSubmit,
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UserRegistrationFormData>({});

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-screen-lg rounded-md bg-white px-6 py-4 shadow-md">
        <h1 className="mb-8 justify-center text-3xl font-bold text-red-800">
          You need to submit this form to complete the registration process!
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="university"
                className="mb-2 block font-bold text-gray-700"
              >
                University
              </label>
              <input
                type="text"
                id="university"
                autoComplete="university"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter university"
                {...register("university")}
              />
            </div>

            <div>
              <label
                htmlFor="faculty"
                className="mb-2 block font-bold text-gray-700"
              >
                Faculty
              </label>
              <input
                type="text"
                id="faculty"
                autoComplete="faculty"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter faculty"
                {...register("faculty")}
              />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <TextareaInput
              label="Description"
              {...register("description", { required: true })}
            />
            {errors.description && <span>{errors.description.message}</span>}
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <Input
              label="Date of Birth"
              type="date"
              {...register("dob", { required: true, valueAsDate: true })}
            />
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4">
            <UploadButton
              endpoint="cv"
              onClientUploadComplete={(res) => {
                console.log("🚀 ~ onClientUploadComplete ~ res:", res);
                const file = res.at(0);
                if (!file) return;

                setValue("cv", file.url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="focus:shadow-outline rounded bg-gray-800 px-4 py-2 font-bold text-white hover:bg-gray-700 focus:outline-none"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
