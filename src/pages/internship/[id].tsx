import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type ParsedUrlQuery } from "querystring";
import React from "react";
import EmployerInternship from "~/components/EmployerInternship";
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

  if (status === "unauthenticated" || !session?.user || !session) {
    return <>You need to login</>;
  }
  const isStudent = session.user.role === "student";
  const isEmployer = session.user.role === "employer";
  return (
    <div className="w-screen bg-gray-100">
      <Header user={session.user} search={false} />
      {isStudent && <StudentInternship id={query.id} />}
      {isEmployer && <EmployerInternship id={query.id} />}
    </div>
  );
};

export default Internship;
