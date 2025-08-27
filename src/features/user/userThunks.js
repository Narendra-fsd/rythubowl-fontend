import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProfileApi,
  updateProfileApi,
  getAllUsersApi,
  deleteUserApi,
} from '../../api/userApi';

// Fetch current user profile
export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProfileApi();
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch profile'
      );
    }
  }
);

// Update current user profile
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await updateProfileApi(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update profile'
      );
    }
  }
);

//fetch all users
export const fetchAllUsers = createAsyncThunk(
  'user/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllUsersApi();
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch users'
      );
    }
  }
);

//delete a user
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const res = await deleteUserApi(id);
      return { id, message: res.data.message };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to delete user'
      );
    }
  }
);
