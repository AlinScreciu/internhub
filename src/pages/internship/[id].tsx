import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type ParsedUrlQuery } from "querystring";
import React from "react";
import Header from "~/components/Header";
import StudentInternship from "~/components/StudentInternship";
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
      <Header id={session.user.id} search={false} />
      {session.user.role === "student" && <StudentInternship id={query.id} />}
    </div>
  );
};

export default Internship;
