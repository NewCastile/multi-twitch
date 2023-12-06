"use client";

import { ClientSafeProvider } from "next-auth/react";

import SignInForm from "../sign-in-form";

const LoginView = ({ provider }: { provider: ClientSafeProvider }) => {
  return <SignInForm {...{ provider }} />;
};

export default LoginView;
