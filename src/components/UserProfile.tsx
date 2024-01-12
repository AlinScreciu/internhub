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
    if (!experiences || experiences.length === 0) {
      setAddExperience(true);
    }
  }, [experiences]);

  const uploadCvMutation = api.user.addCv.useMutation();

  return (
    <div className="flex h-screen">
      {/* Profile Sidebar */}
      <div className="w-1/3 border-r border-gray-300 bg-white p-8 shadow-md">
        <div className="flex flex-col items-center">
          <div className="mb-6 h-40 w-40 overflow-hidden rounded-full shadow">
            {user.image ? (
              <Image
                src={user.image}
                width={160}
                height={160}
                alt={user.name ?? "User Image"}
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-300">
                <span className="text-6xl text-gray-400">?</span>
              </div>
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {user.name ?? "Anonymous"}
          </h1>
          <p className="text-sm text-gray-500 mb-1">
            {user.university ?? "No University"}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {user.faculty ?? "No Faculty"}
          </p>
          <p className="text-center text-gray-600 mb-4">
            {user.description ?? "No description provided."}
          </p>
          {user.cv && (
            <a
              href={user.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-700 mb-4"
            >
              View My CV
            </a>
          )}
          <button 
            onClick={toggleExperienceForm}
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Add Experience
          </button>
          {own && (
            <div className="grid grid-cols-1 gap-4 mt-4">
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
      <div className="flex-1 bg-gray-50 p-8">
        {addExperience ? (
          <ExperienceForm setAdd={setAddExperience} />
        ) : (
          experiencesQuery.data?.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              own={own}
              onDelete={(id) => console.log("Delete experience with id:", id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;
