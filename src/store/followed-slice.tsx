import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { FOLLOWED_ITEMS_PER_PAGE } from "@/constants";
import { FollowedEntity, FollowedStream } from "@/types";

// Define a type for the slice state
interface FollowedState {
  followedChannels: Array<FollowedEntity>;
  shownFollowedChannels: Array<FollowedEntity>;
  channelsPageToken: number;
  followedStreams: Array<FollowedStream>;
  shownFollowedStreams: Array<FollowedStream>;
  streamsPageToken: number;
}

// Define the initial state using that type
const initialState: FollowedState = {
  followedChannels: [],
  shownFollowedChannels: [],
  channelsPageToken: FOLLOWED_ITEMS_PER_PAGE,
  followedStreams: [],
  shownFollowedStreams: [],
  streamsPageToken: FOLLOWED_ITEMS_PER_PAGE,
};

export const followed = createSlice({
  name: "followed",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    loadFollowedChannels: (state, action: PayloadAction<Array<FollowedEntity>>) => {
      const initialShownSlice = action.payload.slice(0, initialState.channelsPageToken);

      state.followedChannels = action.payload;
      state.shownFollowedChannels = initialShownSlice;

      state.channelsPageToken = !state.channelsPageToken
        ? state.channelsPageToken + FOLLOWED_ITEMS_PER_PAGE
        : state.channelsPageToken;
    },
    goToChannelsNextPage: (state) => {
      state.shownFollowedChannels = state.shownFollowedChannels.concat(
        state.followedChannels.slice(
          state.channelsPageToken,
          state.channelsPageToken + FOLLOWED_ITEMS_PER_PAGE,
        ),
      );

      state.channelsPageToken = state.channelsPageToken + FOLLOWED_ITEMS_PER_PAGE;
    },
    goToChannelsPrevPage: (state) => {
      state.shownFollowedChannels =
        state.channelsPageToken === FOLLOWED_ITEMS_PER_PAGE
          ? []
          : state.followedChannels.slice(0, state.channelsPageToken - FOLLOWED_ITEMS_PER_PAGE);
      state.channelsPageToken = state.channelsPageToken - FOLLOWED_ITEMS_PER_PAGE;
    },
    loadFollowedStreams: (state, action: PayloadAction<Array<FollowedStream>>) => {
      const initialShownSlice = action.payload.slice(0, initialState.streamsPageToken);

      state.followedStreams = action.payload;
      state.shownFollowedStreams = initialShownSlice;

      state.streamsPageToken = !state.streamsPageToken
        ? state.streamsPageToken + FOLLOWED_ITEMS_PER_PAGE
        : state.streamsPageToken;
    },
    goToStreamsNextPage: (state) => {
      state.shownFollowedStreams = state.shownFollowedStreams.concat(
        state.followedStreams.slice(
          state.streamsPageToken,
          state.streamsPageToken + FOLLOWED_ITEMS_PER_PAGE,
        ),
      );

      state.streamsPageToken = state.streamsPageToken + FOLLOWED_ITEMS_PER_PAGE;
    },
    goToStreamsPrevPage: (state) => {
      state.shownFollowedStreams =
        state.streamsPageToken === FOLLOWED_ITEMS_PER_PAGE
          ? []
          : state.followedStreams.slice(0, state.streamsPageToken - FOLLOWED_ITEMS_PER_PAGE);
      state.streamsPageToken = state.streamsPageToken - FOLLOWED_ITEMS_PER_PAGE;
    },
    resetFolloweds: (state) => {
      state.channelsPageToken = initialState.channelsPageToken;
      state.shownFollowedChannels = state.followedChannels.slice(0, FOLLOWED_ITEMS_PER_PAGE);
      state.streamsPageToken = initialState.streamsPageToken;
      state.shownFollowedStreams = initialState.followedStreams.slice(0, FOLLOWED_ITEMS_PER_PAGE);
    },
  },
});

export const {
  loadFollowedChannels,
  goToChannelsNextPage,
  goToChannelsPrevPage,
  loadFollowedStreams,
  goToStreamsNextPage,
  goToStreamsPrevPage,
  resetFolloweds,
} = followed.actions;

// Other code such as selectors can use the imported `RootState` type

export default followed.reducer;
