// RegistrationForm.tsx
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import ErrorSpan from "./ErrorSpan";
import SelectInput from "./SelectInput";
import { api } from "~/utils/api";
export interface EmployerRegistrationFormData {
  companyId: string;
}

interface EmployerRegistrationFormProps {
  onSubmit: SubmitHandler<EmployerRegistrationFormData>;
}

export const CompanyRegistrationForm: React.FC<
  EmployerRegistrationFormProps
> = ({ onSubmit }) => {
  const companiesQuery = api.company.getAll.useQuery();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EmployerRegistrationFormData>({});
  if (companiesQuery.isError) {
    return <ErrorSpan message={companiesQuery.error.message} />;
  }
  if (companiesQuery.isLoading) {
    return <div>Loading</div>;
  }
  const companies = companiesQuery.data;
  const options = companies.map((company) => ({
    name: company.name,
    value: company.id,
    id: company.id,
  }));
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-screen-lg rounded-md bg-white px-6 py-4 shadow-md">
        <h1 className="mb-8 justify-center text-3xl font-bold text-red-800">
          You need to submit this form to complete the registration process!
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-center">
            <div className="mb-4 grid grid-cols-2 gap-4">
              <SelectInput
                options={options}
                label="Select your company"
                {...register("companyId", { required: true })}
              />
              {errors.companyId && <ErrorSpan {...errors.companyId} />}
            </div>
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

export default CompanyRegistrationForm;
