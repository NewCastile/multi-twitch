import { Link as ChakraLink, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { signOut, useSession } from "next-auth/react";

const ServerErrorView = () => {
  const { status } = useSession();

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
        Error 500 - Server-side error ocurred
      </Text>
      <ChakraLink as={NextLink} color={"whiteAlpha.500"} fontSize={"3xl"} href={"/"}>
        Return to the initial page
      </ChakraLink>
    </VStack>
  );
};

export default ServerErrorView;
