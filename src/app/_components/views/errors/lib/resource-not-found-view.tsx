"use client";
import { Text, VStack } from "@chakra-ui/react";

import RefreshPageButton from "@/app/_components/refresh-page-button";
import { ErrorViewComponentProps } from "@/app/types";
import SignOutButton from "@/app/watch/[[...channels]]/_components/sign-out-button";

const ResourceNotFoundView = ({ message, status, statusText }: ErrorViewComponentProps) => {
  return (
    <VStack>
      <Text>
        Error{` ${status}`}: {statusText}
      </Text>
      <Text>{message}</Text>
      <VStack>
        <Text>Please</Text>
        <RefreshPageButton />
        <Text>Or</Text>
        <SignOutButton />
      </VStack>
    </VStack>
  );
};

export default ResourceNotFoundView;
