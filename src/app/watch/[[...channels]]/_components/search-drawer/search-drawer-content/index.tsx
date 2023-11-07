"use client";
import { HStack, Spinner, StackDivider, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

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
    <VStack h={"full"} overflowY={"hidden"} spacing={"5"} w={"full"}>
      <HStack>
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
      </HStack>
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
        <Text>An error has ocurred 😕. Please try again or reload the page</Text>
      ) : !data ? null : "message" in data ? (
        <VStack w={"full"}>
          <Text align={"center"} w={"full"}>
            Something wrong happened :c
          </Text>
          <Text>Try again</Text>
        </VStack>
      ) : (
        <VStack
          as={"ul"}
          divider={<StackDivider borderColor={"whiteAlpha.400"} />}
          overflowY={"auto"}
          px={"2"}
          w={"full"}
        >
          {shownChannels.map((matchingChannel, matchingChannelIdx) => {
            return (
              <SearchChannelResultItem key={matchingChannelIdx} matchingChannel={matchingChannel} />
            );
          })}
        </VStack>
      )}
      <VStack w={"full"}>
        {isLoading || isFetching ? (
          <Spinner />
        ) : pageToken && hasPagination(data) ? (
          <HStack align={"center"} justify={"space-between"} w={"full"}>
            <SearchNextButton onClickHandler={nextButtonOnClickHandler} />
            {!onFirstPage && <SearchBackButton onClickHandler={() => dispatch(goToPrevPage())} />}
          </HStack>
        ) : null}
      </VStack>
    </VStack>
  );
};

export default SearchDrawerContent;
