import React, { useState } from 'react';
import { User } from '@prisma/client';

interface UserProfileProps {
  user: User;
  own: boolean; // Indicates if the profile belongs to the current user
}

const UserProfile: React.FC<UserProfileProps> = ({ user, own }) => {
  const [addExperience, setAddExperience] = useState(false)  
  const showExperience = () => {
    setAddExperience(!addExperience)
    
  }
  console.log(addExperience)
  return (
    <div className="flex flex-row">
      <div className="w-1/3 bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 overflow-hidden">
            {user.image ? (
              <img src={user.image} alt={user.name ?? 'User Image'} className="w-full h-full object-cover" />
            ) : (
              <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>
          <h1 className="text-2xl font-semibold">{user.name ?? 'Anonymous'}</h1>
          <p className="text-sm text-gray-500 mb-1">{user.university ?? 'No University'}</p>
          <p className="text-sm text-gray-500 mb-4">{user.faculty ?? 'No Faculty'}</p>
          <p className="text-gray-700 text-center mb-4">
            {user.description ?? 'No description provided.'}
          </p>
          {user.cv && (
            <a
              href={user.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-500 transition-colors"
            >
              View My CV
            </a>
          )}
          {own && (
            <div className="flex flex-col w-full mt-8">
              <button className="bg-green-500 text-white text-sm px-4 py-2 rounded hover:bg-green-400 transition-colors mb-2">
                Add CV
              </button>
              <button 
              className="bg-gray-500 text-white text-sm px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              onClick={showExperience}
              >
                Add Experience
              </button>
              
            </div>
          )}
        </div>
      </div>
      {/* Placeholder for the rest of the page content */}
      <div className="w-2/3"></div>
      
    </div>
  );
};

export default UserProfile;
