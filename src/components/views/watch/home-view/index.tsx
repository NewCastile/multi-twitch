import { Link as ChakraLink, HStack, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";

import GithubIcon from "@/components/icons/github-icon";

import ChatTabs from "./lib/chat-tabs";
import StreamsGrid from "./lib/stream-grid";

const HomeView = () => {
  return (
    <VStack
      color={"monokai.white"}
      overflowX={"hidden"}
      overflowY={"auto"}
      spacing={"6"}
      w={"100vw"}
    >
      <HStack align={"start"} justify={"start"} position={"relative"} px={"6"} w={"100vw"}>
        <StreamsGrid />
        <ChatTabs />
      </HStack>
      <HStack color={"monokai.contrast"} fontSize={"lg"} fontWeight={"bold"} py={"4"}>
        <Text>
          Made by{" "}
          <ChakraLink as={NextLink} href={"https://github.com/NewCastile"}>
            NewCastile
          </ChakraLink>
        </Text>
        <GithubIcon />
      </HStack>
    </VStack>
  );
};

export default HomeView;
