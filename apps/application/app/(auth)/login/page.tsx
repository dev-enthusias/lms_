import React from "react";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "./form";
import { AuthLayout } from "@lms/ui/auth-layout";

export default function Login() {
  return (
    <AuthLayout>
      <article className="bg-white rounded-2xl md:rounded-3xl z-10 w-full max-w-lg px-5 lg:px-7 py-6 lg:py-10">
        <header className="flex flex-col items-center mb-8">
          <Image
            src="/logo.png"
            alt=""
            width={80}
            height={80}
            className="h-20 w-20 mb-6"
          />

          <div className="text-center leading-[100%]">
            <h1 className="font-semibold text-2xl lg:text-[2rem] tracking-[-1%] text-grey-500">
              Welcome back
            </h1>
            <p className="lg:text-lg text-grey-400">
              Login to the official application portal
            </p>
          </div>
        </header>

        <LoginForm />

        <footer>
          <p className="text-center tracking-[0.2px] flex gap-x-2.5 justify-center">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary underline"
            >
              Register
            </Link>
          </p>
        </footer>
      </article>
    </AuthLayout>
  );
}
