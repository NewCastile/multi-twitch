"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { SEARCH_ITEMS_PER_PAGE } from "@/app/constants";
import { SearchChannel } from "@/app/types";

// Define a type for the slice state
interface SearchChannelsState {
  channels: Array<SearchChannel>;
  shownChannels: Array<SearchChannel>;
  pageToken: number;
}

// Define the initial state using that type
const initialState: SearchChannelsState = {
  channels: [],
  shownChannels: [],
  pageToken: 0,
};

export const searchChannels = createSlice({
  name: "search",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    loadSearch: (state, action: PayloadAction<Array<SearchChannel>>) => {
      state.channels = action.payload;
      state.shownChannels = action.payload;

      state.pageToken = state.pageToken + SEARCH_ITEMS_PER_PAGE; // increments by maximum number of items per page (defaults to SEARCH_ITEMS_PER_PAGE)
    },
    loadNextPage: (state, action: PayloadAction<Array<SearchChannel>>) => {
      state.channels = state.channels.concat(action.payload);
      state.shownChannels = state.shownChannels.concat(action.payload);

      state.pageToken = state.pageToken + SEARCH_ITEMS_PER_PAGE; // increments by maximum number of items per page (defaults to SEARCH_ITEMS_PER_PAGE)
    },
    goToNextPage: (state) => {
      state.shownChannels = state.shownChannels.concat(
        state.channels.slice(state.pageToken, state.pageToken + SEARCH_ITEMS_PER_PAGE),
      );

      state.pageToken = state.pageToken + SEARCH_ITEMS_PER_PAGE; // increments by maximum number of items per page (defaults to SEARCH_ITEMS_PER_PAGE)
    },
    goToPrevPage: (state) => {
      state.shownChannels =
        state.pageToken === SEARCH_ITEMS_PER_PAGE
          ? []
          : state.channels.slice(0, state.pageToken - SEARCH_ITEMS_PER_PAGE);
      state.pageToken = state.pageToken - SEARCH_ITEMS_PER_PAGE;
    },
    resetChannelSearch: (state) => {
      state.channels = initialState.channels;
      state.shownChannels = initialState.shownChannels;
      state.pageToken = initialState.pageToken;
    },
  },
});

export const { loadSearch, loadNextPage, goToNextPage, goToPrevPage, resetChannelSearch } =
  searchChannels.actions;

// Other code such as selectors can use the imported `RootState` type

export default searchChannels.reducer;
