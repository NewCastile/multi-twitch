"use client";

import { Box, HStack, Text, VStack } from "@chakra-ui/react";

import SignOutButton from "@/app/watch/[[...channels]]/_components/sign-out-button";

export default function WatchLayout({ children }: { children: React.ReactNode }) {
  return (
    <VStack
      align={"center"}
      bg={"monokai.bg"}
      color={"monokai.white"}
      fontSize={"sm"}
      justify={"start"}
      maxH={"100vh"}
      minH={"100vh"}
      overflow={"hidden"}
      w={"full"}
    >
      <HStack
        bg={"monokai.bg_contrast"}
        borderTop={"8px"}
        borderTopColor={"monokai.orange"}
        justify={"space-between"}
        px={"5"}
        py={"3"}
        w={"full"}
      >
        <Box>
          <Text
            casing={"uppercase"}
            color={"monokai.white"}
            fontFamily={"monospace"}
            fontSize={"3xl"}
            fontWeight={"black"}
          >
            My Multi-Twitch
          </Text>
        </Box>
        <SignOutButton fontSize={"md"} fontWeight={"extrabold"} size={"sm"} />
      </HStack>
      {children}
    </VStack>
  );
}
