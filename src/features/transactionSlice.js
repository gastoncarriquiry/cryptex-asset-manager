import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coin: {},
};

//IMMER
export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    selectedCoin: (state, action) => {
      state.coin = action.payload;
    },
  },
});

export const { selectedCoin } = transactionSlice.actions;

export default transactionSlice.reducer;
