import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  // You can add more properties to the initial state here
};

export const firstSlice = createSlice({
  name: "firstSlice",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    // You can add more reducers here to handle additional actions
  },
});

export const { increment, decrement } = firstSlice.actions;

export default firstSlice.reducer;
