import "../../globals.css";

import { redirect } from "next/navigation";

import ErrorView from "@/app/_components/views/errors";
import { MAX_BROADCASTS_NUMBER } from "@/app/constants";
import {
  fetchAccountBySessionToken,
  fetchSessionToken,
  fetchUserFollowedChannels,
  fetchUserFollowedStreams,
} from "@/app/helpers/fetchers";
import { FollowedChannel, FollowedStream } from "@/app/types";
import AppPreloader from "@/app/watch/[[...channels]]/_components/app-preloader";

import HomeView from "./_components/views/home-view";
import NoChannelsView from "./_components/views/no-channels-view";

export const metadata = {
  title: "My Multi-Twitch - Watch",
  description: "Multi-Twitch app made by NewCastile",
};

export default async function Watch({ params }: { params: { channels?: string[] } }) {
  const channels = params.channels ?? [];
  const hasRepeatedChannels = channels.some(
    (channel, channelIdx) => channels.indexOf(channel, channelIdx + 1) !== -1,
  );
  const maxReached = channels.length > MAX_BROADCASTS_NUMBER;

  const channelsArray = Array.from(new Set(channels.slice(0, MAX_BROADCASTS_NUMBER)));

  if (hasRepeatedChannels || maxReached) {
    const newUrl = `/watch/${channelsArray.join("/")}`;

    redirect(newUrl);
  }

  const screenBroadcasts = channelsArray.length
    ? channels.map((channel) => ({
        broadcaster_login: channel.toLowerCase(),
        broadcaster_name: channel,
      }))
    : [];

  const fetchSessionTokenResponse = await fetchSessionToken();

  if ("message" in fetchSessionTokenResponse) {
    return <ErrorView {...fetchSessionTokenResponse} />;
  }

  const {
    session: { sessionToken },
  } = fetchSessionTokenResponse;

  const fetchAccountResponse = await fetchAccountBySessionToken(sessionToken);

  if ("message" in fetchAccountResponse) {
    return <ErrorView {...fetchAccountResponse} />;
  }

  const {
    providerAccountId: userChannelId,
    access_token: accessToken,
    refresh_token: refreshToken,
  } = fetchAccountResponse;

  const followedChannelsResponse = await fetchUserFollowedChannels(userChannelId, accessToken);

  if ("message" in followedChannelsResponse) {
    return <ErrorView {...followedChannelsResponse} />;
  }

  const followedStreamsResponse = await fetchUserFollowedStreams(userChannelId, accessToken);

  if ("message" in followedStreamsResponse) {
    return <ErrorView {...followedStreamsResponse} />;
  }

  //
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

  return (
    <>
      <AppPreloader
        {...{
          screenBroadcasts,
          sessionToken,
          accessToken,
          refreshToken,
          followedChannels: followedChannelsData,
          followedStreams: followedStreamsResponse.data,
        }}
      />
      {channels.length ? <HomeView /> : <NoChannelsView />}
    </>
  );
}
