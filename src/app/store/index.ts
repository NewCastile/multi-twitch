"use client";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import accessTokenReducer from "./access-token-slice";
import broadcastersReducer from "./broadcasts-slice";
import followedReducer from "./followed-slice";
import { searchApi } from "./search-api";
import searchChannelsReducer from "./search-channels-slice";
import sessionTokenReducer from "./session-token-slice";

export const store = configureStore({
  reducer: {
    broadcasts: broadcastersReducer,
    sessionToken: sessionTokenReducer,
    accessToken: accessTokenReducer,
    followed: followedReducer,
    searchApi: searchApi.reducer,
    searchChannels: searchChannelsReducer,
  },
  middleware(getDefaultMiddleWare) {
    return getDefaultMiddleWare().concat(searchApi.middleware);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
