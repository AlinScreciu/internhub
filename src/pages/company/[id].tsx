import { type NextPage } from "next";
import { useRouter } from "next/router";
import { type ParsedUrlQuery } from "querystring";
import React from "react";
import { api } from "~/utils/api";
interface ExtendedQuery extends ParsedUrlQuery {
  id: string;
}
const Company: NextPage = () => {
  const router = useRouter();
  const query = router.query as ExtendedQuery;
  const companyQuery = api.company.getById.useQuery(query);
  if (companyQuery.isLoading) {
    return <div>Loading</div>;
  }
  if (companyQuery.isError) {
    return <div>{companyQuery.error.message}</div>;
  }
  const company = companyQuery.data;
  return <div>{JSON.stringify(company, null, 4)}</div>;
};

export default Company;
