import axiosInstance from "./axiosInstance";

// Public APIs
export const getAllProductsApi = (availableFor) =>
  axiosInstance.get("/products", { params: availableFor ? { availableFor } : {} });

export const getProductByIdApi = (id) =>
  axiosInstance.get(`/products/${id}`);

// Protected (SuperAdmin only)
export const createProductApi = (data) =>
  axiosInstance.post("/products", data);

export const updateProductApi = (id, data) =>
  axiosInstance.put(`/products/${id}`, data);

export const deleteProductApi = (id) =>
  axiosInstance.delete(`/products/${id}`);
