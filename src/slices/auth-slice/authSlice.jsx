import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  credential: {
    isLoggedIn: false,
    userType: null, // 'admin' or 'user'
    menus: [],
    token: null, // Add token field
  },
};

const authSlice = createSlice({
  name: "credential",
  initialState,
  reducers: {
    login: (state, action) => {
      state.credential = {
        isLoggedIn: true,
        userType: action.payload.userType,
        menus: action.payload.menus,
        token: action.payload.token, // Set token
      };
    },
    logout: (state) => {
      state.credential = {
        isLoggedIn: false,
        userType: null,
        menus: [],
        token: null, // Clear token
      };
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
