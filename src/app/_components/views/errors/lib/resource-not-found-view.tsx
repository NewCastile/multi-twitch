"use client";

import RefreshPageButton from "@/app/_components/refresh-page-button";
import { ErrorViewComponentProps } from "@/app/types";
import SignOutButton from "@/app/watch/[[...channels]]/_components/sign-out-button";

const ResourceNotFoundView = ({ message, status, statusText }: ErrorViewComponentProps) => {
  return (
    <div className={"flex flex-col items-center justify-center"}>
      <p>
        Error{` ${status}`}: {statusText}
      </p>
      <p>{message}</p>
      <div className={"flex flex-col items-center justify-center"}>
        <p>Please</p>
        <RefreshPageButton />
        <p>Or</p>
        <SignOutButton />
      </div>
    </div>
  );
};

export default ResourceNotFoundView;
