import React from "react";
import Recommendations from "./Recommendations";
import JobsApplied from "./JobsApplied";

const StudentHome = () => {
  return (
    <div className="flex h-screen w-screen">
      <div className=" min-w-80 bg-slate-400">
        <JobsApplied />
      </div>
      <div className="flex-1  bg-slate-200">
        <Recommendations />
      </div>
    </div>
  );
};

export default StudentHome;
