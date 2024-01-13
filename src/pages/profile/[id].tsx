import { api } from "~/utils/api";
import Header from "~/components/Header";
import { useSession } from "next-auth/react";
import { type ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import UserProfile from "~/components/UserProfile";
import { type Session } from "next-auth";
import { type GetServerSideProps } from "next";
import { getServerAuthSession } from "~/server/auth";

interface ExtendedQuery extends ParsedUrlQuery {
  id: string;
}

const Profile: React.FC<{ session: Session }> = ({ session }) => {
  const router = useRouter();
  const query = router.query as ExtendedQuery;

  const userQuery = api.user.getUserById.useQuery(query);

  if (userQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const user = userQuery.data;
  if (!user) return <div> loading</div>;
  const own = query.id === session?.user.id;

  return (
    <div className=" h-[calc(100vh-5rem)] w-screen ">
      {user.role === "student" && <UserProfile user={user} own={own} />}
    </div>
  );
};

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading</div>;
  }
  if (!session?.user || !session) {
    return <>Log in</>;
  }

  return (
    <>
      <Header search={false} user={session.user} />

      <Profile session={session} />
    </>
  );
};

export const getServerSideProps = (async ({ req, res, query }) => {
  const { id } = query as ExtendedQuery;
  const session = await getServerAuthSession({ req, res });
  if (!session?.user || !session.user.company_id) {
    return {
      redirect: {
        destination: "/register",
        permanent: false,
      },
    };
  }
  if (session.user.role === "employer" && session.user.id === id)
    return {
      redirect: {
        destination: `/company/${session.user.company_id}`,
        permanent: true,
      },
    };
  return { props: {} };
}) satisfies GetServerSideProps;
export default ProfilePage;
