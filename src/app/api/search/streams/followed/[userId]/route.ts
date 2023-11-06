import { NextResponse } from "next/server";

import { ERROR_STATUS } from "@/app/constants";
import { retryTwitchAPIRequest } from "@/app/helpers/access-token-refresh";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  if (!params.userId)
    return NextResponse.json({
      message: ERROR_STATUS.badRequest.case.missingQueryParameter.message("userId"),
      status: 400,
      statusText: ERROR_STATUS.badRequest.case.missingQueryParameter.statusText,
    });

  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get("accessToken");
  const first = searchParams.get("first");
  const after = searchParams.get("after");
  const afterParamValue = after ? `&after=${after}` : "";

  if (!accessToken) {
    return NextResponse.json({
      message: ERROR_STATUS.badRequest.case.missingQueryParameter.message("accessToken"),
      status: 400,
      statusText: ERROR_STATUS.badRequest.case.missingQueryParameter.statusText,
    });
  }
  const twitchAPIRequestURL = `https://api.twitch.tv/helix/streams/followed?user_id=${params.userId}&first=${first}${afterParamValue}`;

  const response = await fetch(twitchAPIRequestURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": `${process.env.TWITCH_CLIENT_ID}`,
    },
  });

  const responseData = await response.json();

  if (response.statusText === ERROR_STATUS.unauthorized.statusText) {
    //search retry with new access token
    await retryTwitchAPIRequest({
      accessToken,
      requestUrl: twitchAPIRequestURL,
      requestMethod: "GET",
    });
  }

  if (response.ok) {
    return NextResponse.json(responseData);
  } else {
    return NextResponse.json({
      message: `${responseData.error}: ${responseData.message}`,
      status: response.status,
      statusText: response.statusText,
    });
  }
}
