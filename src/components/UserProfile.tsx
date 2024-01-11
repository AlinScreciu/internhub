import React, { useState } from 'react';
import { User } from '@prisma/client';
import ExperienceForm from './ExperienceForm';

interface UserProfileProps {
  user: User;
  own: boolean; // Indicates if the profile belongs to the current user
}

const UserProfile: React.FC<UserProfileProps> = ({ user, own }) => {
  const [addExperience, setAddExperience] = useState(false);
  
  const toggleExperienceForm = () => {
    setAddExperience(!addExperience);
  };

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
            <div className="flex flex-col w-full mt-8 space-y-3">
              <button className="bg-indigo-600 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-indigo-500 transition-colors">
                Add CV
              </button>
              <button 
                onClick={toggleExperienceForm}
                className="bg-gray-500 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Add Experience
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        {addExperience && <ExperienceForm />}
        {/* Rest of the content */}
      </div>
    </div>
  );
};

export default UserProfile;
