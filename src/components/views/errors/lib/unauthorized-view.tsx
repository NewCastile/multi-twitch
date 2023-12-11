import { Text, VStack } from "@chakra-ui/react";

import { ErrorViewComponentProps } from "@/types";

import SignOutButton from "../../watch/components/shared/sign-out-button";

import RefreshPageButton from "./shared/refresh-page-button";

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
