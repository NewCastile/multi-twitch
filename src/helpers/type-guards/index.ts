import { WithId } from "mongodb";
import { Profile } from "next-auth";

import {
  ApiErrorResponse,
  FollowedChannel,
  FollowedEntity,
  RefreshTokenData,
  RefreshTokenErrorResponse,
  RefreshTokenResponse,
  SearchChannel,
  SearchChannelResponse,
  SessionDocument,
  SignInCallbackProfile,
  User,
} from "@/types";

export const isSearchChannel = (object: undefined | SearchChannel): object is SearchChannel => {
  return typeof object === "object" && "display_name" in object;
};

export const isFollowedChannel = (
  object: undefined | FollowedEntity,
): object is FollowedChannel => {
  return typeof object === "object" && "broadcaster_login" in object;
};

export const isFetchUserResponse = (
  object: ApiErrorResponse | WithId<User>,
): object is WithId<User> => {
  return typeof object === "object" && "name" in object && "email" in object;
};

export const isFetchSessionResponse = (
  object: ApiErrorResponse | WithId<SessionDocument>,
): object is WithId<SessionDocument> => {
  return typeof object === "object" && "sessionToken" in object;
};

export const isSearchChannelsResponse = (
  object: ApiErrorResponse | SearchChannelResponse,
): object is SearchChannelResponse => {
  return "pagination" in object && Array.isArray(object["data"]);
};

export const isRefreshTokenData = (
  object: RefreshTokenErrorResponse | RefreshTokenData,
): object is RefreshTokenData => {
  return typeof object === "object" && "refresh_token" in object && "scope" in object;
};

export const isRefreshTokenResponse = (
  object: ApiErrorResponse | RefreshTokenResponse,
): object is RefreshTokenResponse => {
  return (
    typeof object === "object" && "updateResult" in object && "provider" in object["updateResult"]
  );
};

export const isSignCallbackProfile = (
  object: Profile | SignInCallbackProfile,
): object is SignInCallbackProfile => {
  return typeof object === "object" && "preferred_username" in object;
};
