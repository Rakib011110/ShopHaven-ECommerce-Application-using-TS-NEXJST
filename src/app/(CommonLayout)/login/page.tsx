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
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center bg-gradient-to-b from-gray-200 via-gray-300 to-gray-100">
        <div className="shadow-lg rounded-lg p-8 bg-white w-[90%] max-w-[500px]">
          <h3 className="my-4 text-3xl font-bold text-gray-900 text-center">
            Welcome to ShopHaven
          </h3>
          <p className="mb-6 text-center text-gray-600">
            Sign in to your account
          </p>

          <TIForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onSubmit}>
            <div className="mb-5">
              <TIInput name="email" placeholder="Email" type="email" />
            </div>
            <div className="mb-5">
              <TIInput name="password" placeholder="Password" type="password" />
            </div>
            <Button
              className="my-4 w-full rounded-md bg-blue-600 text-white font-semibold text-lg py-2 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg focus:outline-none"
              size="lg"
              type="submit">
              Login
            </Button>
          </TIForm>
          <div className="  rounded-lg mb-5">
            <h3 className="text-md font- text-gray-900 text-center mb-6">
              Hover to View Credentials
            </h3>

            <div className="flex justify-between">
              {Object.entries(credentials).map(([key, value]) => (
                <div key={key} className="group relative w-1/3 px-1">
                  <button className=" px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-all focus:outline-none ">
                    {key.charAt(0).toUpperCase() + key.slice(1)} Login
                  </button>
                  <div className="absolute left-0 right-0 top-full mt-2 p-2 bg-[#1cd7f8] text-gray-700 text-sm rounded-md  opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-4">
            <span className="text-gray-600">Do not have an account?</span>{" "}
            <Link
              href="/register-customer"
              className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
          <div className="text-center mt-4">
            <span className="text-gray-600">Forgott Password?</span>{" "}
            <Link href="/forgot-pass" className="text-blue-600 hover:underline">
              forgot
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
