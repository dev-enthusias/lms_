import Link from "next/link";
import Image from "next/image";
import ForgotPasswordForm from "./form";
import { AuthLayout } from "@lms/ui/auth-layout";

export default function ForgotPassword() {
  return (
    <AuthLayout>
      <article className="bg-white max-w-lg rounded-2xl md:rounded-3xl z-10 w-full flex-1 px-5 lg:px-7 py-6 lg:py-10">
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
              Forgot password
            </h1>
            <p className="lg:text-lg text-grey-400">
              Enter the email address associated with your account to reset your
              password
            </p>
          </div>
        </header>

        <ForgotPasswordForm />

        <p className="text-center tracking-[0.2px] flex gap-x-2.5 justify-center">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-manrope font-semibold text-primary underline"
          >
            Login
          </Link>
        </p>
      </article>
    </AuthLayout>
  );
}
