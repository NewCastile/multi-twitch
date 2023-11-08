import { WithId } from "mongodb";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ERROR_STATUS } from "@/app/constants";
import { isFetchSessionResponse, isFetchUserResponse } from "@/app/helpers/type-guards";
import {
  Account,
  ApiErrorResponse,
  FollowedChannelsResponse,
  FollowedStreamsResponse,
  SessionDocument,
  User,
} from "@/app/types";

import { retryTwitchAPIRequest } from "../access-token-refresh";

export const fetchUserFollowedChannels = async (
  userId: string,
  accessToken: string,
): Promise<ApiErrorResponse | FollowedChannelsResponse> => {
  const twitchAPIRequestURL = `https://api.twitch.tv/helix/channels/followed?user_id=${userId}&first=100`;

  const response = await fetchTwitchApiEndpoint<FollowedChannelsResponse>(
    twitchAPIRequestURL,
    accessToken,
  );

  return response;
};

export const fetchUserFollowedStreams = async (
  userId: string,
  accessToken: string,
): Promise<ApiErrorResponse | FollowedStreamsResponse> => {
  const twitchAPIRequestURL = `https://api.twitch.tv/helix/streams/followed?user_id=${userId}&first=100`;

  const response = await fetchTwitchApiEndpoint<FollowedStreamsResponse>(
    twitchAPIRequestURL,
    accessToken,
  );

  return response;
};

const fetchTwitchApiEndpoint = async <T>(
  url: string,
  accessToken: string,
): Promise<T | ApiErrorResponse> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": `${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}`,
    },
  });

  const responseData = await response.json();

  if (response.statusText === ERROR_STATUS.unauthorized.statusText) {
    //search retry with new access token
    await retryTwitchAPIRequest<T>({
      accessToken,
      requestUrl: url,
      requestMethod: "GET",
    });
  }

  if (response.ok) {
    return responseData as T;
  } else {
    return {
      message: `${responseData.error}: ${responseData.message}`,
      status: response.status,
      statusText: response.statusText,
    };
  }
};

export const fetchUser = async (username: string): Promise<ApiErrorResponse | WithId<User>> => {
  const response = await fetch(
    `http://${process.env.NEXT_PUBLIC_API_BASEPATH}/api/user/${username}`,
  );
  const data = await response.json();

  return data;
};

export const fetchSessionByUserId = async (
  userId: string,
): Promise<ApiErrorResponse | WithId<SessionDocument>> => {
  const response = await fetch(
    `http://${process.env.NEXT_PUBLIC_API_BASEPATH}/api/session/user/${userId}`,
  );
  const data = await response.json();

  return data;
};

export const fetchAccountBySessionToken = async (
  sessionToken: string,
): Promise<ApiErrorResponse | WithId<Account>> => {
  const response = await fetch(
    `http://${process.env.NEXT_PUBLIC_API_BASEPATH}/api/account/sessionToken/${sessionToken}`,
  );
  const data = await response.json();

  return data;
};

export const fetchAccountByAccessToken = async (
  accessToken: string,
): Promise<ApiErrorResponse | WithId<Account>> => {
  const response = await fetch(
    `http://${process.env.NEXT_PUBLIC_API_BASEPATH}/api/account/accessToken/${accessToken}`,
  );
  const data = await response.json();

  return data;
};

export const fetchSessionToken = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.name) {
    return {
      message: ERROR_STATUS.sessionExpired.message,
      status: 401,
      statusText: ERROR_STATUS.sessionExpired.statusText,
    };
  }

  const fetchUserResponse = await fetchUser(session.user.name);

  if (!isFetchUserResponse(fetchUserResponse)) {
    return fetchUserResponse;
  }

  const { _id: userId } = fetchUserResponse;
  const fetchSessionResponse = await fetchSessionByUserId(userId.toString());

  if (!isFetchSessionResponse(fetchSessionResponse)) {
    return fetchSessionResponse;
  }

  return { user: fetchUserResponse, session: fetchSessionResponse };
};
