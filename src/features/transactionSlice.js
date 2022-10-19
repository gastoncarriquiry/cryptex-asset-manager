import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coin: {},
  coinList: [],
  transactions: [],
};

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
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
  },
});

export const { selectedCoin, coinList, transactionsReducer, addTransaction } =
  transactionSlice.actions;

export default transactionSlice.reducer;
