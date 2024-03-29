import React from "react";
import { api } from "~/utils/api";
import ErrorSpan from "./ErrorSpan";
import { type Prisma } from "@prisma/client";
import { TbBriefcase } from "react-icons/tb";
import { GrMoney } from "react-icons/gr";
import { GiMoneyStack } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";
import { useQueryStore } from "~/stores/query.store";
type InternshipWithCompany = Prisma.InternshipGetPayload<{
  include: {
    Company: true;
  };
}>;
const JobCard: React.FC<{ job: InternshipWithCompany }> = ({ job }) => {
  return (
    <div className="shadow-gray-300-0 flex gap-3 rounded-lg border-[2px]  border-gray-300 bg-white p-4 shadow-lg  ">
      <TbBriefcase
        className="h-12 w-12 p-1 text-3xl"
        style={{ color: "#94d479" }}
      />
      <div className="flex w-full flex-col">
        <div className="text-2xl font-bold" style={{ color: "#333" }}>
          {job.position}
        </div>
        <hr className="my-2 border-gray-300" />
        <div
          className="flex flex-col justify-between text-sm md:flex-row"
          style={{ color: "#555" }}
        >
          <div className="font-semibold">{job.Company.name}</div>
          <div className="flex items-center gap-1">
            <IoLocationOutline
              className=" h-5 w-5"
              style={{ color: "#94d479" }}
            />
            <span>{job.location}</span>
          </div>
          {job.paid && (
            <div className="flex items-center gap-1">
              <GiMoneyStack className=" h-5 w-5" style={{ color: "#94d479" }} />
              <span>Paid</span>
            </div>
          )}
          {job.paid === false && (
            <div className="flex flex-row items-center gap-1">
              <GiMoneyStack className=" h-5 w-5" style={{ color: "#94d479" }} />
              <span>Unpaid</span>
            </div>
          )}
          {job.payRangeStart && job.payRangeEnd && (
            <div className="flex items-center gap-1">
              <GrMoney className=" h-5 w-5" style={{ color: "#94d479" }} />
              <span>
                {job.payRangeStart} - {job.payRangeEnd} €
              </span>
            </div>
          )}
        </div>
        <div
          className="flex justify-end pb-2 pt-2 text-xs"
          style={{ color: "#666" }}
        >
          <div>Deadline: {job.deadline.toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

const Recommendations = () => {
  const query = useQueryStore((store) => store.query);
  const jobsQuery = api.internship.getAll.useQuery({ query, applicant: true });

  if (jobsQuery.isLoading) {
    return <>Loading</>;
  }
  if (jobsQuery.isError) {
    return <ErrorSpan message={jobsQuery.error.message} />;
  }

  const jobs = jobsQuery.data;

  return (
    <div className="grid grid-cols-2 gap-4  p-5">
      {jobs.map((job) => (
        <Link key={job.id} href={`/internship/${job.id}`} target="_blank">
          <JobCard job={job} />
        </Link>
      ))}
    </div>
  );
};

export default Recommendations;
