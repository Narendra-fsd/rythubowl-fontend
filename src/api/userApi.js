import axiosInstance from "./axiosInstance";

// Get logged-in user profile
export const getProfileApi = () => axiosInstance.get("/users/me");

// Update logged-in user profile
export const updateProfileApi = (data) =>
  axiosInstance.put("/users/me", data);

// SuperAdmin only
export const getAllUsersApi = () => axiosInstance.get("/users");

// SuperAdmin only
export const deleteUserApi = (id) => axiosInstance.delete(`/users/${id}`);
