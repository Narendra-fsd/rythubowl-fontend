import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // add other module reducers as we build them
  },
  devTools: import.meta.env.DEV,
});

export default store;
