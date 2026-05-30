import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://restcountries.com/v3.1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error: ", error.message);
    return Promise.reject(error);
  }
);
