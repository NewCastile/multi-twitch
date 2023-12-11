import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { getServerSession } from "next-auth";
import { ClientSafeProvider, getProviders } from "next-auth/react";

import LoginView from "@/components/views/login/login-view";
import { INITIAL_PAGE_ROUTE } from "@/constants";

import { authOptions } from "./api/auth/[...nextauth]";

interface PageProps {
  provider: ClientSafeProvider | undefined;
}

export const getServerSideProps = (async (context) => {
  const providers = await getProviders();
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: INITIAL_PAGE_ROUTE,
        permanent: true,
      },
    };
  }

  return { props: { provider: providers?.twitch } };
}) satisfies GetServerSideProps<PageProps>;

const LoginPage = ({ provider }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Login - My Multi-Twitch</title>
      </Head>
      <LoginView {...{ provider }} />
    </>
  );
};

export default LoginPage;
