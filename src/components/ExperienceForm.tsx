import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Input from "./Input";
import TextareaInput from "./TextareaInput";
import ErrorSpan from "./ErrorSpan";
import { api } from "~/utils/api";

interface ExperienceFormData {
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  description: string;
}

const ExperienceForm: React.FC<{
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setAdd }) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    mode: "onChange",
  });
  const apicontext = api.useUtils();

  const createExperience = api.experience.create.useMutation({
    async onSuccess() {
      await apicontext.experience.getAll.invalidate();
      setAdd(false);
    },
  });
  const onSubmit: SubmitHandler<ExperienceFormData> = (data) => {
    createExperience.mutate(data);
  };
  const start = watch("startDate");
  const end = watch("endDate");
  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white px-8 py-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-secondary">
          Add Experience
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-4">
            <Input
              label="Company"
              type="text"
              {...register("company", { required: "Company is required" })}
            />
            {errors.company && <ErrorSpan message={errors.company.message} />}
            <Input
              label="Position"
              type="text"
              {...register("position", { required: "Position is required" })}
            />
            {errors.position && <ErrorSpan message={errors.position.message} />}

            <Input
              label="Start Date"
              type="date"
              {...register("startDate", {
                required: "Start date is required",
                valueAsDate: true,
                validate: (_) => {
                  const now = new Date();
                  if (start >= now) return "Start date cannot be in the future";
                  if (end && start >= end)
                    return "Start date cannot be after end date";
                },
              })}
            />
            {errors.startDate && (
              <ErrorSpan message={errors.startDate.message} />
            )}

            <Input
              label="End Date"
              type="date"
              {...register("endDate", {
                valueAsDate: true,
                validate: (_) => {
                  if (!end) return;
                  const now = new Date();
                  if (end >= now) return "End date cannot be in the future";
                  if (start >= end)
                    return "Start date cannot be after end date";
                },
              })}
            />
            {errors.endDate && <ErrorSpan message={errors.endDate.message} />}

            <TextareaInput
              label="Description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <ErrorSpan message={errors.description.message} />
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
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

export default ExperienceForm;
