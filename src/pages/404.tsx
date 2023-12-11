import Head from "next/head";

import NotFoundView from "@/components/views/not-found-view";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <NotFoundView />
    </>
  );
};

export default Custom404;
