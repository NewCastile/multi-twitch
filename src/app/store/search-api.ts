import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { isSearchChannelsResponse } from "@/app/helpers/type-guards";
import { ApiErrorResponse, SearchChannelResponse } from "@/app/types";

interface SearchQueryArgs {
  broadcasterName: string;
  accessToken: string;
  liveOnly: boolean;
  after?: string;
}

type SearchQueryResult = SearchChannelResponse | ApiErrorResponse;

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["channel", "searchError", "error"],
  endpoints: (builder) => ({
    searchBroadcast: builder.query<SearchQueryResult, SearchQueryArgs>({
      query: (arg) => {
        const { broadcasterName, accessToken, liveOnly, after } = arg;
        const afterParamValue = after ? `&after=${after}` : "";

        return `search/channels/${broadcasterName}?accessToken=${accessToken}&liveOnly=${liveOnly}${afterParamValue}`;
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
