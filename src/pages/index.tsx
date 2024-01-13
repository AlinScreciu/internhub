import { type NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import React from "react";
import EmployerHome from "~/components/EmployerHome";
import Header from "~/components/Header";
import StudentHome from "~/components/StudentHome";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Loading</div>;
  }
  if (status === "unauthenticated" || !session?.user || !session) {
    return (
      <div>
        {" "}
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      </div>
    );
  }

  const isEmployer = session?.user.role === "employer";
  const isStudent = session?.user.role === "student";
  return (
    <div className="h-[calc(100vh-5rem)] w-screen">
      <Header search user={session.user} />
      {isEmployer && <EmployerHome />}
      {isStudent && <StudentHome />}
    </div>
  );
};
export default Home;
