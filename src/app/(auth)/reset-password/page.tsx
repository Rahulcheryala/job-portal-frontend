"use client";

import Swal from "sweetalert2";
import axios from "axios";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { forgotPasswordSchema } from "@/lib/validator";

type Schema = z.infer<typeof forgotPasswordSchema>;

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(forgotPasswordSchema),
  });
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

  const onSubmit = async (data: Schema) => {
    const { email } = data;
    console.log(email);
    try {
      const response = await axios.post(`${baseurl}/accounts/reset-password/`, {
        email,
      });

      if (response.data.detail) {
        Swal.fire({
          title: "Password Reset Link",
          text: response.data.detail,
          icon: "success",
          toast: true,
          timer: 6000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Password Reset Link",
          text: response.data.email,
          icon: "error",
          toast: true,
          timer: 6000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-dvh p-6">
      <div className="h-full bg-white rounded-xl shadow-lg border-2 border-indigo-300">
        <div className="px-4 py-6 sm:px-7 sm:py-10">
          <div className="text-center sm:mx-10 mx-4">
            <h1 className="block sm:text-2xl text-xl font-bold text-gray-800 dark:text-white">
              Forgot password ?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?
              <Link
                href="/login"
                className="ml-2.5 text-blue-600 decoration-2 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold ml-1 mb-2"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className="py-3 px-4 block w-full bg-gray-50 border-2 outline-none border-gray-200 rounded-md text-base focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                    />
                  </div>
                  <p
                    className={`${errors.email ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"} transition-transform duration-300 text-xs text-red-500 mt-2 ml-1`}
                  >
                    {errors.email?.message}
                  </p>
                </div>
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-lg border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
