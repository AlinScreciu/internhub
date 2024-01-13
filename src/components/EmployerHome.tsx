import React from "react";
import JobsPosted from "./JobsPosted";
import JobForm from "./JobForm";

const EmployerHome = () => {
  return (
    <div className="h-[calc(100vh  - 5rem)] flex w-screen">
      <div className="flex-1">
        <JobsPosted />
      </div>
      <div className="flex-1">
        <JobForm />
      </div>
    </div>
  );
};

export default EmployerHome;
