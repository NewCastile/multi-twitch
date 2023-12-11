import { HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";

import { useAppSelector } from "@/store";
import { BroadcasterBasicInfo } from "@/types";

import RemoveBroadcastLink from "../../components/shared/remove-broadcast-link";

import TwitchChat from "./twitch-chat";

const ChatTabs = () => {
  const broadcasters = useAppSelector((state) => state.broadcasts.broadcasts);

  return (
    <>
      {broadcasters.length && (
        <VStack position={"sticky"} top={"0"} w={"30vw"}>
          <Tabs h={"full"} size={"sm"} variant={"monokai"} w={"full"}>
            <TabList
              borderBottomWidth={"medium"}
              display={"grid"}
              gap={"2"}
              gridTemplateColumns={"repeat(3, 1fr)"}
            >
              {broadcasters.map((broadcaster, broadcasterIdx) => {
                return (
                  <Tab key={broadcasterIdx}>
                    <BroadcasterChatTab {...broadcaster} />
                  </Tab>
                );
              })}
            </TabList>
            <TabPanels overflowX={"auto"} overflowY={"hidden"}>
              {broadcasters.map((broadcaster, broadcasterIdx) => {
                return (
                  <TabPanel
                    key={broadcasterIdx}
                    alignItems={"center"}
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <TwitchChat broadcasterLogin={broadcaster.broadcaster_login} />
                  </TabPanel>
                );
              })}
            </TabPanels>
          </Tabs>
        </VStack>
      )}
    </>
  );
};

const BroadcasterChatTab = ({ broadcaster_name, broadcaster_login }: BroadcasterBasicInfo) => {
  return (
    <HStack fontSize={"xs"} spacing={"2"}>
      <Text cursor={"pointer"} maxW={"18ch"} textTransform={"uppercase"} w={"full"}>
        {broadcaster_name ?? broadcaster_login}
      </Text>
      <RemoveBroadcastLink broadcasterLogin={broadcaster_login} />
    </HStack>
  );
};

export default ChatTabs;
