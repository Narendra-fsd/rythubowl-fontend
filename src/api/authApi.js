import axiosInstance from './axiosInstance';

export const loginApi = (data) => axiosInstance.post('/auth/login', data);
export const registerApi = (data) => 
  axiosInstance.post('/auth/register', data, {
    validateStatus: (status) => status < 500 // Reject only server errors
  });