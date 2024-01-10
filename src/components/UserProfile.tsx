import { type User } from "@prisma/client";
import React from "react";

const UserProfile: React.FC<{
  user: User;
}> = ({ user }) => {
  return (
    <div>
      {user.name}
      profile card
    </div>
  );
};

export default UserProfile;
