import axios from "axios";

const api = axios.create({
    baseURL: "https://crudbackend-gky2.onrender.com/api"  , 
    // baseURL: "http://localhost:5000/api", 
    withCredentials: true   //  is ke bina cookie kabhi bhejta hi nahi
})

export default api