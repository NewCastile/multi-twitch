"use client";
import { AddIcon } from "@chakra-ui/icons";
import { Center, Link as ChakraLink, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { useAppSelector } from "@/app/store";

const AddBroadcastLink = ({
  broadcasterLogin,
  iconOnly = false,
}: {
  broadcasterLogin: string;
  iconOnly?: boolean;
}) => {
  const maxReached = useAppSelector((state) => state.broadcasts.maxReached);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = `${pathname}?${searchParams}`;

  const { broadcasts } = useAppSelector((state) => state.broadcasts);
  const channels = broadcasts.map((broadcast) => broadcast.broadcaster_login);
  const newChannels = channels.join("/").concat(`/${broadcasterLogin}`);
  const isNewChannel = channels.every((channel) => channel !== broadcasterLogin);

  const newUrl = `/watch/${newChannels}`;
  const linkHref = isNewChannel ? newUrl : currentUrl;

  if (maxReached) return null;

  return (
    <Center
      _hover={{
        bg: "whiteAlpha.200",
        transitionDuration: "0.2s",
        transitionTimingFunction: "ease-in-out",
      }}
      borderRadius={"md"}
      px={"2"}
      py={"1"}
    >
      <ChakraLink as={NextLink} color={"whiteAlpha.600"} href={linkHref}>
        {iconOnly ? (
          <AddIcon />
        ) : (
          <Text>
            Add <AddIcon />
          </Text>
        )}
      </ChakraLink>
    </Center>
  );
};

export default AddBroadcastLink;
