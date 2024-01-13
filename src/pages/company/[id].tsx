import type { NextPage } from "next";
import type { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type ParsedUrlQuery } from "querystring";
import React from "react";
import AddReviewModal from "~/components/AddReviewModal";
import CompanyPreview from "~/components/CompanyPreview";
import ErrorSpan from "~/components/ErrorSpan";
import Header from "~/components/Header";
import Reviews from "~/components/Reviews";
import { api } from "~/utils/api";
interface ExtendedQuery extends ParsedUrlQuery {
  id: string;
}
const Company: React.FC<{ id: string; user: User }> = ({ id, user }) => {
  const companyQuery = api.company.getById.useQuery({ id });
  if (companyQuery.isLoading) {
    return <div>Loading</div>;
  }
  if (companyQuery.isError) {
    return <ErrorSpan message={companyQuery.error.message} />;
  }
  const company = companyQuery.data;

  if (!company) {
    return <ErrorSpan message={"Failed to find company"} />;
  }
  const isStudent = user.role === "student";
  return (
    <div className="h-[calc(100vh-5rem)] w-screen">
      <Header user={user} search={false} />
      <div className="flex ">
        <div className="flex-1 p-4">
          <CompanyPreview company={company} />
        </div>
        <div className="flex-1 p-4">
          <div className="overflow-y-auto text-3xl font-bold">Reviews</div>
          <Reviews companyId={company.id} />
          {isStudent && <AddReviewModal companyId={company.id} />}
        </div>
      </div>
    </div>
  );
};

const CompanyWrapper: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as ExtendedQuery;
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>loading...</div>;
  }
  if (status === "unauthenticated" || !session) {
    return <div>you have to login...</div>;
  }
  return (
    <>
      <Company id={id} user={session.user} />
    </>
  );
};

export default CompanyWrapper;
