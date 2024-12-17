import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { loginUser } from "../services/AuthService";

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
