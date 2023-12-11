import { Text, VStack } from "@chakra-ui/react";

import { ErrorViewComponentProps } from "@/types";

import RefreshPageButton from "./shared/refresh-page-button";

const BadRequestView = ({ message, status, statusText }: ErrorViewComponentProps) => {
  return (
    <VStack>
      <Text>
        Error{` ${status}`}: {statusText}
      </Text>
      <Text>{message}</Text>
      <VStack>
        <Text>Try refreshing the page</Text>
        <RefreshPageButton />
      </VStack>
    </VStack>
  );
};

export default BadRequestView;
