"use client";

import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const RefreshPageButton = () => {
  const router = useRouter();

  return (
    <Button
      color={"monokai.bg_contrast"}
      variant={"monokaiGreen"}
      onClick={() => {
        router.refresh();
      }}
    >
      Refresh
    </Button>
  );
};

export default RefreshPageButton;
