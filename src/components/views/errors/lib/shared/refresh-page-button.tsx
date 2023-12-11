import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const RefreshPageButton = () => {
  const router = useRouter();

  return (
    <Button
      color={"monokai.bg_contrast"}
      variant={"monokaiGreen"}
      onClick={() => {
        router.reload();
      }}
    >
      Refresh
    </Button>
  );
};

export default RefreshPageButton;
