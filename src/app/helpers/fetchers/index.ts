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

export const fetchUserFollowedChannels = async (
  userId: string,
  accessToken: string,
  first?: number,
): Promise<ApiErrorResponse | FollowedChannelsResponse> => {
  const response = await fetch(
    `http://localhost:3000/api/search/channels/followed/${userId}?accessToken=${accessToken}&first=${
      first ?? "100"
    }`,
  );

  const data = await response.json();

  return data;
};

export const fetchUserFollowedStreams = async (
  userId: string,
  accessToken: string,
  first?: number,
): Promise<ApiErrorResponse | FollowedStreamsResponse> => {
  const response = await fetch(
    `http://localhost:3000/api/search/streams/followed/${userId}?accessToken=${accessToken}&first=${
      first ?? "100"
    }`,
  );
  const data = await response.json();

  return data;
};

export const fetchUser = async (username: string): Promise<ApiErrorResponse | WithId<User>> => {
  const response = await fetch(`http://localhost:3000/api/user/${username}`);
  const data = await response.json();

  return data;
};

export const fetchSessionByUserId = async (
  userId: string,
): Promise<ApiErrorResponse | WithId<SessionDocument>> => {
  const response = await fetch(`http://localhost:3000/api/session/user/${userId}`);
  const data = await response.json();

  return data;
};

export const fetchAccountBySessionToken = async (
  sessionToken: string,
): Promise<ApiErrorResponse | WithId<Account>> => {
  const response = await fetch(`http://localhost:3000/api/account/sessionToken/${sessionToken}`);
  const data = await response.json();

  return data;
};

export const fetchAccountByAccessToken = async (
  accessToken: string,
): Promise<ApiErrorResponse | WithId<Account>> => {
  const response = await fetch(`http://localhost:3000/api/account/accessToken/${accessToken}`);
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
