import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import transactionReducer from "../features/transactionSlice";
import investmentReducer from "../features/investmentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
    investment: investmentReducer,
  },
});
