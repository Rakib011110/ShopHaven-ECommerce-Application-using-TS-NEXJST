"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React, { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import TIForm from "@/src/components/resubaleform/TIForm";
import registerValidationSchema from "@/src/schemas/registerValidationSchema";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import TIInput from "@/src/components/resubaleform/TIInput";

const RegisterPage = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect") || "/";
  const router = useRouter();

  const {
    mutate: handleUserRegistration,
    isSuccess,
    isPending,
  } = useUserRegistration();

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push(redirect);
    }
  }, [isPending, isSuccess]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      profilePicture: "https://default-profile-pic-url.png",
    };

    handleUserRegistration(userData);
  };

  return (
    <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 h-screen flex justify-center items-center">
      <div className="shadow-xl rounded-lg p-8 bg-white w-[90%] max-w-[500px]">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Join Our Platform
        </h3>
        <p className="text-center text-gray-600 mb-8">
          Create your account and start shopping!
        </p>
        <TIForm
          resolver={zodResolver(registerValidationSchema)}
          onSubmit={onSubmit}>
          <TIInput name="name" placeholder="Enter your name" size="sm" />
          <TIInput name="email" placeholder="Enter your email" size="sm" />
          <TIInput
            name="mobileNumber"
            placeholder="Enter your mobile number"
            size="sm"
          />
          <TIInput
            name="password"
            placeholder="Enter your password"
            size="sm"
            type="password"
          />
          <Button className="mt-4 w-full" type="submit" disabled={isPending}>
            {isPending ? "Registering..." : "Register"}
          </Button>
        </TIForm>
        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link className="text-blue-600" href="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
