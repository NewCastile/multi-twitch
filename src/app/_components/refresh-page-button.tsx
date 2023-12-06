"use client";

import { useRouter } from "next/navigation";

const RefreshPageButton = () => {
  const router = useRouter();

  return (
    <button
      className={"btn-md btn-monokai-green"}
      onClick={() => {
        router.refresh();
      }}
    >
      Refresh
    </button>
  );
};

export default RefreshPageButton;
