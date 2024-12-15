import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { loginUser, registerUser } from "../services/AuthService";

// export const useUserRegistration = () => {
//   return useMutation<any, Error, FieldValues>({
//     mutationKey: ["USER_REGISTRATION"],
//     mutationFn: async (userData) => await registerUser(userData),
//     onSuccess: () => {
//       toast.success("user creation successful");
//     },
//     onError: (error) => {
//       toast.error(error.message);
//     },
//   });
// };

// export const useUserLogin = () => {
//   return useMutation<any, Error, FieldValues>({
//     mutationKey: ["USER_LOGIN"],
//     mutationFn: async (userData) => await loginUser(userData),
//     onSuccess: () => {
//       toast.success("user login successful");
//     },
//     onError: (error) => {
//       toast.error(error.message);
//     },
//   });
// };

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: (data) => {
      toast.success("Login successful");
      console.log("Login Data:", data);
    },
    onError: (error) => {
      toast.error("Login failed. Please check your credentials.");
    },
  });
};
