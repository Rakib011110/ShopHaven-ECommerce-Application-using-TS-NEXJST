import axiosInstance from "@/src/lib/AxiosInstance";
import axiosInstanceCreateAcount from "@/src/lib/AxiosInstance/createAcountAxios";

export const createAdmin = async (data: any) => {
  return await axiosInstanceCreateAcount.post("/user/create-admin", data);
};

export const createVendor = async (data: any) => {
  return await axiosInstanceCreateAcount.post("/user/create-vendor", data);
};

export const createCustomer = async (data: any) => {
  return await axiosInstanceCreateAcount.post("/user/create-customer", data);
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};
