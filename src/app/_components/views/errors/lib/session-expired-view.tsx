"use client";

import { ErrorViewComponentProps } from "@/app/types";

const SessionExpiredView = ({ message, status }: ErrorViewComponentProps) => {
  return (
    <div className={"flex flex-col items-center justify-center"}>
      <p>Error: {status}</p>
      <p>{message}</p>
    </div>
  );
};

export default SessionExpiredView;
