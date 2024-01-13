import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import TextareaInput from "./TextareaInput";
import ErrorSpan from "./ErrorSpan";
import { api } from "~/utils/api";
import StarsRating from "./StarsRating";
export interface ReviewFormData {
  title: string;
  position: string;
  description: string;
  stars: number;
  startDate: Date;
  endDate?: Date;
}

const AddReviewForm: React.FC<{
  companyId: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ companyId, setShowModal }) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    mode: "onChange",
  });
  const utils = api.useUtils();
  const addReviewMutation = api.review.post.useMutation({
    onSuccess: async () => {
      await utils.review.getAllReviewFromCompany.invalidate();
      setShowModal(false);
    },
  });

  const start = watch("startDate");
  const end = watch("endDate");
  const onSubmit: SubmitHandler<ReviewFormData> = (data) => {
    addReviewMutation.mutate({ ...data, companyId });
  };
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-2 gap-2 p-2">
            <div>
              <Input
                label="Title"
                type="text"
                {...register("title", { required: "Required" })}
              />
              {errors.title && <ErrorSpan message={errors.title.message} />}
            </div>
            <div>
              <Input
                label="Position"
                type="text"
                {...register("position", { required: "Required" })}
              />
              {errors.position && (
                <ErrorSpan message={errors.position.message} />
              )}
            </div>
          </div>
          <div className="w-80 min-w-0">
            <TextareaInput
              label="Description"
              {...register("description", { required: "Required" })}
            />
            {errors.description && (
              <ErrorSpan message={errors.description.message} />
            )}
          </div>
          <div className="p-4">
            <StarsRating onChange={(rating) => setValue("stars", rating)} />
          </div>
          <div className="grid grid-cols-2 gap-2 p-2">
            <div>
              <Input
                type="date"
                label="Start"
                {...register("startDate", {
                  required: "Required",
                  valueAsDate: true,
                  validate: (_) => {
                    const now = new Date();
                    if (start >= now)
                      return "Start date cannot be in the future";
                    if (end && start >= end)
                      return "Start date cannot be after end date";
                  },
                })}
              />
              {errors.startDate && (
                <ErrorSpan message={errors.startDate.message} />
              )}
            </div>
            <div>
              <Input
                type="date"
                label="End"
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
            </div>
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
  );
};

export default AddReviewForm;
