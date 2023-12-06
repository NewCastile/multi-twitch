"use client";

import RefreshPageButton from "@/app/_components/refresh-page-button";
import { ErrorViewComponentProps } from "@/app/types";

const BadRequestView = ({ message, status, statusText }: ErrorViewComponentProps) => {
  return (
    <div className={"flex flex-col items-center justify-center"}>
      <p>
        Error{` ${status}`}: {statusText}
      </p>
      <p>{message}</p>
      <div className={"flex flex-col items-center justify-center"}>
        <p>Try refreshing the page</p>
        <RefreshPageButton />
      </div>
    </div>
  );
};

export default BadRequestView;
