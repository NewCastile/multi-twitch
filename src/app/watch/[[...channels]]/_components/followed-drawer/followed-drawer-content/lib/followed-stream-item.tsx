"use client";
import { Image as ChakraImage, Circle, HStack, Text, VStack } from "@chakra-ui/react";

import { FollowedStreamItemProps } from "@/app/types";

import AddBroadcastLink from "../../../shared/add-broadcast-link";
import SelectBroadcastButton from "../../../shared/select-broadcast-button";

const FollowedStreamItem = ({
  followedStream,
  isSelected,
  isOnScreen,
  onClickHandler,
}: FollowedStreamItemProps) => {
  const { thumbnail_url, user_name, user_login, title, game_name } = followedStream;

  return (
    <VStack as={"li"} fontSize={"xs"} fontWeight={"medium"} textTransform={"uppercase"} w={"full"}>
      <HStack align={"center"} justify={"space-between"} w={"full"}>
        {!isOnScreen && <SelectBroadcastButton {...{ isSelected, onClickHandler, size: "xs" }} />}
        <Text
          casing={"none"}
          color={"inherit"}
          fontSize={"sm"}
          fontWeight={"black"}
          textAlign={"justify"}
          w={"full"}
        >
          {user_name}
        </Text>
        {!isOnScreen && <AddBroadcastLink iconOnly broadcasterLogin={user_login} />}
      </HStack>
      <ChakraImage
        alt={"profile-picture"}
        src={thumbnail_url.replace("{width}", "200").replace("{height}", "112")}
      />
      <Text color={"monokai.green.primary"} w={"full"}>
        {title}
      </Text>
      <HStack w={"full"}>
        <Circle bg={"red"} display={"inline-block"} mr={"2"} size={"10px"} />
        <Text color={"monokai.yellow"} textAlign={"left"} w={"full"}>
          {game_name}
        </Text>
      </HStack>
    </VStack>
  );
};

export default FollowedStreamItem;
