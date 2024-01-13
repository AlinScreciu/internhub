import React from "react";
import JobsPosted from "./JobsPosted";
import JobForm from "./JobForm";

const EmployerHome = () => {
  return (
    <div className="flex h-[calc(100vh-5rem)] w-screen ">
      <div className=" flex w-1/3  flex-col justify-center bg-gray-50 ">
        <div className="mb-8 mt-8 flex justify-center text-4xl font-bold text-primary">
          Jobs Posted
        </div>
        <div className="flex justify-center ">
          <JobsPosted />
        </div>
      </div>
      <div className="mx-1 w-[1px] bg-black"></div>
      <div className=" flex w-2/3 justify-center">
        <JobForm />
      </div>
    </div>
  );
};

export default EmployerHome;
