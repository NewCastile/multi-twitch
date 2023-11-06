"use client";
import { HStack, StackDivider, Text, VStack } from "@chakra-ui/react";

import FollowedDrawer from "../followed-drawer";
import SearchDrawer from "../search-drawer";

const NoChannelsView = () => {
  return (
    <VStack mt={"10"}>
      <Text as={"h1"} color={"monokai.bg_contrast"} fontSize={"3xl"} fontWeight={"extrabold"}>
        Look up for some twitch channels c:
      </Text>
      <HStack
        divider={
          <StackDivider bgColor={"monokai.bg_contrast"} borderColor={"transparent"} width={"3px"} />
        }
        spacing={"4"}
      >
        <SearchDrawer />
        <FollowedDrawer />
      </HStack>
    </VStack>
  );
};

export default NoChannelsView;
