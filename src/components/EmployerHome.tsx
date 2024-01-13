import React from "react";
import JobsPosted from "./JobsPosted";
import JobForm from "./JobForm";

const EmployerHome = () => {
  return (
    <div className="h-[calc(100vh  - 5rem)] flex w-screen">
      <div className=" w-1/3 bg-gray-50  flex flex-col justify-center ">
        <div className="flex justify-center mb-8 mt-8 text-4xl font-bold text-primary">
          Jobs Posted
        </div>
        <div className="flex justify-center ">
          <JobsPosted />
        </div>
      </div>
      <div className="w-[1px] bg-black mx-1"></div>
      <div className=" w-2/3 flex justify-center">
        <JobForm />
      </div>
    </div>
  );
};

export default EmployerHome;
