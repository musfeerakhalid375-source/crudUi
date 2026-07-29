import api from "./axios.js";

export const registerUser = (userData) => {
  return api.post("/register", userData);

};

export const getUsers = () => api.get("/users");

export const updateUser = (id, userData) => {
  return api.put(`/users/${id}`, userData);
};

export const getUserById = (id) => {
  return api.get(`/users/${id}`);
};


export const deleteUser = (id) => {
  return api.delete(`/delete/${id}`);
};

export const loginUser = (loginData) => {
  return api.post("/login", loginData);
};

