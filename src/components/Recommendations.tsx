import React from "react";
import { api } from "~/utils/api";
import ErrorSpan from "./ErrorSpan";
import { type Prisma } from "@prisma/client";
import { IoBriefcaseSharp } from "react-icons/io5";
import Link from "next/link";
import { useQueryStore } from "~/stores/query.store";
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

const Recommendations = () => {
  const query = useQueryStore((store) => store.query);
  const jobsQuery = api.internship.getAll.useQuery({ query });

  if (jobsQuery.isLoading) {
    return <>Loading</>;
  }
  if (jobsQuery.isError) {
    return <ErrorSpan message={jobsQuery.error.message} />;
  }

  const jobs = jobsQuery.data;

  return (
    <div className="grid grid-cols-2 gap-4 p-5">
      {jobs.map((job) => (
        <Link key={job.id} href={`/internship/${job.id}`} target="_blank">
          <JobCard job={job} />
        </Link>
      ))}
    </div>
  );
};

export default Recommendations;
