"use client";
import { Button, Text, VStack } from "@chakra-ui/react";

import { UnexpectedErrorProps } from "@/app/types";

const UnexpectedError = ({ error, reset }: UnexpectedErrorProps) => {
  return (
    <VStack>
      <Text>
        {error.name}: {error.message}
      </Text>
      <Button variant={"monokaiGreen"} onClick={() => reset()}>
        Try again
      </Button>
    </VStack>
  );
};

export default UnexpectedError;
