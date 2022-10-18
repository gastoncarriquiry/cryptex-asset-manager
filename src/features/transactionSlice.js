import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coin: {},
  coinList: [],
};

//IMMER
export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    selectedCoin: (state, action) => {
      state.coin = action.payload;
    },
    coinList: (state, action) => {
      state.coinList = action.payload;
    },
  },
});

export const { selectedCoin, coinList } = transactionSlice.actions;

export default transactionSlice.reducer;
