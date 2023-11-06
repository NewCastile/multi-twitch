"use client";
import { Text, VStack } from "@chakra-ui/react";

import { ErrorViewComponentProps } from "@/app/types";
import SignOutButton from "@/app/watch/[[...channels]]/_components/sign-out-button";

const DefaultView = ({ message, status, statusText, children }: ErrorViewComponentProps) => {
  return (
    <VStack>
      <Text>
        Error{` ${status}`}: {statusText}
      </Text>
      <Text>{message ?? "Sorry... something went wrong :'c"}</Text>
      <SignOutButton />
      {children}
    </VStack>
  );
};

export default DefaultView;
