"use client";

import { ErrorViewComponentProps } from "@/app/types";
import SignOutButton from "@/app/watch/[[...channels]]/_components/sign-out-button";

const DefaultView = ({ message, status, statusText, children }: ErrorViewComponentProps) => {
  return (
    <div className={"flex flex-col items-center justify-center"}>
      <p>
        Error{` ${status}`}: {statusText}
      </p>
      <p>{message ?? "Sorry... something went wrong :'c"}</p>
      <SignOutButton />
      {children}
    </div>
  );
};

export default DefaultView;
