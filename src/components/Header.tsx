import React from "react";
import { FaHome, FaUserCircle } from "react-icons/fa";
import Search from "./Search";
import Link from "next/link";
import { type User } from "next-auth";

const Header: React.FC<{ search: boolean; user: User }> = ({
  search,
  user,
}) => {
  const isStudent = user?.role === "student";
  return (
    <div className="bg-secondary flex h-20 w-screen items-center justify-between px-4">
      <Link href={"/"}>
        <FaHome className="text-3xl text-primary" />
      </Link>
      {search && (
        <div className="m-2 basis-1/5 ">
          <Search />
        </div>
      )}
      <Link
        href={isStudent ? `/profile/${user.id}` : `/company/${user.company_id}`}
      >
        <FaUserCircle className="text-3xl text-primary" />
      </Link>
    </div>
  );
};

export default Header;
