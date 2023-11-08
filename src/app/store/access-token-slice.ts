"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AccessTokenState {
  accessToken: string;
  refreshToken: string;
}

// Define the initial state using that type
const initialState: AccessTokenState = {
  accessToken: "",
  refreshToken: "",
};

export const accessTokenSlice = createSlice({
  name: "accessToken",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAccessToken: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { setAccessToken } = accessTokenSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default accessTokenSlice.reducer;
