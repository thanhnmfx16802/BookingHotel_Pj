import { createSlice } from "@reduxjs/toolkit";

const loginAdSlice = createSlice({
  name: "login_user",
  initialState: JSON.parse(localStorage.getItem("loginAdmin"))
    ? JSON.parse(localStorage.getItem("loginAdmin"))
    : {
        isLogin: false,
        username: "",
        email: "",
        password: "",
        isAdmin: false,
      },
  reducers: {
    ON_LOGIN(state, action) {
      state.isLogin = action.payload.isLogin;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

export const loginAdActions = loginAdSlice.actions;
export default loginAdSlice;
