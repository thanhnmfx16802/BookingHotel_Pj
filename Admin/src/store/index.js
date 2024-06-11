import { configureStore } from "@reduxjs/toolkit";
import loginAdSlice from "./login-slice";

const store = configureStore({
  reducer: {
    loginAdmin: loginAdSlice.reducer,
  },
});

export default store;
