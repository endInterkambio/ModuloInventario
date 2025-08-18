import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://astonishing-curiosity-production.up.railway.app/api",
});

export default axiosInstance;
