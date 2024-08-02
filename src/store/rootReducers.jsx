import { combineReducers } from "@reduxjs/toolkit";
import firstSliceReducer from "../slices/first/firstSlice";
import auth from "../slices/auth-slice/authSlice";
import todoSliceReducer from "../slices/todos/todoSlice";
import user from "../slices/user/userSlice";
import storage from "redux-persist/lib/storage";
import { createTransform } from "./transform";
import { persistReducer } from "redux-persist";

// Persist configuration
const authPersistConfig = {
  key: "auth",
  storage,
  transforms: [createTransform()],
};

// Create the persisted auth reducer
const persistedAuthReducer = persistReducer(authPersistConfig, auth);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  firstSlice: firstSliceReducer,
  todos: todoSliceReducer,
  user,
  // Add other reducers here
});

export default rootReducer;
