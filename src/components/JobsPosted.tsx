import { type Prisma } from "@prisma/client";
import React from "react";
import { FiLock } from "react-icons/fi";
import { api } from "~/utils/api";
import ErrorSpan from "./ErrorSpan";
import Link from "next/link";

type InternshipWithCompany = Prisma.InternshipGetPayload<{
  include: {
    Company: true;
  };
}>;
interface InternshipCardProps {
  internship: InternshipWithCompany;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  const deadlineDate = new Date(internship.deadline).toLocaleDateString();

  return (
    <Link href={`/internship/${internship.id}`}>
      <div className="max-w-sm overflow-hidden rounded bg-green-200 p-4 shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="rounded-full bg-purple-600 p-2">
              <FiLock className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <div className="text-xl font-medium text-black">
              {internship.position}
            </div>
            <p className="text-gray-500">{`${internship.Company.name} - Internship`}</p>
            <p className="text-gray-500">{deadlineDate}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
const InternshipList: React.FC = () => {
  const jobsQuery = api.internship.getAllFromCompany.useQuery();

  if (jobsQuery.isLoading) {
    return <>loading</>;
  }
  if (jobsQuery.error) {
    return (
      <>
        <ErrorSpan message={jobsQuery.error.message} />
      </>
    );
  }
  const internships = jobsQuery.data;
  return (
    <div>
      {internships.map((internship) => (
        <InternshipCard key={internship.id} internship={internship} />
      ))}
    </div>
  );
};
const JobsPosted = () => {
  return (
    <div className="h-screen">
      <div>JobsPosted</div>
      <InternshipList />
    </div>
  );
};

export default JobsPosted;
