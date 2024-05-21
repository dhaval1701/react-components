import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducers";

const store = configureStore({
  reducer: rootReducer,
  // Middleware, enhancers, etc. can be added here
});

export default store;
