import { type Prisma } from "@prisma/client";
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
    <div className="grid grid-cols-1 gap-4 pt-8 pl-3 pr-3 overflow-auto">
    <div className="flex gap-2 rounded-lg shadow-lg border-[2px] border-primary shadow-primary bg-white">
      <TbBriefcase className="p-1 text-3xl w-12 h-12" style={{ color: "#94d479" }} />
      <div className="flex flex-col w-full mr-4">
        <div className="font-bold text-xl pt-2" style={{ color: "#333" }}>{job.position}</div>
        <hr className="my-2 border-gray-300" style={{ width: '93%' }} />
        <div className="flex flex-row gap-4 text-sm" style={{ color: "#555" }}>
          <div className="font-semibold">{job.Company.name}</div>
          <div className="flex flex-row gap-1 items-center">
            <IoLocationOutline className=" w-5 h-5" style={{ color: "#94d479" }}/>
            <span>{job.location}</span>
          </div>
          {job.paid === true && (
             <div className="flex flex-row gap-1 items-center">
               <GiMoneyStack className=" w-5 h-5" style={{ color: "#94d479" }}/>
               <span>Paid</span>
             </div>
          )}
          {job.paid === false && (
             <div className="flex flex-row gap-1 items-center">
               <GiMoneyStack className=" w-5 h-5" style={{ color: "#94d479" }}/>
               <span>Unpaid</span>
             </div>
          )}
          {job.payRangeStart && job.payRangeEnd && (
            <div className="flex flex-row gap-1 items-center">
              <GrMoney className=" w-5 h-5" style={{ color: "#94d479" }}/>
              <span>{job.payRangeStart} - {job.payRangeEnd}</span>
            </div>
          )}
        </div>
        <div className="flex w-full justify-end text-xs pt-2 pb-2" style={{ color: "#666" }}>
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
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobsApplied;
