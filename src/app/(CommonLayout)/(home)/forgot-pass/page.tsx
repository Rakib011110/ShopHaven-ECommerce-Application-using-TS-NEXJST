"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@nextui-org/button";

import TIForm from "@/src/components/resubaleform/TIForm";
import TIInput from "@/src/components/resubaleform/TIInput";
import Loading from "@/src/components/UI/Loading/Loading";
import { forgotPassword } from "@/src/services/AuthService";
import { forgotPasswordValidationSchema } from "@/src/schemas/forgotPassword.schema";

const ForgotPasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // React Query mutation
  const { mutate: handleForgotPassword, isPending } = useMutation({
    mutationKey: ["FORGOT_PASSWORD"],
    mutationFn: async (data: FieldValues) => await forgotPassword(data as any),
    onSuccess: () => {
      toast.success("Password reset link sent! Please check your email.");
      setIsSubmitted(true);
    },
    onError: () => {
      toast.error("Failed to send reset link. Please try again.");
    },
  });

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(forgotPasswordValidationSchema),
  });

  const onSubmit = (data: FieldValues) => {
    handleForgotPassword(data);
  };

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center bg-gradient-to-b from-gray-200 via-gray-300 to-gray-100">
      {isPending && <Loading />}
      <div className="shadow-lg rounded-lg p-8 bg-white w-[90%] max-w-[500px]">
        <h3 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Forgot Password
        </h3>
        {!isSubmitted ? (
          <TIForm onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <TIInput name="email" placeholder="Email" type="email" />
            </div>
            <Button
              className="my-4 w-full rounded-md bg-blue-600 text-white font-semibold text-lg py-2 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
              type="submit">
              Send Reset Link
            </Button>
          </TIForm>
        ) : (
          <p className="text-center text-gray-600">
            If an account exists, a reset link has been sent to your email.
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
