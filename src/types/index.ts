import { ObjectId, WithId } from "mongodb";

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  image: string;
  emailVerified?: boolean;
}

export interface Account {
  _id: ObjectId;
  provider: string;
  type: string;
  providerAccountId: string;
  access_token: string;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  userId: ObjectId;
}

export interface SessionDocument {
  _id: ObjectId;
  sessionToken: string;
  userId: ObjectId;
  expires: Date;
}

export interface FollowedStream {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: Date;
  language: string;
  thumbnail_url: string;
  tag_ids: string[];
  tags: string[];
}

export interface FollowedStreamsResponse {
  data: FollowedStream[];
  pagination: { cursor?: string };
}

export interface SearchChannel {
  broadcaster_language: string;
  broadcaster_login: string;
  display_name: string;
  game_id: string;
  game_name: string;
  id: string;
  is_live: boolean;
  tag_ids: string[];
  tags: string[];
  thumbnail_url: string;
  title: string;
  started_at: string;
}

export interface SearchChannelResponse {
  data: SearchChannel[];
  pagination: { cursor?: string };
}

export interface FollowedChannel {
  broadcaster_id: string;
  broadcaster_login: string;
  broadcaster_name: string;
  followed_at: string;
}

export interface FollowedChannelsResponse {
  total: number;
  data: FollowedChannel[];
  pagination: { cursor?: string };
}

export interface AccessTokenResponse {
  user: WithId<User>;
  account: WithId<Account>;
  session: { user: { name: string; email?: string | null; image?: string | null } };
}

export interface ApiErrorResponse {
  message: string;
  status?: number;
  statusText?: string;
}

export interface RefreshTokenResponse {
  updateResult: WithId<Account>;
  updateSuccess: 1;
}

export interface RefreshTokenErrorResponse {
  error: string;
  status: number;
  message: string;
}

export interface RefreshTokenData {
  access_token: string;
  refresh_token: string;
  scope: string[];
  token_type: string;
}

export interface SignInCallbackProfile {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  email: string;
  picture: string;
  preferred_username: string;
}

export interface BroadcasterBasicInfo {
  broadcaster_name: string;
  broadcaster_login: string;
}

export interface StreamsGridItem extends BroadcasterBasicInfo {
  isMaximized: boolean;
}

export interface BroadcasterStreamCardProps {
  broadcaster: StreamsGridItem;
  isSelected: boolean;
  index: number;
  onSelect: ({ broadcaster }: { broadcaster: BroadcasterBasicInfo }) => void;
  onFullScreen: (index: number) => void;
}

export interface ErrorViewComponentProps {
  message?: string;
  status?: number | string;
  statusText?: string;
  children?: React.ReactNode | React.ReactNode[];
}

export type ErrorViewComponent = (props: ErrorViewComponentProps) => JSX.Element;

export interface ErrorViewEntrie {
  statusText: string;
  statusGroup: string;
  component: ErrorViewComponent;
}

export type ErrorMessageFn = (param: string) => string;
export type ErrorMessage = string | ErrorMessageFn;
export type ErrorEntrieValue = { statusText: string; message: ErrorMessage };
export type FlatErrorEntrie = { statusGroup: string } & ErrorEntrieValue;

export interface UnexpectedErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export interface FollowedItemProps {
  isSelected: boolean;
  isOnScreen: boolean;
  onClickHandler: () => void;
}

export interface FollowedChannelItemProps extends FollowedItemProps {
  followedChannel: FollowedChannel;
}

export interface FollowedStreamItemProps extends FollowedItemProps {
  followedStream: FollowedStream;
}

export type FollowedEntity = FollowedChannel | FollowedStream;

export type SelectAction = "filter" | "add";

export interface BroadcastsUpdateFunctionArgs {
  currentBroadcasts: Array<BroadcasterBasicInfo>;
  currentSelectedBroadcasts: Array<BroadcasterBasicInfo>;
}

export interface SelectedBroadcastsState {
  selectedBroadcasts: Array<BroadcasterBasicInfo>;
}

export type SelectedBroadcastsResetAction = { type: "reset" };
export type SelectedBroadcastsAddAction = { type: "add"; payload: BroadcasterBasicInfo };
export type SelectedBroadcastsRemoveAction = { type: "remove"; payload: BroadcasterBasicInfo };

export type SelectedBroadcastsAction =
  | SelectedBroadcastsResetAction
  | SelectedBroadcastsAddAction
  | SelectedBroadcastsRemoveAction;

export interface WatchPageProps {
  screenBroadcasts: Array<BroadcasterBasicInfo>;
  sessionToken: string;
  accessToken: string;
  refreshToken: string;
  followedChannels: Array<FollowedEntity>;
  followedStreams: FollowedStream[];
  isChannelsEmpty: boolean;
}
