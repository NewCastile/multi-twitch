import { Button, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const NotFoundView = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") signOut({ callbackUrl: "/" });

  return (
    <VStack
      align={"center"}
      bg={"monokai.bg"}
      color={"whiteAlpha.700"}
      h={"100vh"}
      justify={"center"}
      w={"100vw"}
    >
      <Text as={"h1"} color={"monokai.bg_contrast"} fontSize={"5xl"} fontWeight={"extrabold"}>
        Page Not Found
      </Text>
      <Button fontSize={"xl"} variant={"monokaiViolet"} onClick={() => router.back()}>
        Go back
      </Button>
      <Text as={"h2"} color={"monokai.bg_contrast"} fontSize={"2xl"} fontWeight={"extrabold"}>
        Or
      </Text>
      <Button fontSize={"xl"} variant={"monokaiGreen"} onClick={() => router.push("/")}>
        Return to the initial page
      </Button>
    </VStack>
  );
};

export default NotFoundView;
