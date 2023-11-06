"use client";
import { Text, VStack } from "@chakra-ui/react";

import RefreshPageButton from "@/app/_components/refresh-page-button";
import { ErrorViewComponentProps } from "@/app/types";
import SignOutButton from "@/app/watch/[[...channels]]/_components/sign-out-button";

const UnauthorizedView = ({ message, status }: ErrorViewComponentProps) => {
  return (
    <VStack>
      <Text>Error: {status}</Text>
      <Text>{message}</Text>
      <VStack>
        <RefreshPageButton />
        <Text>Or</Text>
        <SignOutButton />
      </VStack>
    </VStack>
  );
};

export default UnauthorizedView;
