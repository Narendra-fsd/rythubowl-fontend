import axiosInstance from './axiosInstance';

export const loginApi = (data) => axiosInstance.post('/auth/login', data);
export const registerApi = (data) => 
  axiosInstance.post('/auth/register', data, {
    validateStatus: (status) => status < 500 // Reject only server errors
  });
export const otpVerifyApi = (data) => 
  axiosInstance.post('/auth/verify-otp', data, {
    validateStatus: (status) => status < 500
  });
export const forgotPasswordApi = (data) => axiosInstance.post('/auth/forgot-password', data);
export const resetPasswordApi = (data) => axiosInstance.post('/auth/reset-password', data);
