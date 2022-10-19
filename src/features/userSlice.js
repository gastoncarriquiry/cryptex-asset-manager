import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    defineUser: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { defineUser } = userSlice.actions;

export default userSlice.reducer;
