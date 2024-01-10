import React from "react";
import { type SubmitHandler, useForm, useWatch } from "react-hook-form";
import Input from "./Input";
import TextareaInput from "./TextareaInput";
import SelectInput from "./SelectInput";
import ErrorSpan from "./ErrorSpan";
export interface UserRegistrationFormData {
  location: string; // city
  workingPlace: string; // on-site, hybrid, remote
  fullTime: boolean; // if false => part time
  description: string;
  paid: boolean;
  payRangeStart?: number;
  payRangeEnd?: number;
  openPositions: number;
  deadline: Date;
  hireRate?: number;
}

const JobForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    watch,

    formState: { errors },
  } = useForm<UserRegistrationFormData>({
    mode: "onChange",
    defaultValues: {
      payRangeEnd: 1,
      payRangeStart: 1,
    },
  });
  const onSubmit: SubmitHandler<UserRegistrationFormData> = (data) => {
    console.log(data);
  };
  const required = {
    value: true,
    message: "Required",
  };
  const paid = watch("paid");
  const payStart = watch("payRangeStart");
  const payEnd = watch("payRangeEnd");

  return (
    <div className="flex min-h-screen w-max items-center justify-center bg-gray-100">
      <div className="w-full max-w-screen-lg rounded-md bg-white px-6 py-4 shadow-md">
        <h1 className="mb-8 justify-center text-3xl font-bold text-red-800">
          Add a job{" "}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Input
                type="text"
                label="Location"
                {...register("location", { required })}
              />
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
            {errors.description && <ErrorSpan {...errors.description} />}
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Input
                label="Deadline"
                type="date"
                {...register("deadline", { required, valueAsDate: true })}
              />
              {errors.deadline && <ErrorSpan {...errors.deadline} />}
            </div>
            <div className="w-4">
              <Input
                label="Paid"
                type="checkbox"
                {...register("paid", { required })}
              />
            </div>
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
                    min: { value: 1, message: "Cannot be less than 0 if paid" },
                  })}
                />
                {errors.payRangeStart && (
                  <ErrorSpan {...errors.payRangeStart} />
                )}
              </div>
              <div>
                <Input
                  label="Pay range end"
                  type="number"
                  min="1"
                  {...register("payRangeEnd", {
                    required,
                    min: { value: 1, message: "Cannot be less than 0 if paid" },
                  })}
                />
                {errors.payRangeEnd && <ErrorSpan {...errors.payRangeEnd} />}
              </div>
              <span>(in euro)</span>
              {payStart && payEnd && payStart > payEnd && (
                <ErrorSpan message="Pay start cannot be more than pay end" />
              )}
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

export default JobForm;
