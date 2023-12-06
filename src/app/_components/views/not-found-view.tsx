"use client";

import NextLink from "next/link";
import { signOut, useSession } from "next-auth/react";

const NotFoundView = () => {
  const { status } = useSession();

  if (status === "unauthenticated") signOut({ callbackUrl: "/login" });

  return (
    <div className={"flex h-screen w-screen flex-col items-center justify-center text-gray-400"}>
      <p className={"text-5xl font-extrabold text-monokai-bg-contrast"}>Page Not Found</p>
      <NextLink className={"text-3xl text-gray-400"} href={"/"}>
        Return to the initial page
      </NextLink>
    </div>
  );
};

export default NotFoundView;
