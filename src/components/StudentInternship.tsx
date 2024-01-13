import React from "react";
import { api } from "~/utils/api";
import ErrorSpan from "./ErrorSpan";
import type { Company, Internship } from "@prisma/client";
import { IoLocationOutline } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import { FaBusinessTime } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import Reviews from "./Reviews";
import AddReviewModal from "./AddReviewModal";
import Link from "next/link";

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
    <div className="m-5 h-[75%] rounded-lg bg-white p-10 shadow-lg">
      <div className="flex justify-end pb-4 text-gray-600">
        Deadline: {new Date(internship.deadline).toLocaleDateString()}
      </div>

      <div className="mb-4 flex items-center">
        <div className="flex-grow">
          <div className="flex justify-center pb-3 text-xl font-bold">
            {internship.position}
          </div>
          <div className=" grid grid-cols-3 gap-2 ">
            <div className="flex flex-row items-center gap-2">
              <IoLocationOutline className="h-5 w-5 text-primary " />
              <div className="text-gray-600">{internship.location}</div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <MdLocationCity className="h-5 w-5 text-primary " />
              <div className="text-gray-600">{internship.workingPlace}</div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <FaBusinessTime className="h-5 w-5 text-primary " />
              <div className="text-gray-600">
                {internship.fullTime ? "Full-Time" : "Part-Time"}
              </div>
            </div>
            {internship.paid === true && (
              <div className="flex flex-row items-center gap-2">
                <GiMoneyStack
                  className=" h-5 w-5"
                  style={{ color: "#94d479" }}
                />
                <span>Paid</span>
              </div>
            )}
            {internship.paid === false && (
              <div className="flex flex-row items-center gap-2">
                <GiMoneyStack
                  className=" h-5 w-5"
                  style={{ color: "#94d479" }}
                />
                <span>Unpaid</span>
              </div>
            )}
            {internship.payRangeStart && internship.payRangeEnd && (
              <div className="text-gray-600">
                {internship.payRangeStart} - {internship.payRangeEnd}
              </div>
            )}
            <div className="flex flex-row items-center gap-2">
              <FaRegUser className="h-5 w-5 text-primary " />
              <div className="text-gray-600">
                Positions: {internship.openPositions}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-center text-[18px] text-gray-900">
          Description:
        </div>
        <div className="mb-3 flex max-h-[200px] justify-center overflow-auto text-gray-800">
          {internship.description}
        </div>
      </div>
      <div className="flex justify-center self-end">
        <button
          type="button"
          onClick={onApply}
          className="rounded-full bg-primary px-6 py-2 font-bold text-white shadow-md"
        >
          Apply to job
        </button>
      </div>
    </div>
  );
};

const CompanySection: React.FC<{ company: Company }> = ({ company }) => {
  // Placeholder component for company overview and reviews
  // You would implement the logic to fetch and display company data here

  return (
    <div className="p-5">
      <div className="mb-4 text-lg font-bold">Company overview</div>
      {/* Placeholder for company information */}
      <Link href={`/company/${company.id}`} target="_blank">
        {" "}
        Go to company page
      </Link>
      <div className="mb-6">[Company information here]</div>
      <div className="mb-4 text-lg font-bold">Company reviews</div>
      <div className="mb-6">
        <Reviews companyId={company.id} />
      </div>
      <div className="mb-6 flex flex-col">
        <AddReviewModal companyId={company.id} />
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
    <div className="flex h-full divide-x divide-gray-300">
      <div className="w-2/5 p-4">
        <JobCard internship={internship} />
      </div>
      <div className="w-3/5 p-4">
        <CompanySection company={internship.Company} />
      </div>
    </div>
  );
};

export default StudentInternship;
