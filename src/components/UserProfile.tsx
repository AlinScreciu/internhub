import React, { useLayoutEffect, useState } from "react";
import { type User } from "@prisma/client";
import ExperienceForm from "./ExperienceForm";
import { api } from "~/utils/api";
import ExperienceCard from "./ExperienceCard";
import { UploadButton } from "~/utils/uploadthing";
import Image from "next/image";
import ErrorSpan from "./ErrorSpan";

interface UserProfileProps {
  user: User;
  own: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, own }) => {
  const experiencesQuery = api.experience.getAll.useQuery();
  const [addExperience, setAddExperience] = useState(false);

  const toggleExperienceForm = () => {
    setAddExperience(!addExperience);
  };
  const experiences = experiencesQuery.data;
  useLayoutEffect(() => {
    if (!experiences) {
      setAddExperience(true);
      return;
    }
    if (experiences.length === 0) {
      setAddExperience(true);
    }
  }, [experiences]);
  const uploadCvMutation = api.user.addCv.useMutation();
  return (
    <div className="flex h-screen">
      {/* Profile Sidebar */}
      <div className="w-1/3 border-r-2 border-gray-200 bg-white p-6">
        <div className="flex flex-col items-center">
          <div className="mb-4 h-32 w-32 overflow-hidden">
            {user.image ? (
              <Image
                src={user.image}
                width={50}
                height={50}
                alt={user.name ?? "User Image"}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-300">
                <span className="text-6xl text-gray-400">?</span>
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            {user.name ?? "Anonymous"}
          </h1>
          <p className="mb-1 text-sm text-gray-500">
            {user.university ?? "No University"}
          </p>
          <p className="mb-4 text-sm text-gray-500">
            {user.faculty ?? "No Faculty"}
          </p>
          <p className="mb-4 text-center text-gray-600">
            {user.description ?? "No description provided."}
          </p>
          {user.cv && (
            <a
              href={user.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
            >
              View My CV
            </a>
          )}
          {own && (
            <div className="mb-4 grid grid-cols-1 gap-4">
              <UploadButton
                endpoint="cv"
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
      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-6">
        {addExperience ? (
          <ExperienceForm setAdd={setAddExperience} />
        ) : (
          experiencesQuery.data?.map((experience) => {
            return (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                own={own}
                onDelete={(id) => console.log("Delete experience with id:", id)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserProfile;
