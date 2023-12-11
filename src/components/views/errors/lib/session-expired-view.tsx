import { Text, VStack } from "@chakra-ui/react";

import { ErrorViewComponentProps } from "@/types";

const SessionExpiredView = ({ message, status }: ErrorViewComponentProps) => {
  return (
    <VStack>
      <Text>Error: {status}</Text>
      <Text>{message}</Text>
    </VStack>
  );
};

export default SessionExpiredView;
