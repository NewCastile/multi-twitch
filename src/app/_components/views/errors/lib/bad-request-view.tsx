"use client";
import { Text, VStack } from "@chakra-ui/react";

import RefreshPageButton from "@/app/_components/refresh-page-button";
import { ErrorViewComponentProps } from "@/app/types";

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
