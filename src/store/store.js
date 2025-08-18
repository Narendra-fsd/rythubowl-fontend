import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import products from '../features/product/productSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    product: products,
    // add other module reducers as we build them
  },
  devTools: import.meta.env.DEV,
});

export default store;
