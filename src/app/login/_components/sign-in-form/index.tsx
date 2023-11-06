"use client";
import { ClientSafeProvider } from "next-auth/react";

import SignInButton from "./sign-in-button";
import SignInCard from "./sign-in-card";

const SignInForm = ({ provider }: { provider: ClientSafeProvider }) => {
  return (
    <SignInCard>
      <SignInButton provider={provider} />
    </SignInCard>
  );
};

export default SignInForm;
