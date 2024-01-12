import React from "react";
import { api } from "~/utils/api";
import ErrorSpan from "./ErrorSpan";
import type { Prisma, User } from "@prisma/client";
import { IoLocationOutline } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import { FaBusinessTime } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type InternshipWithApplicants = Prisma.InternshipGetPayload<{
  include: { applicants: true };
}>;
import {
  FaUser,
  FaEnvelope,
  FaUniversity,
  FaBuilding,
  FaCalendar,
  FaUserTie,
  FaFileAlt,
} from "react-icons/fa";
import Link from "next/link";

function downloadFiles(applicants: User[]): void {
  const applicantsWithCV = applicants.filter((applicant) => applicant.cv);

  const downloadPromises = applicantsWithCV.map((applicant) =>
    fetch(applicant.cv!)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to download CV for ${applicant.name}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const currentDate = new Date().toISOString().slice(0, 10);
        const fileName = `${currentDate}_${applicant.name}_CV.${
          blob.type.split("/")[1]
        }`;
        const a = document.createElement("a");
        const fileUrl = window.URL.createObjectURL(blob);
        a.href = fileUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(fileUrl);
        document.body.removeChild(a);
        toast.success(`CV downloaded successfully for ${applicant.name}`);
      })
      .catch((error) => {
        console.error(`Error downloading CV for ${applicant.name}:`, error);
        toast.error(`Failed to download CV for ${applicant.name}`);
      }),
  );

  const applicantsWithoutCV = applicants.filter((applicant) => !applicant.cv);
  applicantsWithoutCV.forEach((applicant) =>
    toast.warn(`No CV available for ${applicant.name}`),
  );

  Promise.all(downloadPromises)
    .then(() => console.log("All CVs downloaded successfully"))
    .catch((error) => console.error("Error downloading CVs:", error));
}
const JobCard: React.FC<{ internship: InternshipWithApplicants }> = ({
  internship,
}) => {
  const onApply = () => {
    downloadFiles(internship.applicants);
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
          Download CV&apos;s
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};
const UserCard: React.FC<{ user: User }> = ({ user }) => (
  <div className="max-w-md rounded-md bg-white p-6 shadow-md">
    <div className="mb-4 flex items-center">
      <FaUser className="mr-4 text-5xl text-blue-500" />
      <div>
        <div className="mb-1 text-xl font-semibold">{user.name ?? "N/A"}</div>
        <div className="flex items-center">
          <FaEnvelope className="mr-2 text-lg text-gray-500" />
          <div className="text-gray-600">{user.email ?? "N/A"}</div>
        </div>
      </div>
    </div>
    <div className="my-4 border-t border-gray-300" />
    <div className="mb-4">
      <div className="flex items-center">
        <FaUniversity className="mr-2 text-lg text-gray-500" />
        <div className="text-gray-600">{user.university ?? "N/A"}</div>
      </div>
      <div className="mt-2 flex items-center">
        <FaBuilding className="mr-2 text-lg text-gray-500" />
        <div className="text-gray-600">{user.faculty ?? "N/A"}</div>
      </div>
      <div className="mt-2 flex items-center">
        <FaUserTie className="mr-2 text-lg text-gray-500" />
        <div className="text-gray-600">{user.role ?? "N/A"}</div>
      </div>
      <div className="mt-2 flex items-center">
        <FaCalendar className="mr-2 text-lg text-gray-500" />
        <div className="text-gray-600">
          {user.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}
        </div>
      </div>
    </div>
    <div className="my-4 border-t border-gray-300" />
    <div className="flex items-center">
      <FaFileAlt className="mr-2 text-lg text-gray-500" />
      <div className="line-clamp-3 text-gray-600">
        {user.description ?? "N/A"}
      </div>
    </div>
  </div>
);

const Applicants: React.FC<{ applicants: User[] }> = ({ applicants }) => {
  // Placeholder component for company overview and reviews
  // You would implement the logic to fetch and display company data here

  return (
    <div className="p-5">
      <div className="mb-4 text-lg font-bold">
        <div>Applicants</div>
        <div>
          {applicants.map((user) => (
            <Link key={user.id} href={`/profile/${user.id}`}>
              <UserCard user={user} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const EmployerInternship: React.FC<{ id: string }> = (query) => {
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
        <Applicants applicants={internship.applicants} />
      </div>
    </div>
  );
};

export default EmployerInternship;
