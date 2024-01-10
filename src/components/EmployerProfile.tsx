import { type User } from "@prisma/client";
import Link from "next/link";
import React from "react";

const EmployerProfile: React.FC<{
  user: User;
}> = ({ user }) => {
  return (
    <div>
      {JSON.stringify(user, null, 4)}
      <Link href={`/company/${user.company_id}`}>Go to company</Link>
    </div>
  );
};

export default EmployerProfile;
