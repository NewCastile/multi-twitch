"use client";
import { Button } from "@chakra-ui/react";
import { ClientSafeProvider, signIn } from "next-auth/react";

const SignInButton = ({ provider }: { provider: ClientSafeProvider }) => {
  return (
    <Button
      fontSize={"2xl"}
      mt={"3"}
      type={"button"}
      variant={"monokaiViolet"}
      onClick={() =>
        signIn(provider.id, {
          callbackUrl: "/watch/knekro/alimentacionchino/jujalag/zackrawrr/werlyb",
        })
      }
    >
      Twitch
    </Button>
  );
};

export default SignInButton;
