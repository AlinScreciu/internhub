import { type Prisma } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { GrMoney } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { api } from "~/utils/api";
import ErrorSpan from "./ErrorSpan";
import { TbBriefcase } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
type InternshipWithCompany = Prisma.InternshipGetPayload<{
  include: {
    Company: true;
  };
}>;
const JobCard: React.FC<{ job: InternshipWithCompany }> = ({ job }) => {
  return (
    <div className="grid grid-cols-1 gap-4 overflow-auto pl-3 pr-3 pt-8">
      <div className="flex gap-2 rounded-lg border-[2px] border-gray-300 bg-white shadow-lg shadow-gray-300">
        <TbBriefcase
          className="h-12 w-12 p-1 text-3xl"
          style={{ color: "#94d479" }}
        />
        <div className="mr-4 flex w-full flex-col">
          <div className="pt-2 text-xl font-bold" style={{ color: "#333" }}>
            {job.position}
          </div>
          <hr className="my-2 border-gray-300" style={{ width: "93%" }} />
          <div
            className="flex flex-row gap-4 text-sm"
            style={{ color: "#555" }}
          >
            <div className="font-semibold">{job.Company.name}</div>
            <div className="flex flex-row items-center gap-1">
              <IoLocationOutline
                className=" h-5 w-5"
                style={{ color: "#94d479" }}
              />
              <span>{job.location}</span>
            </div>
            {job.paid === true && (
              <div className="flex flex-row items-center gap-1">
                <GiMoneyStack
                  className=" h-5 w-5"
                  style={{ color: "#94d479" }}
                />
                <span>Paid</span>
              </div>
            )}
            {job.paid === false && (
              <div className="flex flex-row items-center gap-1">
                <GiMoneyStack
                  className=" h-5 w-5"
                  style={{ color: "#94d479" }}
                />
                <span>Unpaid</span>
              </div>
            )}
            {job.payRangeStart && job.payRangeEnd && (
              <div className="flex flex-row items-center gap-1">
                <GrMoney className=" h-5 w-5" style={{ color: "#94d479" }} />
                <span>
                  {job.payRangeStart} - {job.payRangeEnd}
                </span>
              </div>
            )}
          </div>
          <div
            className="flex w-full justify-end pb-2 pt-2 text-xs"
            style={{ color: "#666" }}
          >
            <div>Deadline: {job.deadline.toLocaleDateString()}</div>
          </div>
        </div>
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
        <Link key={job.id} href={`/internship/${job.id}`}>
          <JobCard job={job} />
        </Link>
      ))}
    </div>
  );
};

export default JobsApplied;
