import axios from "axios";

// AXIOS INSTANCE EXPORTED
export const axiosInstance = axios.create({
    baseURL : "http://localhost:5001/api",
    withCredentials : true
})

// END - AXIOS INSTANCE EXPORTED


