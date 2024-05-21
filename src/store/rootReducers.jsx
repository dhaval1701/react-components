import { combineReducers } from "@reduxjs/toolkit";
import firstSliceReducer from "../slices/first/firstSlice";
import todoSliceReducer from "../slices/todos/todoSlice";

const rootReducer = combineReducers({
  firstSlice: firstSliceReducer,
  todo: todoSliceReducer,
  // Add other reducers here
});

export default rootReducer;
