import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // import your authReducer

const store = configureStore({
  reducer: {
    auth: authReducer, // Adding authReducer under the key 'auth'
  },
});

export default store;