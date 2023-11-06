"use client";

import { useDispatch } from "react-redux";

import { setAccessToken } from "@/app/store/access-token-slice";
import { BroadcastsState, setBroadcasts } from "@/app/store/broadcasts-slice";
import { loadFollowedChannels, loadFollowedStreams } from "@/app/store/followed-slice";
import { setSessionToken } from "@/app/store/session-token-slice";
import { FollowedChannel, FollowedStream } from "@/app/types";

const AppPreloader = ({
  sessionToken,
  accessToken,
  refreshToken,
  screenBroadcasts,
  followedChannels,
  followedStreams,
}: {
  sessionToken: string;
  accessToken: string;
  refreshToken: string;
  screenBroadcasts: BroadcastsState["broadcasts"];
  followedChannels: Array<FollowedStream | FollowedChannel>;
  followedStreams: Array<FollowedStream>;
}) => {
  const dispatch = useDispatch();

  dispatch(setSessionToken(sessionToken));
  dispatch(setAccessToken({ accessToken, refreshToken }));
  dispatch(setBroadcasts(screenBroadcasts));
  dispatch(loadFollowedChannels(followedChannels));
  dispatch(loadFollowedStreams(followedStreams));

  return <></>;
};

export default AppPreloader;
