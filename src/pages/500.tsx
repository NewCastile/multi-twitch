import Head from "next/head";

import ServerErrorView from "@/components/views/server-error-view";

const Custom500 = () => {
  return (
    <>
      <Head>
        <title>Server Error</title>
      </Head>
      <ServerErrorView />
    </>
  );
};

export default Custom500;
