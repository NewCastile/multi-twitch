"use client";
import { Image as ChakraImage, Circle, HStack, Text, VStack } from "@chakra-ui/react";

import { SearchChannel } from "@/app/types";

import AddBroadcastLink from "../../../shared/add-broadcast-link";

const SearchChannelResultItem = ({ matchingChannel }: { matchingChannel: SearchChannel }) => {
  const { broadcaster_login, display_name, is_live, game_name, title, thumbnail_url } =
    matchingChannel;

  return (
    <VStack as={"li"} fontSize={"xs"} fontWeight={"medium"} textTransform={"uppercase"} w={"full"}>
      <HStack align={"center"} justify={"space-between"} w={"full"}>
        <HStack spacing={"6"} w={"full"}>
          <ChakraImage
            alt={"profile-picture"}
            borderRadius={"50%"}
            height={50}
            src={thumbnail_url}
            width={50}
          />
          <VStack align={"start"} justify={"center"} w={"18ch"}>
            <Text
              casing={"none"}
              color={is_live ? "inherit" : "whiteAlpha.400"}
              fontSize={"sm"}
              fontWeight={"black"}
              textAlign={"justify"}
              w={"full"}
            >
              {display_name}
            </Text>
            {is_live && (
              <Text color={"monokai.green.primary"} w={"full"}>
                {title}
              </Text>
            )}
            <HStack w={"full"}>
              <Circle
                bg={is_live ? "red" : "whiteAlpha.400"}
                display={"inline-block"}
                mr={"2"}
                size={"10px"}
              />
              <Text
                color={is_live ? "monokai.yellow" : "whiteAlpha.400"}
                textAlign={"left"}
                w={"full"}
              >
                {is_live ? game_name : "Offline"}
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <AddBroadcastLink iconOnly broadcasterLogin={broadcaster_login} />
      </HStack>
    </VStack>
  );
};

export default SearchChannelResultItem;
