import { combineReducers } from "@reduxjs/toolkit";
import firstSliceReducer from "../slices/first/firstSlice";
import todoSliceReducer from "../slices/todos/todoSlice";
import userSliceReducer from "../slices/user/userSlice";

const rootReducer = combineReducers({
  firstSlice: firstSliceReducer,
  todos: todoSliceReducer,
  users: userSliceReducer,
  // Add other reducers here
});

export default rootReducer;
