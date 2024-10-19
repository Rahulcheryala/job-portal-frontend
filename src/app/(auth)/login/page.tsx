"use client";

import Link from "next/link";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/lib/validator";
import LoginFormInput from "@/Components/Forms/Inputs/LoginFormInput";
import { useRouter } from "next/navigation";
import { FaUserAstronaut } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbBriefcaseFilled } from "react-icons/tb";
import { MdPersonSearch } from "react-icons/md";
import Cookies from "js-cookie";
import { swalSuccess, swalFailed } from "@/lib/helpers/swal";

type Schema = z.infer<typeof loginFormSchema>;

const Login = () => {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const Router = useRouter();

  const signupLinks = [
    {
      title: "Explore Jobs",
      subtitle: "Signup as a Talent",
      href: "signup-seeker",
      icon: <MdPersonSearch size={24} className="text-indigo-600 inline" />,
    },
    {
      title: "Hire Talent",
      subtitle: "Signup as a Recruiter",
      href: "signup-recruiter",
      icon: <TbBriefcaseFilled size={22} className="text-indigo-600 inline" />,
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: Schema) => {
    const { username, password } = data;
    // console.log(data);

    try {
      const response = await axios.post(`${baseurl}/accounts/login/`, {
        username,
        password,
      });

      const { access, refresh, account_type } = response.data;
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

      // Save the tokens in localStorage or cookies
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("account_type", account_type);

      swalSuccess({
        title: "Login Successful",
        type: "toast",
      });

      Cookies.set("access_token", access, {
        expires: expires,
        sameSite: "strict",
        httpOnly: false,
      });
      Cookies.set("refresh_token", refresh, {
        expires: expires,
        sameSite: "strict",
        httpOnly: false,
      });
      Cookies.set("account_type", account_type, {
        expires: expires,
        sameSite: "strict",
        httpOnly: false,
      });

      // Redirect the user to the appropriate dashboard
      if (account_type === "job_seeker") {
        Router.push("/seeker-dashboard");
      } else if (account_type === "job_hirer") {
        Router.push("/dashboard");
      } else {
        Router.push("/");
      }
    } catch (error) {
      // Handle any errors that occurred during the login or profile fetching
      console.error(error);

      if (axios.isAxiosError(error) && error.response) {
        // Handle 401 - Invalid credentials
        if (error.response.status === 401) {
          swalFailed({
            title: "Invalid Credentials",
            type: "toast",
          });
        }

        // Handle 403 - Email not activated
        else if (
          error.response.status === 403 &&
          error.response.data.detail === "Email is not activated."
        ) {
          swalFailed({
            title: "Email Not Activated",
            type: "toast",
          });
        }
        // Handle other errors (server errors, etc.)
        else {
          swalFailed({
            title: "Server Error",
            type: "toast",
          });
        }
      } else {
        swalFailed({
          title: "Something went wrong",
          type: "toast",
        });
      }
    }
  };

  const loginFormCls =
    "peer py-3 px-4 ps-11 block w-full bg-gray-50 rounded-lg outline-none focus-visible:ring-blue-300 focus-visible:ring-2 placeholder:text-gray-400 border";

  return (
    <div className="min-h-screen grid bg-login bg-cover bg-no-repeat bg-center md:py-8 md:px-12 sm:py-4 sm:px-6">
      <div className="flex-1 grid md:grid-flow-col md:grid-cols-[55%,45%] max-[400px]:border-2 border-[10px] border-white sm:rounded-[2rem]">
        {/* Left side with transparent background */}
        <div className="w-full h-full rounded-3xl">
          <div className="h-full grid place-items-center brightness-125  rounded-3xl">
            <div className="flex flex-col sm:gap-10 gap-6 items-center justify-center w-full max-md:my-16 text-white font-Insomatte">
              <h1 className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl px-4 text-center">
                Tech hiring done{" "}
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  right
                </span>
              </h1>

              <div className="xl:text-3xl lg:text-2xl md:text-xl text-center w-full space-y-4 px-6">
                Dream talent. Top companies. Building tomorrow.
              </div>
            </div>
          </div>
        </div>

        {/* Right side with login form */}
        <div className="flex flex-col items-center justify-center lg:p-8 md:p-5 sm:p-4 p-3 bg-white md:rounded-r-[1.25rem]">
          <h1 className="md:text-4xl text-3xl font-bold mb-2 max-md:mt-4 font-Insomatte text-center capitalize text-gray-800 whitespace-nowrap">
            Welcome Back
          </h1>
          <p className="sm:text-sm text-xs md:mb-10 mb-6 text-gray-400">
            Enter your credentials to access your account
          </p>

          {/* Login form */}
          <form
            className="w-full max-w-lg space-y-5 xl:px-10 px-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <LoginFormInput
              id="username"
              label="Username"
              type="text"
              register={register}
              errors={errors.username}
              name="username"
              placeholder="John Doe"
              icon={<FaUserAstronaut />}
              req={true}
              cls={loginFormCls}
            />

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
              cls={loginFormCls}
            />

            <div className="mt-2 block text-right">
              <Link
                href="/reset-password"
                className="text-primary-500 cursor-pointer hover:underline hover:text-primary-700 outline-none focus:outline-none focus-visible:underline focus-visible:text-primary-700 text-sm"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="justify-center text-center">
              <button
                className="w-full bg-primary-700/85 text-white text-lg py-2 active:scale-90 hover:bg-primary-700 rounded-lg transition duration-150 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-opacity-75 focus-visible:scale-95"
                type="submit"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <h2 className="mt-8 text-gray-600 font-Insomatte font-semibold">
            Want to join the Community?
          </h2>
          <div className="flex flex-wrap justify-center items-center mt-4 gap-4">
            {signupLinks.map((link) => {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm outline-none focus-visible:bg-gray-200 group relative w-52 h-fit whitespace-nowrap overflow-hidden"
                >
                  <div className="p-0.5 rounded-full bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-colors duration-300">
                    <div className="bg-white rounded-full py-2 px-4">
                      {/* Hover to See the Gradient Border Animation */}
                      {link.icon}
                      <span className="inline-block w-full text-center -translate-x-2 text-base transform group-hover:-translate-y-8 group-hover:opacity-0 transition-all duration-[400ms]">
                        {link.title}
                      </span>
                      <span className="inline-block w-full text-center text-base opacity-0 transform -translate-x-full translate-y-full group-hover:text-sm group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[400ms] pointer-events-none">
                        {link.subtitle}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
