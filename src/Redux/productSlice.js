import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productsCart: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsCart: (state, action) => {
      state.productsCart = action.payload;
    },
  },
});

export const { setProductsCart } = productSlice.actions;
export default productSlice.reducer;
