import axiosInstance from './axiosInstance';

// Get logged-in user profile
export const getProfileApi = () => {
  return axiosInstance.get('/users/me');
};

// Update logged-in user profile
export const updateProfileApi = (data) => {
  return axiosInstance.put('/users/me', data);
};

export const getAllUsersApi = () => axiosInstance.get('/users');
export const deleteUserApi = (id) => axiosInstance.delete(`/users/${id}`);