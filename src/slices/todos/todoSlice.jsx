import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  contents: [],
  isLoading: false,
  error: null,
};

export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async () => {
    const res = await axios("https://jsonplaceholder.typicode.com/photos");
    const data = await res.data;
    return data;
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Add your synchronous reducers here
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload;
    });
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default todosSlice.reducer;
