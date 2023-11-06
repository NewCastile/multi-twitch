"use client";
import { Button, ButtonProps } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

const SignOutButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      type={"button"}
      variant={"monokaiRed"}
      onClick={() =>
        signOut({
          callbackUrl: "/login",
        })
      }
    >
      Log out
    </Button>
  );
};

export default SignOutButton;
