import axios from "axios";

const axiosInstanceCreateAcount = axios.create({
  baseURL: "https://e-commerce-application-backend-puce.vercel.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstanceCreateAcount;
