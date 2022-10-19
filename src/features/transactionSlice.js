import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coin: {},
  coinList: [],
  transactions: [],
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
    transactionsReducer: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

export const { selectedCoin, coinList, transactionsReducer } = transactionSlice.actions;

export default transactionSlice.reducer;
