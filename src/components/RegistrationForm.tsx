// RegistrationForm.tsx
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

export type UserRole = "student" | "admin" | "company";

export interface RegistrationFormData {
  university?: string;
  faculty?: string;
  description: string;
  dob?: Date;
  role: UserRole;
  country?: string;
  domain?: string;
}

interface RegistrationFormProps {
  onSubmit: SubmitHandler<RegistrationFormData>;
  role: UserRole;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  role,
}) => {
  const { handleSubmit, register } = useForm<RegistrationFormData>({});
  const isStudent = role === "student";
  const isCompany = role === "company";
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-screen-lg rounded-md bg-white px-6 py-4 shadow-md">
        <h1 className="mb-8 justify-center text-3xl font-bold text-red-800">
          You need to submit this form to complete the registration process!
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isStudent && (
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
          )}

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="description"
                className="mb-2 block font-bold text-gray-700"
              >
                Description
              </label>
              <textarea
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                id="description"
                placeholder="Enter description"
                required
                {...register("description")}
              />
            </div>
          </div>
          {isStudent && (
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="dob"
                  className="mb-2 block font-bold text-gray-700"
                >
                  Date of birth
                </label>
                <input
                  id="dob"
                  type="date"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  {...register("dob")}
                />
              </div>
            </div>
          )}
          {isCompany && (
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="country"
                  className="mb-2 block font-bold text-gray-700"
                >
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  {...register("country")}
                />
              </div>
            </div>
          )}
          {isCompany && (
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="domain"
                  className="mb-2 block font-bold text-gray-700"
                >
                  Country
                </label>
                <input
                  id="domain"
                  type="text"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  {...register("domain")}
                />
              </div>
            </div>
          )}
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

export default RegistrationForm;
