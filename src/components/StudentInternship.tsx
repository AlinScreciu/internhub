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
    <div className="h-fit rounded-lg bg-white p-10 shadow-lg">
      <div className="flex items-center pb-4">
        <div className="flex-grow">
          <div className="flex justify-start pb-3 text-xl font-bold">
            {internship.position}
          </div>
          <div className="flex justify-start pb-4 text-gray-600">
            Deadline:{" "}
            {new Date(internship.deadline).toLocaleDateString("en-EN")}
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
                <GiMoneyStack className="h-5 w-5 text-primary" />
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
            <div className="col-span-2 flex w-fit flex-row items-center gap-2 ">
              <FaRegUser className="h-5 w-5 text-primary " />
              <span className="  text-gray-600">
                Positions open: {internship.openPositions}
              </span>
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
const CompanyPreview: React.FC<{ company: Company }> = ({ company }) => {
  return (
    <div>
      <div className="py-1 text-3xl font-bold">{company.name}</div>
      <div className="py-1 text-2xl font-bold">Overview</div>
      <div>{company.description}</div>
      <div>
        <div className="font-bold ">Website</div>
        <Link className="text-blue-700" href={company.website} target="_blank">
          {company.website}
        </Link>
      </div>
      <div>
        <div className="font-bold">Domain</div>
        <div>{company.domain}</div>
      </div>
      <div>
        <div className="font-bold">Company size</div>
        <div>{company.employees} employees</div>
      </div>
      <div>
        <div className="font-bold">Headquarters</div>
        <div>{company.headquarters}</div>
      </div>
      <Link href={`/company/${company.id}`} target="_blank">
        {" "}
        Go to company page
      </Link>
    </div>
  );
};
const CompanySection: React.FC<{ company: Company }> = ({ company }) => {
  // Placeholder component for company overview and reviews
  // You would implement the logic to fetch and display company data here

  return (
    <div className="p-5">
      <div className="pb-5">
        <CompanyPreview company={company} />
      </div>
      <div className="pb-4 text-lg font-bold">Reviews</div>
      <div className="h-[calc(32vh)] overflow-y-auto ">
        <Reviews companyId={company.id} />
      </div>
      <div className="flex flex-col pb-6">
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
    <div className="flex h-[calc(100vh-5rem)] w-screen divide-x divide-gray-300 ">
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
