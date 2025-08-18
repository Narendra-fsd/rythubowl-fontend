import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllProductsApi,
  getProductByIdApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from '../../api/productApi';

// Get all products
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (availableFor, { rejectWithValue }) => {
    try {
      const res = await getAllProductsApi(availableFor);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch products'
      );
    }
  }
);

// Get product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await getProductByIdApi(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch product'
      );
    }
  }
);

// Create product (SuperAdmin only)
export const createProduct = createAsyncThunk(
  'products/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await createProductApi(data);
      return res.data.product;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to create product'
      );
    }
  }
);

// Update product (SuperAdmin only)
export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateProductApi(id, data);
      return res.data.product;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update product'
      );
    }
  }
);

// Delete product (SuperAdmin only)
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteProductApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to delete product'
      );
    }
  }
);
