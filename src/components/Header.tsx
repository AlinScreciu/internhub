import React from "react";
import { FaHome, FaUserCircle } from "react-icons/fa";
import Search from "./Search";
import Link from "next/link";

const Header: React.FC<{ search: boolean, id: string }> = ({ search, id }) => {

  return (
    
    <div className="flex h-20 w-screen items-center justify-between bg-slate-900">
      <Link href={"/"}>
        <FaHome className="ml-4 text-3xl text-primary" />
      </Link>
      {search && <Search />}
      <Link href={`/profile/${id}`}>
        <FaUserCircle className="mr-4 text-3xl text-primary" />
      </Link>
    </div>
  );
};

export default Header;
