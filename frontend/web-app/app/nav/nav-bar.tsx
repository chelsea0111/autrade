"use client";
import React from "react";
import Search from "./search";
import Logo from "./logo";
import LoginButton from "./login-button";
import { UserActions } from "./user-actions";
import { useSession } from "next-auth/react";

const NavBar = () => {
  // const user = await getCurrentUser();
  const session = useSession();
  // const user = session.data?.user;

  return (
    <header
      className="
      sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md
    "
    >
      <Logo />
      <Search />
      {session.data?.user ? (
        <UserActions user={session.data?.user} />
      ) : (
        <LoginButton />
      )}
    </header>
  );
};

export default NavBar;
