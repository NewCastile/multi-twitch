import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { ClientSafeProvider, getProviders } from "next-auth/react";

import LoginView from "@/components/views/login/login-view";

interface PageProps {
  provider: ClientSafeProvider | undefined;
}

export const getServerSideProps = (async (_context) => {
  const providers = await getProviders();

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
