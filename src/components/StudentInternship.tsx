import React, { useLayoutEffect, useRef } from "react";
import { api } from "~/utils/api";
import ErrorSpan from "./ErrorSpan";
import type { Company, Internship, Review } from "@prisma/client";
import AddReviewForm from "./AddReview";
import { Star } from "./StarsRating";

const JobCard: React.FC<{ internship: Internship }> = ({ internship }) => {
  const utils = api.useUtils();

  const applyToInternshipMutation = api.user.applyToInternship.useMutation({
    onSuccess: async () => {
      await utils.user.invalidate();
      await utils.internship.invalidate();
    },
  });
  const onApply = () => {
    applyToInternshipMutation.mutate({ id: internship.id });
  };
  return (
    <div>
      <div>{internship.position}</div>
      <button type="button" onClick={onApply}>
        Apply to job
      </button>
    </div>
  );
};

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="rounded-md bg-white p-2 shadow-md">
      <div className="mb-2 text-lg font-semibold">{review.title}</div>
      <div className="mb-2 text-gray-600">{review.description}</div>
      <div className="mb-2 flex items-center">
        <div className="text-gray-500">{review.position}</div>
      </div>
      <div className="mb-2 text-gray-500">
        {`${review.startDate.toDateString()} ${
          review.endDate ? `- ${review.endDate.toDateString()}` : ""
        }`}
      </div>
      <div className="flex items-center">
        <div id="stars" className="flex gap-2">
          {[1, 2, 3, 4, 5].map((v, i) => (
            <Star key={i} filled={v <= review.stars} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CompanyOverview: React.FC<{ company: Company }> = ({ company }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [showModal, setShowModal] = React.useState(false);

  useLayoutEffect(() => {
    if (!dialogRef.current) return;
    if (showModal) {
      dialogRef.current.showModal();
      return;
    }
    dialogRef.current.close();
  }, [showModal]);

  const reviewsQuery = api.review.getAllReviewFromCompany.useQuery({
    companyId: company.id,
  });
  if (reviewsQuery.isLoading) {
    return <>loading...</>;
  }

  if (reviewsQuery.isError) {
    return <ErrorSpan message={reviewsQuery.error.message} />;
  }
  const reviews = reviewsQuery.data;

  const handleDialogOnClick = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="flex flex-col">
      <div>Company here</div>
      <div className="flex w-fit gap-2">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      <div>
        <button type="button" onClick={handleDialogOnClick}>
          Add review
        </button>
        <dialog onClose={() => setShowModal(false)} ref={dialogRef}>
          <AddReviewForm companyId={company.id} setShowModal={setShowModal} />
        </dialog>
      </div>
    </div>
  );
};

const StudentInternship: React.FC<{ id: string }> = (query) => {
  const internshipQuery = api.internship.getById.useQuery(query);
  if (internshipQuery.isLoading) {
    return <>loading...</>;
  }

  if (internshipQuery.isError) {
    return <ErrorSpan message={internshipQuery.error.message} />;
  }

  if (!internshipQuery.data) {
    return <>Couldn&apos;t find internship</>;
  }
  const internship = internshipQuery.data;
  return (
    <div className="flex h-screen w-screen">
      <div className="flex-1 bg-gray-400">
        <JobCard internship={internship} />
      </div>
      <div className="flex-auto bg-slate-400">
        <CompanyOverview company={internship.Company} />
      </div>
    </div>
  );
};

export default StudentInternship;
