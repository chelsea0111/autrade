import React from "react";
import Search from "./search";
import Logo from "./logo";
import LoginButton from "./login-button";
import { getCurrentUser } from "../actions/auth-actions";
import { UserActions } from "./user-actions";

const NavBar = async () => {
  const user = await getCurrentUser();
  return (
    <header
      className="
      sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md
    "
    >
      <Logo />
      <Search />
      {user ? <UserActions user={user} /> : <LoginButton />}
    </header>
  );
};

export default NavBar;
