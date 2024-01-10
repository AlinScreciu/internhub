import React from "react";
import EmployerProfile from "~/components/EmployerProfile";
import Header from "~/components/Header";
import UserProfile from "~/components/UserProfile";
import { api } from "~/utils/api";

const Profile = () => {
  const userQuery = api.user.getCurrent.useQuery();
  if (userQuery.isLoading) {
    return <div>loading</div>;
  }
  if (userQuery.isError) {
    return <div>error: {userQuery.error.message}</div>;
  }
  const user = userQuery.data;

  if (!user) {
    return <div>Login required</div>;
  }
  return (
    <div>
      <Header search={false} />
      {user.role === "student" && <UserProfile user={user} />}
      {user.role === "employer" && <EmployerProfile user={user} />}
    </div>
  );
};

export default Profile;
