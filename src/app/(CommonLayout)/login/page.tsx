"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import React, { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import TIForm from "@/src/components/resubaleform/TIForm";
import { loginValidationSchema } from "@/src/schemas/login.schema";
import { useUserLogin } from "@/src/hooks/auth.hook";
import Loading from "@/src/components/UI/Loading/Loading";
import TIInput from "@/src/components/resubaleform/TIInput";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams?.get("redirect");

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push(redirect || "/");
    }
  }, [isSuccess, redirect, router]);

  const credentials = {
    vendor: "Email: vendor@gmail.com | Password: 123456",
    admin: "Email: admin@gmail.com | Password: 123456",
    user: "Email: customer@gmail.com | Password: 123456",
  };

  return (
    <>
      {isPending && <Loading />}
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400">
        <div className="flex flex-col lg:flex-row w-[90%] max-w-[900px] bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Left Side: Image */}
          <div className="hidden lg:block w-full lg:w-1/2 bg-blue-100">
            <img
              alt="Login Illustration"
              className="h-full w-full object-cover"
              src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration-enter-application-mobile-screen-user-login-form-website-page-interface-ui-new-profile-registration-email-account_335657-936.jpg" // Replace with your image path
            />
          </div>

          {/* Right Side: Login Form */}
          <div className="w-full lg:w-1/2 p-8">
            <h3 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
              Welcome to ShopHaven
            </h3>
            <div className="rounded-lg mt-8">
              <div className="flex justify-between space-x-4">
                {Object.entries(credentials).map(([key, value]) => (
                  <div key={key} className="group relative flex-1 text-center">
                    <button className="w-full py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-sm">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                    <div className="absolute inset-x-0 top-full mt-2 w-full text-center  text-white  p- bg-blue-500 z-50 text-sm rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-gray-600 text-center mb-6">
              Sign in to continue
            </p>

            <TIForm
              resolver={zodResolver(loginValidationSchema)}
              onSubmit={onSubmit}>
              <div className="mb-6">
                <TIInput
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
              <div className="mb-6">
                <TIInput
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                />
              </div>
              <Button
                className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
                size="lg"
                type="submit">
                Login
              </Button>
            </TIForm>

            <div className="text-center mt-6">
              <span className="text-gray-600">Do not have an account?</span>{" "}
              <Link
                className="text-blue-600 font-semibold hover:underline"
                href="/register-customer">
                Register
              </Link>
            </div>
            <div className="text-center mt-4">
              <span className="text-gray-600">Forgot Password?</span>{" "}
              <Link
                className="text-blue-600 font-semibold hover:underline"
                href="/forgot-pass">
                Reset
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
