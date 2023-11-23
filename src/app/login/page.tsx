import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";

import { INITIAL_PAGE_ROUTE } from "@/app/constants";

import { authOptions } from "../api/auth/[...nextauth]/route";
import AuthProviders, { ChakraProviders } from "../providers";

import LoginView from "./_components/views";

export const metadata = {
  title: "My Multi-Twitch - Login",
  description: "Multi-Twitch app made by NewCastile",
};

export default async function Login() {
  const providers = await getProviders();
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(INITIAL_PAGE_ROUTE);
  } else {
    return providers ? (
      <AuthProviders>
        <ChakraProviders>
          <LoginView provider={providers.twitch} />
        </ChakraProviders>
      </AuthProviders>
    ) : null;
  }
}
