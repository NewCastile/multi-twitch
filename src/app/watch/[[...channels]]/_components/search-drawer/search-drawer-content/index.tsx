"use client";
import { useEffect, useState } from "react";

import { SpinnerIcon } from "@/app/_components/icons/spinner-icon";
import { SEARCH_ITEMS_PER_PAGE } from "@/app/constants";
import { isSearchChannelsResponse } from "@/app/helpers/type-guards";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useLazySearchBroadcastQuery } from "@/app/store/search-api";
import {
  goToNextPage,
  goToPrevPage,
  loadNextPage,
  loadSearch,
  resetChannelSearch,
} from "@/app/store/search-channels-slice";
import { ApiErrorResponse, SearchChannelResponse } from "@/app/types";

import SearchBackButton from "./lib/search-back-button";
import SearchChannelResultItem from "./lib/search-channel-result-item";
import SearchFilterButton from "./lib/search-filter-button";
import SearchInput from "./lib/search-input";
import SearchNextButton from "./lib/search-next-button";

const SearchDrawerContent = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.accessToken);
  const { shownChannels, channels, pageToken } = useAppSelector((state) => state.searchChannels);
  const [triggerNextSearch, { data, error, isLoading, isFetching, originalArgs }] =
    useLazySearchBroadcastQuery();
  const [value, setValue] = useState("");
  const [liveOnly, setLiveOnly] = useState(false);
  const onFirstPage = pageToken === SEARCH_ITEMS_PER_PAGE;
  const hasPagination = (data?: SearchChannelResponse | ApiErrorResponse) => {
    if (!data) return false;
    if ("message" in data) return false;
    if (!isSearchChannelsResponse(data)) return false;
    if (!data.pagination.cursor) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (!data || !isSearchChannelsResponse(data)) return;
    if (typeof originalArgs?.after === "string") {
      dispatch(loadNextPage(data.data));

      return;
    }
    dispatch(loadSearch(data.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(resetChannelSearch());
  }, [dispatch, liveOnly]);

  const searchButtonOnClickHandler = () => {
    if (!value) return;

    triggerNextSearch({
      broadcasterName: value,
      liveOnly,
      accessToken,
    });
  };

  const nextButtonOnClickHandler = () => {
    if (!value) return;
    if (pageToken && shownChannels.length < channels.length) {
      dispatch(goToNextPage());

      return;
    }
    if (pageToken && data && isSearchChannelsResponse(data)) {
      triggerNextSearch({
        broadcasterName: value,
        liveOnly,
        accessToken,
        after: data.pagination.cursor,
      });
    }
  };

  return (
    <div
      className={
        "flex h-full w-full flex-col items-center justify-start space-y-5 overflow-y-hidden px-4"
      }
    >
      <div className={"flex flex-row items-center justify-center space-x-2"}>
        <SearchFilterButton
          disabled={isFetching || isLoading}
          isActive={!liveOnly}
          onClickHandler={() => setLiveOnly(false)}
        >
          All
        </SearchFilterButton>
        <SearchFilterButton
          disabled={isFetching || isLoading}
          isActive={liveOnly}
          onClickHandler={() => setLiveOnly(true)}
        >
          Live only
        </SearchFilterButton>
      </div>
      <SearchInput
        buttonOnClickHandler={searchButtonOnClickHandler}
        value={value}
        onChangeHandler={(e) => setValue(e.target.value)}
        onKeyUpHandler={(e) => {
          if (e.key === "Enter") {
            searchButtonOnClickHandler();
          }
        }}
      />
      {error ? (
        <p>An error has ocurred 😕. Please try again or reload the page</p>
      ) : !data ? null : "message" in data ? (
        <div className={"flex w-full flex-col items-center justify-center"}>
          <p className={"w-full text-center"}>Something wrong happened :c</p>
          <p>Try again</p>
        </div>
      ) : (
        <ul
          className={
            "flex w-full flex-col items-start justify-start divide-y-2 divide-monokai-bg-contrast overflow-y-auto px-2"
          }
        >
          {shownChannels.map((matchingChannel, matchingChannelIdx) => {
            return (
              <SearchChannelResultItem key={matchingChannelIdx} matchingChannel={matchingChannel} />
            );
          })}
        </ul>
      )}
      <div className={"flex w-full flex-col items-center justify-center"}>
        {isLoading || isFetching ? (
          <SpinnerIcon />
        ) : pageToken && hasPagination(data) ? (
          <div className={"flex w-full flex-row items-center justify-between"}>
            <SearchNextButton onClickHandler={nextButtonOnClickHandler} />
            {!onFirstPage && <SearchBackButton onClickHandler={() => dispatch(goToPrevPage())} />}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchDrawerContent;
