import React from "react";
import { api } from "~/utils/api";
import ErrorSpan from "./ErrorSpan";
import { type Internship } from "@prisma/client";

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
    <div className="flex">
      <JobCard internship={internship} />
    </div>
  );
};

export default StudentInternship;
