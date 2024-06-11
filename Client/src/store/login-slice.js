import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login_user",
  initialState: JSON.parse(localStorage.getItem("loginUser"))
    ? JSON.parse(localStorage.getItem("loginUser"))
    : {
        isLogin: false,
        username: "",
        email: "",
        password: "",
      },
  reducers: {
    ON_LOGIN(state, action) {
      state.isLogin = action.payload.isLogin;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice;
