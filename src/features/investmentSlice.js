import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalInvested: 0,
  totalPurchased: 0,
  totalSold: 0,
};

//IMMER
export const investmentSlice = createSlice({
  name: "investment",
  initialState,
  reducers: {
    totalInvestment: (state, action) => {
      state.coin = action.payload;
    },
    totalSales: (state, action) => {
      state.coinList = action.payload;
    },
    totalPurchases: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

export const { totalInvestment, totalPurchases, totalSales } = investmentSlice.actions;

export default investmentSlice.reducer;
