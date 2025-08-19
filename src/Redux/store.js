import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productSlice from '../Redux/productSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productSlice,
    // add other module reducers as we build them
  },
  devTools: import.meta.env.DEV,
});

export default store;
