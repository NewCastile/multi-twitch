import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { INITIAL_PAGE_ROUTE } from "@/app/constants";

import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  redirect(INITIAL_PAGE_ROUTE);
}
