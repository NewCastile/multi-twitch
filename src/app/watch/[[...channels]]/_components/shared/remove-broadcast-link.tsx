"use client";
import { CloseIcon } from "@chakra-ui/icons";
import { Center, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

import { useAppSelector } from "@/app/store";

const RemoveBroadcastLink = ({ broadcasterLogin }: { broadcasterLogin: string }) => {
  const { broadcasts } = useAppSelector((state) => state.broadcasts);
  const channels = broadcasts.map((broadcast) => broadcast.broadcaster_login);
  const newChannels = channels.filter((channel) => channel !== broadcasterLogin).join("/");
  const linkHref = `/watch/${newChannels}`;

  return (
    <Center
      _hover={{
        bg: "whiteAlpha.200",
        transitionDuration: "0.2s",
        transitionTimingFunction: "ease-in-out",
      }}
      borderRadius={"md"}
      h={"full"}
      px={"2"}
      py={"1"}
    >
      <ChakraLink as={NextLink} color={"inherit"} href={linkHref}>
        <CloseIcon boxSize={"3"} />
      </ChakraLink>
    </Center>
  );
};

export default RemoveBroadcastLink;
