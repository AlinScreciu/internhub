import { type Prisma } from "@prisma/client";
import React from "react";
import { IoBriefcaseSharp } from "react-icons/io5";
import { api } from "~/utils/api";
import ErrorSpan from "./ErrorSpan";
type InternshipWithCompany = Prisma.InternshipGetPayload<{
  include: {
    Company: true;
  };
}>;
const JobCard: React.FC<{ job: InternshipWithCompany }> = ({ job }) => {
  return (
    <div className="flex gap-2 bg-primary">
      <IoBriefcaseSharp className="p-1 text-3xl" />
      <div className="flex flex-col">
        <div>{job.position}</div>
        <div>{job.Company.name}</div>
      </div>
    </div>
  );
};
const JobsApplied = () => {
  const appliedJobsQuery = api.internship.getAppliedForCurrentUser.useQuery();
  if (appliedJobsQuery.isLoading) {
    return <>loading</>;
  }
  if (appliedJobsQuery.isError) {
    return <ErrorSpan message={appliedJobsQuery.error.message} />;
  }
  const jobs = appliedJobsQuery.data;

  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobsApplied;
