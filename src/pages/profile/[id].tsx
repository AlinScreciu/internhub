import { api } from "~/utils/api";
import Header from "~/components/Header";
import { useSession } from "next-auth/react";
import { type ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import UserProfile from "~/components/UserProfile";
import EmployerProfile from "~/components/EmployerProfile";
import { type Session } from "next-auth";

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
  console.log(user);
  if (!user) return <div> loading</div>;
  const own = query.id === session?.user.id;

  return (
    <div className=" h-[calc(100vh-5rem)] w-screen ">
      <Header search={false} id={query.id} />

      {user.role === "student" && <UserProfile user={user} own={own} />}
      {user.role === "employer" && <EmployerProfile user={user} own={own} />}
    </div>
  );
};

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading</div>;
  }
  if (!session) {
    return <>Log in</>;
  }

  return (
    <>
      <Profile session={session} />
    </>
  );
};

export default ProfilePage;
