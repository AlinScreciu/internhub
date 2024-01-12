import React, { useState } from 'react';
import { Experience, User } from '@prisma/client';
import ExperienceForm from './ExperienceForm';
import { api } from '~/utils/api';
import ExperienceCard from './ExperienceCard';
import { UploadButton } from "~/utils/uploadthing";

interface UserProfileProps {
  user: User;
  own: boolean; 
}

const UserProfile: React.FC<UserProfileProps> = ({ user, own }) => {
  const [addExperience, setAddExperience] = useState(false);

  const toggleExperienceForm = () => {
    setAddExperience(!addExperience);
  };


  const experiences = api.experience.getAll.useQuery()
  return (
    <div className="flex h-screen">
      {/* Profile Sidebar */}
      <div className="w-1/3 bg-white p-6 border-r-2 border-gray-200">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 mb-4 overflow-hidden">
            {user.image ? (
              <img src={user.image} alt={user.name ?? 'User Image'} className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-6xl text-gray-400">?</span>
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{user.name ?? 'Anonymous'}</h1>
          <p className="text-sm text-gray-500 mb-1">{user.university ?? 'No University'}</p>
          <p className="text-sm text-gray-500 mb-4">{user.faculty ?? 'No Faculty'}</p>
          <p className="text-gray-600 text-center mb-4">
            {user.description ?? 'No description provided.'}
          </p>
          {user.cv && (
            <a
              href={user.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-indigo-600 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-indigo-500 transition-colors"
            >
              View My CV
            </a>
          )}
          {own && (
            <div className="mb-4 grid grid-cols-1 gap-4">
          <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          api.user.addCv.useMutation(res)
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
          </div>
          )}
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        {addExperience && <ExperienceForm setAdd={setAddExperience}/>}
        {!addExperience && 
        experiences.data?.map((experience)=>
        {
          return <ExperienceCard key={experience.id} experience={experience} own= {own}   onDelete={(id) => console.log('Delete experience with id:', id)}
          />
        })
        }

      </div>
    </div>
  );
};

export default UserProfile;
