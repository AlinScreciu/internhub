import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import Header from "~/components/Header";
import StudentInternship from "~/components/StudentInternship";
import { api } from "~/utils/api";
interface ExtendedQuery extends ParsedUrlQuery {
  id: string;
}
const Internship = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const query = router.query as ExtendedQuery;

  if (status === "loading") {
    return <>loading...</>;
  }

  if (status === "unauthenticated" || !session) {
    return <>You need to login</>;
  }

  return (
    <div className="h-screen w-screen">
      <Header search={false} />
      {session.user.role === "student" && <StudentInternship id={query.id} />}
    </div>
  );
};

export default Internship;
