import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import transactionReducer from "../features/transactionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
  },
});
