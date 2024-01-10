import { type NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import React from "react";
import EmployerHome from "~/components/EmployerHome";
import Header from "~/components/Header";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Loading</div>;
  }
  if (!session && status === "unauthenticated") {
    return( <div>  <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>);
  }
  const isEmployer = session?.user.role === "employer";
  return (
    <div className="h-screen w-screen">
      <Header search />
      {isEmployer && <EmployerHome />}
    </div>
  );
};

export default Home;
