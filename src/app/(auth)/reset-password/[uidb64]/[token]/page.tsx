"use client";

import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LoginFormInput from "@/Components/Forms/Inputs/LoginFormInput";
import { RiLockPasswordLine } from "react-icons/ri";
import { resetPasswordSchema } from "@/lib/validator";

type Schema = z.infer<typeof resetPasswordSchema>;

const ResetPasswordConfirmPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(resetPasswordSchema),
  });

  const router = useRouter();
  const Params = useParams<{ uidb64: string; token: string }>();
  const uidb64 = Params.uidb64;
  const token = Params.token;
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

  console.log(uidb64, " ", token);

  const onSubmit = async (data: Schema) => {
    const { password } = data;
    try {
      const response = await axios.post(
        `${baseurl}/accounts/reset-password/${uidb64}/${token}/`,
        {
          new_password: password,
        }
      );
      Swal.fire({
        title: "Password Reset",
        text: response.data.detail,
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
      router.push("/login");
    } catch (error) {
      console.log((error as any)?.response?.data);
    }
  };

  return (
    <section className="bg-white">
      <div className="flex sm:items-center justify-center px-6 py-8 mx-auto h-screen">
        <div className="h-fit p-6 bg-white rounded-xl shadow-lg border-2 border-indigo-300 w-96 max-w-96">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Reset Password
          </h2>
          <form
            className="mt-4 space-y-7 lg:mt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <LoginFormInput
              id="password"
              label="Password"
              type="password"
              register={register}
              errors={errors.password}
              name="password"
              placeholder="••••••••"
              icon={<RiLockPasswordLine />}
              req={true}
              cls="peer py-3 px-4 ps-11 block w-full bg-gray-200 rounded-lg outline-none focus:outline-blue-400 focus:ring-blue-400 disabled:opacity-50 disabled:pointer-events-none placeholder:text-gray-400"
            />

            <LoginFormInput
              id="confirm_password"
              label="Confirm Password"
              type="password"
              register={register}
              errors={errors.confirm_password}
              name="confirm_password"
              placeholder="••••••••"
              icon={<RiLockPasswordLine />}
              req={true}
              cls="peer py-3 px-4 ps-11 block w-full bg-gray-200 rounded-lg outline-none focus:outline-blue-400 focus:ring-blue-400 disabled:opacity-50 disabled:pointer-events-none placeholder:text-gray-400"
            />

            <button
              type="submit"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-lg border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordConfirmPage;
