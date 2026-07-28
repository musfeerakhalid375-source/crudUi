import axios from "axios";

const api = axios.create({
    baseURL: "https://crudbackend-gky2.onrender.com/api"
})

export default api