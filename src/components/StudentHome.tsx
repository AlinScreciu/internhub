import React from "react";
import Recommendations from "./Recommendations";
import JobsApplied from "./JobsApplied";

const StudentHome = () => {
  return (
    <div className="flex h-[calc(100vh-5rem)] w-screen">
      <div className="min-w-80 bg-slate-300">
        <div className="flex items-center justify-center border-b border-gray-400 p-4 text-4xl font-bold">
          Jobs Applied
        </div>
        <JobsApplied />
      </div>
      <div className="h-full w-1 bg-gray-500"></div>
      <div className="flex-1 bg-slate-200">
        <div className="flex items-center justify-center border-b border-gray-400 p-4 text-4xl font-bold">
          Recommendations
        </div>
        <Recommendations />
      </div>
    </div>
  );
};

export default StudentHome;
