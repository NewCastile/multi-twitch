"use client";

import { UnexpectedErrorProps } from "@/app/types";

const UnexpectedError = ({ error, reset }: UnexpectedErrorProps) => {
  return (
    <div className={"flex flex-col items-center justify-center"}>
      <p>
        {error.name}: {error.message}
      </p>
      <button className={"btn-md btn-monokai-green"} onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
};

export default UnexpectedError;
