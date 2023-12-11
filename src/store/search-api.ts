import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { isSearchChannelsResponse } from "@/helpers/type-guards";
import { ApiErrorResponse, SearchChannelResponse } from "@/types";

interface SearchQueryArgs {
  broadcasterName: string;
  accessToken: string;
  liveOnly: boolean;
  after?: string;
}

type SearchQueryResult = SearchChannelResponse | ApiErrorResponse;

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.twitch.tv/helix/search" }),
  tagTypes: ["channel", "searchError", "error"],
  endpoints: (builder) => ({
    searchBroadcast: builder.query<SearchQueryResult, SearchQueryArgs>({
      query: (args) => {
        const { broadcasterName, accessToken, liveOnly, after } = args;
        const afterParam = after ? `&after=${after}` : "";

        return {
          url: `/channels?query=${broadcasterName}&live_only=${liveOnly}${afterParam}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Client-Id": `${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}`,
          },
        };
      },

      providesTags: (result, error, search) => {
        if (!result || error) return [{ type: "error", error }];
        if (!isSearchChannelsResponse(result)) {
          return [{ type: "searchError", result }];
        }

        return [{ type: "channel", broadcaster: search.broadcasterName, result }];
      },
    }),
  }),
});

export const { useSearchBroadcastQuery, useLazySearchBroadcastQuery } = searchApi;
