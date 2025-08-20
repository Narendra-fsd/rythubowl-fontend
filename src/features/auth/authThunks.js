import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
  loginApi, 
  registerApi,
} from "../../api/authApi";
import { setToken, setUser } from "../../utils/tokenUtils";

// 🔹 LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await loginApi(formData);
      
      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      return { token, user };
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || err.message
      });
    }
  }
);

// 🔹 REGISTER - Modified to automatically redirect to login
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await registerApi(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { 
        message: "Registration failed" 
      });
    }
  }
);