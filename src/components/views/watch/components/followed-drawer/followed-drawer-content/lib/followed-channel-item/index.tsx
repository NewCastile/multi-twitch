import { HStack, Text, VStack } from "@chakra-ui/react";

import { FollowedChannelItemProps } from "@/types";

import AddBroadcastLink from "../../../../shared/add-broadcast-link";
import SelectBroadcastButton from "../../../../shared/select-broadcast-button";

import { getFollowAge } from "./follow-age";

const FollowedChannelItem = ({
  followedChannel,
  isSelected,
  isOnScreen,
  onClickHandler,
}: FollowedChannelItemProps) => {
  return (
    <HStack align={"center"} as={"li"} justify={"space-between"} w={"full"}>
      <VStack align={"left"} justify={"center"} w={"full"}>
        <HStack justify={"start"} w={"full"}>
          {!isOnScreen && <SelectBroadcastButton {...{ isSelected, onClickHandler, size: "xs" }} />}
          <Text color={"monokai.yellow"} maxW={"25ch"}>
            {followedChannel.broadcaster_name}
          </Text>
        </HStack>
        <Text color={"whiteAlpha.400"} fontSize={"xs"} fontWeight={"bold"}>
          follow age: {getFollowAge(followedChannel.followed_at)}
        </Text>
      </VStack>
      {!isOnScreen && (
        <AddBroadcastLink iconOnly broadcasterLogin={followedChannel.broadcaster_login} />
      )}
    </HStack>
  );
};

export default FollowedChannelItem;
