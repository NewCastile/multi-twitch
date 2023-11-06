"use client";

import { useEffect } from "react";

import UnexpectedErrorView from "../../_components/views/errors/lib/unexpected-error";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return <UnexpectedErrorView {...{ error, reset }} />;
}
