import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userType: null, // 'admin' or 'user'
  menus: [],
  token: null, // Add token field
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userType = action.payload.userType;
      state.menus = action.payload.menus;
      state.token = action.payload.token; // Set token
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userType = null;
      state.menus = [];
      state.token = null; // Clear token
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
