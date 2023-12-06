"use client";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <button
      className={"btn-md btn-monokai-red"}
      onClick={(e) => {
        e.preventDefault();
        signOut({
          callbackUrl: "/login",
        });
      }}
    >
      Log out
    </button>
  );
};

export default SignOutButton;
