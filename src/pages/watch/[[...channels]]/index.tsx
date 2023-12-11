import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

import ErrorView from "@/components/views/errors";
import AppPreloader from "@/components/views/watch/components/app-preloader";
import WatchPageLayout from "@/components/views/watch/components/shared/layout";
import HomeView from "@/components/views/watch/home-view";
import NoChannelsView from "@/components/views/watch/no-channels-view";
import { MAX_BROADCASTS_NUMBER } from "@/constants";
import {
  fetchAccountBySessionToken,
  fetchSessionToken,
  fetchUserFollowedChannels,
  fetchUserFollowedStreams,
} from "@/helpers/fetchers";
import { ApiErrorResponse, FollowedChannel, FollowedStream, WatchPageProps } from "@/types";

export const getServerSideProps = (async (context) => {
  if (!context.params) return { props: { message: "Missing query params", status: 500 } };

  const channels =
    context.params.channels && Array.isArray(context.params.channels)
      ? context.params.channels
      : [];
  const hasRepeatedChannels = channels.some(
    (channel, channelIdx) => channels.indexOf(channel, channelIdx + 1) !== -1,
  );

  const maxReached = channels.length > MAX_BROADCASTS_NUMBER;

  const channelsArray = Array.from(new Set(channels.slice(0, MAX_BROADCASTS_NUMBER)));

  if (hasRepeatedChannels || maxReached) {
    const newUrl = `/watch/${channelsArray.join("/")}`;

    return {
      redirect: {
        destination: newUrl,
        permanent: false,
      },
    };
  }

  const screenBroadcasts = channelsArray.length
    ? channels.map((channel) => ({
        broadcaster_login: channel.toLowerCase(),
        broadcaster_name: channel,
      }))
    : [];

  const fetchSessionTokenResponse = await fetchSessionToken(context);

  if ("message" in fetchSessionTokenResponse) {
    return { props: fetchSessionTokenResponse };
  }

  const {
    session: { sessionToken },
  } = fetchSessionTokenResponse;

  const fetchAccountResponse = await fetchAccountBySessionToken(sessionToken);

  if ("message" in fetchAccountResponse) {
    return { props: fetchAccountResponse };
  }

  const {
    providerAccountId: userChannelId,
    access_token: accessToken,
    refresh_token: refreshToken,
  } = fetchAccountResponse;

  const followedChannelsResponse = await fetchUserFollowedChannels(userChannelId, accessToken);

  if ("message" in followedChannelsResponse) {
    return { props: followedChannelsResponse };
  }

  const followedStreamsResponse = await fetchUserFollowedStreams(userChannelId, accessToken);

  if ("message" in followedStreamsResponse) {
    return { props: followedStreamsResponse };
  }

  const emptyArray: Array<FollowedStream | FollowedChannel> = [];

  const loginMappedFollowedStreams = followedStreamsResponse.data.map(
    (stream) => stream.user_login,
  );

  const loginFilteredFollowedChannels = followedChannelsResponse.data.filter(
    (channel) => !loginMappedFollowedStreams.includes(channel.broadcaster_login),
  );

  const followedChannelsData: Array<FollowedStream | FollowedChannel> = emptyArray
    .concat(followedStreamsResponse.data)
    .concat(loginFilteredFollowedChannels);

  const _props: WatchPageProps = {
    screenBroadcasts,
    sessionToken,
    accessToken,
    refreshToken,
    followedChannels: followedChannelsData,
    followedStreams: followedStreamsResponse.data,
    isChannelsEmpty: screenBroadcasts.length === 0,
  };

  return {
    props: _props,
  };
}) satisfies GetServerSideProps<WatchPageProps | ApiErrorResponse>;

const WatchPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if ("message" in props) {
    const { message, status, statusText } = props;

    return (
      <>
        <Head>
          <title>Error</title>
        </Head>
        <WatchPageLayout>
          <ErrorView {...{ message, status, statusText }} />;
        </WatchPageLayout>
      </>
    );
  } else {
    const {
      screenBroadcasts,
      followedChannels,
      followedStreams,
      accessToken,
      refreshToken,
      sessionToken,
      isChannelsEmpty,
    } = props;

    return (
      <>
        <Head>
          <title>Watch - My Multi-Twitch</title>
        </Head>
        <WatchPageLayout>
          <AppPreloader
            {...{
              screenBroadcasts,
              sessionToken,
              accessToken,
              refreshToken,
              followedChannels,
              followedStreams,
            }}
          >
            {isChannelsEmpty ? <NoChannelsView /> : <HomeView />}
          </AppPreloader>
        </WatchPageLayout>
      </>
    );
  }
};

export default WatchPage;
