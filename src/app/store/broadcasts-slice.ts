"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { BroadcasterBasicInfo } from "@/app/types";

// Define a type for the slice state
export interface BroadcastsState {
  broadcasts: Array<BroadcasterBasicInfo>;
  maxReached: boolean;
}

// Define the initial state using that type
const initialState: BroadcastsState = {
  broadcasts: [],
  maxReached: false,
};

export const broadcastsSlice = createSlice({
  name: "broadcasts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setBroadcasts: (state, action: PayloadAction<Array<BroadcasterBasicInfo>>) => {
      state.broadcasts = action.payload;
    },
    setMaxReached: (state, action: PayloadAction<boolean>) => {
      state.maxReached = action.payload;
    },
  },
});

export const { setBroadcasts, setMaxReached } = broadcastsSlice.actions;

export default broadcastsSlice.reducer;
