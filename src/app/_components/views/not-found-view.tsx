"use client";

import { Link as ChakraLink, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { signOut, useSession } from "next-auth/react";

const NotFoundView = () => {
  const { status } = useSession();

  if (status === "unauthenticated") signOut({ callbackUrl: "/login" });

  return (
    <VStack align={"center"} color={"whiteAlpha.700"} h={"100vh"} justify={"center"} w={"100vw"}>
      <Text as={"h1"} color={"monokai.bg_contrast"} fontSize={"5xl"} fontWeight={"extrabold"}>
        Page Not Found
      </Text>
      <ChakraLink as={NextLink} color={"whiteAlpha.500"} fontSize={"3xl"} href={"/"}>
        Return to the initial page
      </ChakraLink>
    </VStack>
  );
};

export default NotFoundView;
