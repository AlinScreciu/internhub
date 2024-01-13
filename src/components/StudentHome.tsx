import React from "react";
import Recommendations from "./Recommendations";
import JobsApplied from "./JobsApplied";

const StudentHome = () => {
  return (
    <div className="flex h-screen w-screen">
    <div className="min-w-80 bg-gray-100">
      <div className="flex justify-center items-center font-bold text-4xl p-4 border-b border-gray-400">
        Jobs Applied
      </div>
      <JobsApplied />
    </div>
    <div className="w-1 bg-gray-500 h-full"></div>
    <div className="flex-1 bg-gray-50">
      <div className="flex justify-center items-center font-bold text-4xl p-4 border-b border-gray-400">
        Recommendations
      </div>
      <Recommendations />
    </div>
  </div>
  );
};

export default StudentHome;
