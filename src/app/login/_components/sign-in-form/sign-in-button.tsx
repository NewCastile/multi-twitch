"use client";
import { ClientSafeProvider, signIn } from "next-auth/react";

const SignInButton = ({ provider }: { provider: ClientSafeProvider }) => {
  return (
    <button
      className={"btn-md btn-monokai-violet mt-3 text-2xl"}
      onClick={(e) => {
        e.preventDefault();
        signIn(provider.id, {
          callbackUrl: "/watch/knekro/alimentacionchino/jujalag/zackrawrr/werlyb",
        });
      }}
    >
      Twitch
    </button>
  );
};

export default SignInButton;
