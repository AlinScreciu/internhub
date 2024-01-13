import React, { useLayoutEffect, useState } from "react";
import { type User } from "@prisma/client";
import ExperienceForm from "./ExperienceForm";
import { api } from "~/utils/api";
import ExperienceCard from "./ExperienceCard";
import { UploadButton } from "~/utils/uploadthing";
import Image from "next/image";
import ErrorSpan from "./ErrorSpan";
import Link from "next/link";

interface UserProfileProps {
  user: User;
  own: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, own }) => {
  const experiencesQuery = api.experience.getAll.useQuery();
  const [addExperience, setAddExperience] = useState(own ? false : false);

  const toggleExperienceForm = () => {
    setAddExperience(!addExperience);
  };

  const experiences = experiencesQuery.data;
  useLayoutEffect(() => {
    if (!own) return;
    if (!experiences || experiences.length === 0) {
      setAddExperience(true);
    }
  }, [experiences, own]);

  const uploadCvMutation = api.user.addCv.useMutation();

  return (
    <div className="flex h-[calc(100vh-5rem)]  flex-row  justify-center ">
      {/* Profile Sidebar */}
      <div className="ml-4 mt-4 w-1/3">
        <div className="  rounded-lg border border-gray-200 bg-white p-3 shadow-lg shadow-gray-300">
          <div className="flex flex-col items-center">
            <div className="h-30 w-30 mb-3 overflow-hidden rounded-full shadow">
              {user.image ? (
                <Image
                  src={user.image}
                  width={120}
                  height={120}
                  alt={user.name ?? "User Image"}
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center rounded-full bg-gray-300">
                  <span className="text-6xl text-gray-400">?</span>
                </div>
              )}
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-800">
              {user.name ?? "Anonymous"}
            </h1>
            <div className="flex justify-between gap-3">
              <div className="mb-1 text-lg text-gray-600">
                {user.university ?? "No University"}
              </div>
              <div>-</div>
              <div className="mb-4 text-lg text-gray-600">
                {user.faculty ?? "No Faculty"}
              </div>
            </div>
            <div className="flex flex-col gap-4 ">
              <div className="flex justify-center  text-[18px] text-gray-900">
                Description:
              </div>
              <div className="mb-3 flex max-h-[calc(55vh)] justify-center overflow-y-auto   text-gray-800">
                {user.description ?? "No description provided"}
              </div>
            </div>
            <div className=" flex flex-row content-center items-center justify-center gap-4">
              {user.cv && (
                <Link
                  href={user.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-primary p-2 text-sm font-bold text-white shadow-md"
                >
                  VIEW MY CV
                </Link>
              )}
              {own && (
                <button
                  onClick={toggleExperienceForm}
                  className="rounded-md bg-primary p-2 text-sm font-bold text-white shadow-md"
                >
                  ADD EXPERIENCE
                </button>
              )}
            </div>
            {own && (
              <div className="mt-4 grid grid-cols-1 gap-4">
                <UploadButton
                  endpoint="cv"
                  appearance={{
                    button: {
                      backgroundColor: "#94d479",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    const file = res.at(0);
                    if (!file) return;
                    uploadCvMutation.mutate({ cv: file.url });
                    alert("Upload Completed");
                  }}
                />
                {uploadCvMutation.isError && (
                  <ErrorSpan message={uploadCvMutation.error.message} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" ml-3 w-[1px] bg-gray-300"></div>

      {/* Main Content */}
      <div className=" w-2/3 overflow-auto bg-gray-50 p-8">
        {addExperience ? (
          <ExperienceForm setAdd={setAddExperience} />
        ) : (
          <div className="grid grid-cols-2 justify-center gap-4">
            {experiencesQuery.data?.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                own={own}
                onDelete={(id) => console.log("Delete experience with id:", id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
