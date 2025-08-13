import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi, otpVerifyApi } from "../../api/authApi";
import { setToken, setUser } from "../../utils/tokenUtils";

// 🔹 LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await loginApi(formData);
      
      if (!res.data.success) {
        // Handle unverified email case
        if (res.data.message.includes("verify your email")) {
          return rejectWithValue({
            message: res.data.message,
            isVerified: false,
            email: res.data.email
          });
        }
        throw new Error(res.data.message);
      }

      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      return { token, user };
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || err.message,
        isVerified: err.response?.data?.isVerified
      });
    }
  }
);

// 🔹 REGISTER
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

// 🔹 OTP VERIFY
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await otpVerifyApi(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { 
        message: "OTP verification failed" 
      });
    }
  }
);

