import React from 'react';
import { type Experience } from '@prisma/client'; // Import the type from Prisma Client
import { api } from '~/utils/api';
import { FaBusinessTime } from 'react-icons/fa';
import { RxCross1 } from "react-icons/rx";


interface ExperienceCardProps {
  experience: Experience;
  own: boolean;
  onDelete: (id: string) => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, own }) => {
  // Format dates for display
  const startDate = experience.startDate ? new Date(experience.startDate).toLocaleDateString() : 'Not provided';
  const endDate = experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present';
  const apicontext = api.useUtils();

  const deleteExperience = api.experience.deleteById.useMutation({
    async onSuccess() {
      await apicontext.experience.getAll.invalidate();
    },
  });
  
  
  const handleDeleteExperience = (id: string) => {
    deleteExperience.mutate({ id: id });
  };
  
  return (
    <div className="max-w-md relative bg-white rounded-lg border border-gray-200 shadow-lg">
      <div className='flex justify-end absolute top-1 right-2'>
          {own && (
            <button
              onClick={() => handleDeleteExperience(experience.id)}
              className=" mt-2 rounded px-4 py-2 text-base text-red-700 "
            >
             <RxCross1 />
            </button>
          )}
        </div>
      <div className="flex flex-col p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight">{experience.position}</h5>
        <div className="flex flex-row items-center gap-2 mb-3">
          <FaBusinessTime className="h-5 w-5 text-primary " />
          <div className=" font-normal text-gray-700">{experience.company}</div>
        </div>
        <div className="text-sm text-gray-600">Start Date: {startDate}</div>
        <div className="text-sm text-gray-600">End Date: {endDate}</div>
        <div className="flex flex-col gap-4 mt-1 ">
        <div className="text-[16px] text-primary font-bold">
          Description:
        </div>
        <div className="mb-3 max-h-[120px]  overflow-auto text-gray-800">
          {experience.description}
        </div>
      </div>
        
      </div>
    </div>
  );
};

export default ExperienceCard;
