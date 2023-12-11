import { Text, VStack } from "@chakra-ui/react";

import { ErrorViewComponentProps } from "@/types";

import SignOutButton from "../../watch/components/shared/sign-out-button";

import RefreshPageButton from "./shared/refresh-page-button";

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
