import { combineReducers } from "@reduxjs/toolkit";
import firstSliceReducer from "../slices/first/firstSlice";
import todoSliceReducer from "../slices/todos/todoSlice";
import user from "../slices/user/userSlice";

const rootReducer = combineReducers({
  firstSlice: firstSliceReducer,
  todos: todoSliceReducer,
  user,
  // Add other reducers here
});

export default rootReducer;
