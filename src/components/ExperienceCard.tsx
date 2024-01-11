import React from 'react';
import { type Experience } from '@prisma/client'; // Import the type from Prisma Client

interface ExperienceCardProps {
  experience: Experience;
  own: boolean;
  onDelete: (id: string) => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, own }) => {
  // Format dates for display
  const startDate = experience.startDate ? new Date(experience.startDate).toLocaleDateString() : 'Not provided';
  const endDate = experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present';

  return (
    <div className="max-w-md bg-white rounded-lg border border-gray-200 shadow-md">
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{experience.position}</h5>
        <p className="mb-3 font-normal text-gray-700">{experience.company}</p>
        <p className="text-sm text-gray-600">Start Date: {startDate}</p>
        <p className="text-sm text-gray-600">End Date: {endDate}</p>
        <p className="mt-3 text-gray-500">{experience.description}</p>
        {own && (
          <button
            onClick={() => onDelete(experience.id)}
            className="mt-4 rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
