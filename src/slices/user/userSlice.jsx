import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserData,
  createUserData,
  updateUserData,
  deleteUserData,
} from "./userAsyncAction";
import { addCases } from "./builder-utility-function";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const operations = [
      {
        action: fetchUserData,
        onFulfilled: (state, action) => {
          state.data = action.payload;
        },
      },
      {
        action: createUserData,
        onFulfilled: (state, action) => {
          state.data.push(action.payload);
        },
      },
      {
        action: updateUserData,
        onFulfilled: (state, action) => {
          state.data.forEach((user) => {
            console.log(user, "user");
          });

          const index = state.data.findIndex((user) => {
            user.id === action.payload.id;
          });

          if (index !== -1) {
            state.data[index] = action.payload;
          }
        },
      },
      {
        action: deleteUserData,
        onFulfilled: (state, action) => {
          console.log(state.data, "state.data");
          console.log(action.payload, " action.payload");
          state.data = state.data.filter((user) => user.id !== action.payload);
        },
      },
    ];

    addCases(builder, operations);
  },

  // extraReducers: (builder) => {
  //   // Fetch users
  //   builder
  //     .addCase(fetchUserData.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(fetchUserData.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.data = action.payload;
  //     })
  //     .addCase(fetchUserData.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.error.message;
  //     });
  //   // Create user
  //   builder
  //     .addCase(createUserData.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(createUserData.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.data.push(action.payload);
  //     })
  //     .addCase(createUserData.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.error.message;
  //     });
  //   // Update user
  //   builder
  //     .addCase(updateUserData.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(updateUserData.fulfilled, (state, action) => {
  //       state.loading = false;
  //       const index = state.data.findIndex(
  //         (user) => user.id === action.payload.id
  //       );
  //       if (index !== -1) {
  //         state.data[index] = action.payload;
  //       }
  //     })
  //     .addCase(updateUserData.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.error.message;
  //     });
  //   // Delete user
  //   builder
  //     .addCase(deleteUserData.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(deleteUserData.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.data = state.data.filter((user) => user.id !== action.payload);
  //     })
  //     .addCase(deleteUserData.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.error.message;
  //     });
  // },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
