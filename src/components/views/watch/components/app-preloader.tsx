import { useDispatch } from "react-redux";

import { setAccessToken } from "@/store/access-token-slice";
import { BroadcastsState, setBroadcasts } from "@/store/broadcasts-slice";
import { loadFollowedChannels, loadFollowedStreams } from "@/store/followed-slice";
import { setSessionToken } from "@/store/session-token-slice";
import { FollowedChannel, FollowedStream } from "@/types";

const AppPreloader = ({
  sessionToken,
  accessToken,
  refreshToken,
  screenBroadcasts,
  followedChannels,
  followedStreams,
  children,
}: {
  sessionToken: string;
  accessToken: string;
  refreshToken: string;
  screenBroadcasts: BroadcastsState["broadcasts"];
  followedChannels: Array<FollowedStream | FollowedChannel>;
  followedStreams: Array<FollowedStream>;
  children: React.ReactNode | Array<React.ReactNode>;
}) => {
  const dispatch = useDispatch();

  dispatch(setSessionToken(sessionToken));
  dispatch(setAccessToken({ accessToken, refreshToken }));
  dispatch(setBroadcasts(screenBroadcasts));
  dispatch(loadFollowedChannels(followedChannels));
  dispatch(loadFollowedStreams(followedStreams));

  return <>{children}</>;
};

export default AppPreloader;
