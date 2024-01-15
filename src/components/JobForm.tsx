import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import TextareaInput from "./TextareaInput";
import SelectInput from "./SelectInput";
import ErrorSpan from "./ErrorSpan";
import { api } from "~/utils/api";
import CheckboxInput from "./CheckboxInput";
export interface UserRegistrationFormData {
  position: string;
  location: string; // city
  workingPlace: string; // on-site, hybrid, remote
  fullTime: boolean; // if false => part time
  description: string;
  paid: boolean;
  openPositions: number;
  deadline: Date;
  payRangeEnd?: number | null;
  payRangeStart?: number | null;
  hireRate?: number | null;
}

const JobForm: React.FC = () => {
  const { internship } = api.useUtils();
  const postJobMutation = api.internship.post.useMutation({
    onSettled: async () => {
      await internship.getAllFromCompany.invalidate();
    },
  });
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserRegistrationFormData>({
    mode: "onChange",
    defaultValues: {
      paid: false,
      fullTime: true,
      payRangeEnd: null,
      payRangeStart: null,
      hireRate: null,
    },
  });

  const required = {
    value: true,
    message: "Required",
  };
  const paid = watch("paid");
  const payStart = watch("payRangeStart");
  const payEnd = watch("payRangeEnd");
  const onSubmit: SubmitHandler<UserRegistrationFormData> = (data) => {
    postJobMutation.mutate(data);
  };
  return (
    <div className="mt-5h-[calc(60vh)] flex  w-[75%] items-center justify-center">
      <div className="w-full max-w-screen-lg overflow-auto  rounded-lg border bg-white p-6 px-12 shadow-lg">
        <h1 className="mb-8 justify-center text-4xl font-bold text-primary">
          Add a job{" "}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Input
                label="Position"
                type="text"
                {...register("position", { required })}
              />
              {errors.position && (
                <ErrorSpan message={errors.position.message} />
              )}
            </div>
            <div>
              <CheckboxInput
                label="Full Time"
                {...register("fullTime", { required })}
                onChange={(e) => {
                  setValue("fullTime", e.currentTarget.checked);
                }}
              />
              {errors.fullTime && (
                <ErrorSpan message={errors.fullTime.message} />
              )}
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Input
                type="text"
                label="Location"
                {...register("location", { required })}
              />
              {errors.location && (
                <ErrorSpan message={errors.location.message} />
              )}
            </div>

            <div>
              <SelectInput
                label="On-site / Hybrid / Remote"
                options={[
                  {
                    name: "on-site",
                    value: "on-site",
                  },
                  {
                    name: "hybrid",
                    value: "hybrid",
                  },
                  {
                    name: "remote",
                    value: "remote",
                  },
                ]}
                {...register("workingPlace", { required })}
              />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4">
            <TextareaInput
              label="Description"
              {...register("description", { required })}
            />
            {errors.description && (
              <ErrorSpan message={errors.description.message} />
            )}
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Input
                label="Deadline"
                type="date"
                {...register("deadline", {
                  required,
                  valueAsDate: true,
                  validate: (date) => {
                    if (!date) return "Invalid";
                    const todaysDate = new Date();
                    return (
                      date >= todaysDate || "Deadline has to be in the future"
                    );
                  },
                })}
              />
              {errors.deadline && (
                <ErrorSpan message={errors.deadline.message} />
              )}
            </div>
            <div className="w-4">
              <CheckboxInput
                label="Paid"
                {...register("paid")}
                onChange={(e) => setValue("paid", e.currentTarget.checked)}
              />
              {errors.paid && <ErrorSpan message={errors.paid.message} />}
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Input
                label="Open positions"
                type="number"
                {...register("openPositions", {
                  required,
                  min: { value: 1, message: "Cannot be less than 0" },
                  valueAsNumber: true,
                })}
              />
              {errors.openPositions && (
                <ErrorSpan message={errors.openPositions.message} />
              )}
            </div>
            <div>
              <Input
                label="Hire rate after internship"
                type="number"
                {...register("hireRate", {
                  valueAsNumber: true,
                  min: { value: 1, message: "Cannot be less than 0" },
                  max: { value: 100, message: "Cannot be more than 100" },
                })}
              />
              {errors.hireRate && (
                <ErrorSpan message={errors.hireRate.message} />
              )}
            </div>
            {payStart && payEnd && payStart > payEnd && (
              <ErrorSpan message="Pay start cannot be more than pay end" />
            )}
          </div>
          {paid && (
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <Input
                  label="Pay range start"
                  type="number"
                  min="1"
                  {...register("payRangeStart", {
                    required,
                    valueAsNumber: true,
                    min: { value: 1, message: "Cannot be less than 0 if paid" },
                  })}
                />
                {errors.payRangeStart && (
                  <ErrorSpan message={errors.payRangeStart.message} />
                )}
              </div>
              <div>
                <Input
                  label="Pay range end"
                  type="number"
                  min="1"
                  {...register("payRangeEnd", {
                    required,
                    valueAsNumber: true,

                    min: { value: 1, message: "Cannot be less than 0 if paid" },
                  })}
                />
                {errors.payRangeEnd && (
                  <ErrorSpan message={errors.payRangeEnd.message} />
                )}
              </div>
              <span>(in euro)</span>
              {payStart && payEnd && payStart > payEnd && (
                <ErrorSpan message="Pay start cannot be more than pay end" />
              )}
            </div>
          )}

          <div className="flex items-center justify-center">
            <button
              className="focus:shadow-outline rounded bg-primary px-4 py-2 font-bold text-white hover:bg-gray-700 focus:outline-none"
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

export default JobForm;
