import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface SessionTokenState {
  sessionToken: string;
}

// Define the initial state using that type
const initialState: SessionTokenState = {
  sessionToken: "",
};

export const sessionTokenSlice = createSlice({
  name: "sessionToken",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setSessionToken: (state, action: PayloadAction<string>) => {
      state.sessionToken = action.payload;
    },
  },
});

export const { setSessionToken } = sessionTokenSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default sessionTokenSlice.reducer;
