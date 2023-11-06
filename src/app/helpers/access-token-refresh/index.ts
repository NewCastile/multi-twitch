import { WithId } from "mongodb";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/server";

import { ERROR_STATUS } from "@/app/constants";
import { Account, ApiErrorResponse, RefreshTokenData, RefreshTokenResponse } from "@/app/types";

import { fetchAccountByAccessToken } from "../fetchers";
import { isRefreshTokenData, isRefreshTokenResponse } from "../type-guards";

// fetches the new access and refresh token
const getRefreshToken = async (
  refreshToken: string,
): Promise<RefreshTokenData | ApiErrorResponse> => {
  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const responseData = await response.json();

  if (isRefreshTokenData(responseData)) {
    return responseData;
  } else {
    return {
      status: 400,
      message: ERROR_STATUS.badRequest.case.invalidAccessToken.message,
      statusText: ERROR_STATUS.badRequest.case.invalidAccessToken.statusText,
    };
  }
};

// updates the account's Twitch API access token in the database
export const saveNewAccessToken = async ({
  accountId,
  newAccessToken,
  newRefreshToken,
}: {
  accountId: string;
  newAccessToken: string;
  newRefreshToken: string;
}): Promise<WithId<Account> | ApiErrorResponse> => {
  const response = await fetch(`http://localhost:3000/api/account/accessToken/update`, {
    method: "POST",
    body: JSON.stringify({ accountId, newAccessToken, newRefreshToken }),
  });
  const data = await response.json();

  return data;
};

const refreshAccessToken = async (
  accessToken: string,
): Promise<RefreshTokenResponse | ApiErrorResponse> => {
  const fetchAccountByAccessTokenResponse = await fetchAccountByAccessToken(accessToken);

  if ("message" in fetchAccountByAccessTokenResponse) {
    return fetchAccountByAccessTokenResponse;
  }
  const { refresh_token: currentRefreshToken, _id: accountId } = fetchAccountByAccessTokenResponse;

  const refreshTokenResponse = await getRefreshToken(currentRefreshToken);

  if ("message" in refreshTokenResponse) {
    return refreshTokenResponse;
  }

  const { access_token: newAccessToken, refresh_token: newRefreshToken } = refreshTokenResponse;

  const saveNewAccessTokenResponse = await saveNewAccessToken({
    newAccessToken,
    newRefreshToken,
    accountId: accountId.toString(),
  });

  if ("message" in saveNewAccessTokenResponse) {
    return saveNewAccessTokenResponse;
  }

  return { updateSuccess: 1, updateResult: saveNewAccessTokenResponse };
};

//retry request with new access token
export const retryTwitchAPIRequest = async ({
  requestMethod,
  accessToken,
  requestUrl,
}: {
  requestUrl: string;
  accessToken: string;
  requestMethod: RequestInit["method"];
}) => {
  const refreshAccessTokenResponse = await refreshAccessToken(accessToken);

  if (!isRefreshTokenResponse(refreshAccessTokenResponse)) {
    return NextResponse.json({
      message: refreshAccessTokenResponse.message,
      status: refreshAccessTokenResponse.status,
      statusText: refreshAccessTokenResponse.statusText,
    });
  }

  const {
    updateResult: { access_token: newAccessToken },
  } = refreshAccessTokenResponse;

  const retryResponse = await fetch(requestUrl, {
    method: requestMethod,
    headers: {
      Authorization: `Bearer ${newAccessToken}`,
      "Client-Id": `${process.env.TWITCH_CLIENT_ID}`,
    },
  });

  const retryResponseData = await retryResponse.json();

  if (retryResponse.ok) {
    return NextResponse.json(retryResponseData);
  } else {
    return NextResponse.json({
      message: `${retryResponseData.error}: ${retryResponseData.message}`,
      status: retryResponse.status,
      statusText: retryResponse.statusText,
    });
  }
};
