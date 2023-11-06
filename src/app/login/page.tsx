import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";

import { INITIAL_PAGE_ROUTE } from "@/app/constants";
import SignInForm from "@/app/login/_components/sign-in-form";

import { authOptions } from "../api/auth/[...nextauth]/route";

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
    return providers ? <SignInForm provider={providers.twitch} /> : null;
  }
}
