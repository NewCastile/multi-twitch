"use client";

import RefreshPageButton from "@/app/_components/refresh-page-button";
import { ErrorViewComponentProps } from "@/app/types";
import SignOutButton from "@/app/watch/[[...channels]]/_components/sign-out-button";

const UnauthorizedView = ({ message, status }: ErrorViewComponentProps) => {
  return (
    <div className={"flex flex-col items-center justify-center"}>
      <p>Error: {status}</p>
      <p>{message}</p>
      <div className={"flex flex-col items-center justify-center"}>
        <RefreshPageButton />
        <p>Or</p>
        <SignOutButton />
      </div>
    </div>
  );
};

export default UnauthorizedView;
