"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Image from "next/image";
import { FiFigma } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import Cookies from "js-cookie";
import Link from "next/link";

const slideInFromLeft = {
  hidden: { x: "-80%", y: "-75%", opacity: 0 },
  visible: { x: "-50%", y: "-50%", opacity: 1 },
};

const slideInFromRight = {
  hidden: { x: "80%", y: "-75%", opacity: 0 },
  visible: { x: "50%", y: "-50%", opacity: 1 },
};

export default function Home() {
  const [accountType, setAccountType] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAccountType = localStorage.getItem("account_type");
      const accessToken = localStorage.getItem("access_token");

      setAccountType(storedAccountType!);
      setIsAuthenticated(!!accessToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("account_type");
    Cookies.remove("access_token");
    Cookies.remove("account_type");
    setIsAuthenticated(false);
  };

  // console.log(isAuthenticated, accountType);

  return (
    <main className="w-full min-h-dvh flex flex-col bg-white overflow-y-hidden">
      <Navbar
        isAuthenticated={isAuthenticated}
        accountType={accountType}
        handleLogout={handleLogout}
      />

      <div className="flex-1 homepage-bg bg-cover bg-center bg-no-repeat sm:mx-5 sm:mt-1 sm:mb-3 mx-3 mt-0 mb-3 rounded-3xl flex flex-col items-center justify-center relative border-t border-l">
        <h1 className="xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-Insomatte leading-relaxed font-semibold text-neutral-800 text-center mt-12 tracking-normal">
          Modernizing the Job <br /> Search Experience
        </h1>
        <p className="sm:text-base text-sm max-[450px]:text-xs text-gray-500 mt-2 text-center">
          Search for jobs, apply for jobs, and get hired.
          <br className="block md:hidden" />{" "}
          <span className="max-md:italic">All in one place</span>.
        </p>

        <div className="hidden max-[400px]:block max-[400px]:mt-6 text-center h-fit">
          {isAuthenticated ? (
            <Link
              href={`${accountType === "job_seeker" ? "/seeker-dashboard" : "/dashboard"}`}
              className="py-2 px-6 rounded-full transform transition-all ease-in-out duration-300 text-white
              hover:-translate-y-1 focus-visible:-translate-y-1 hover:scale-110 focus-visible:scale-110 bg-blue-500/90 border-2 border-blue-500/90 hover:bg-blue-500 hover:border-blue-500 outline-none focus-visible:ring-2 ring-blue-300 focus-visible:ring-offset-2"
            >
              Dashboard
              <span className="sr-only">Dashboard</span>
            </Link>
          ) : (
            <Link
              href={"/seeker-dashboard"}
              className="py-2 px-6 rounded-full transform transition-all ease-in-out duration-300 text-white
              hover:-translate-y-1 focus-visible:-translate-y-1 hover:scale-110 focus-visible:scale-110 bg-blue-500/90 border-2 border-blue-500/5 hover:bg-blue-500 hover:border-blue-500  outline-none focus-visible:ring-2 ring-blue-300 focus-visible:ring-offset-2 whitespace-nowrap"
            >
              Find Jobs <FaArrowRightLong className="inline-block" />
              <span className="sr-only">Find Jobs</span>
            </Link>
          )}
        </div>

        <Image
          src="/assets/icons/home.svg"
          alt="Hero Image"
          width={500}
          height={500}
          className="sm:h-[400px] sm:w-[400px] h-[320px] w-[320px] object-contain place-self-center -mb-4 z-10"
          priority={false}
        />

        <div className="hidden md:block">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInFromLeft}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            className=" w-60 h-fit bg-white rounded-2xl transform md:absolute md:top-1/2 xl:left-[23%] lg:left-[18%] md:left-[15%] md:max-lg:ml-4 p-4 flex flex-col gap-1.5"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1 border rounded-full inline-block w-8 h-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <FaFacebook className="text-white w-full h-full" />
              </span>
              <div className="flex flex-col">
                <p className="text-center text-sm text-gray-600 font-semibold font-RadioGrotesk tracking-wide">
                  React Developer
                </p>
                <p className="text-xs text-gray-400 whitespace-nowrap">
                  Facebook
                </p>
              </div>
            </div>

            <div className="flex gap-1 items-center text-gray-400">
              <span className="border rounded-full px-2 py-0.5 text-[10px]">
                Full Time
              </span>
              <span className="border rounded-full px-2 py-0.5 text-[10px]">
                Remote
              </span>
            </div>

            <div className="flex justify-between items-center text-xs mt-0.5">
              <span className="flex items-center gap-1 text-gray-400">
                <IoLocationOutline className="w-4 h-4" />
                <span>London</span>
              </span>
              <span className="text-gray-400 text-xs">Posted 2 days ago</span>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInFromLeft}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            className=" w-48 h-fit bg-white select-none rounded-2xl transform md:absolute bottom-[15%] xl:left-[26%] lg:left-[20%] md:left-[15%] p-4 flex items-center gap-4"
          >
            <span className="p-1.5 border rounded-full inline-block w-8 h-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              <FiFigma className="text-white w-full h-full" />
            </span>
            <div className="flex flex-col">
              <p className="text-center text-sm text-gray-600 font-semibold font-RadioGrotesk tracking-wide">
                UI/UX Designer
              </p>
              <p className="text-xs text-gray-400 whitespace-nowrap">
                Figma • <span>Full Time</span>
              </p>
            </div>
          </motion.div>
        </div>

        <div className="hidden md:block">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInFromRight}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            className="w-48 h-fit bg-white select-none rounded-2xl transform md:absolute top-1/2 xl:right-[23%] lg:right-[18%] md:right-[15%] md:max-lg:ml-4 p-4 flex items-center gap-3"
          >
            <span className="p-1.5 border rounded-full inline-block w-8 h-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              <AiTwotoneThunderbolt className="text-white w-full h-full" />
            </span>
            <div className="flex flex-col">
              <p className="text-base text-gray-600 font-semibold font-RadioGrotesk tracking-wide">
                70% Faster
              </p>
              <p className="text-xs text-gray-400 whitespace-nowrap">
                • More Efficient
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInFromRight}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            className="w-fit h-fit bg-white select-none rounded-2xl transform md:absolute bottom-0 xl:right-[26%] lg:right-[20%] md:right-[15%] p-4"
          >
            <div className="text-gray-600 text-sm font-semibold">
              Top Job Categories
            </div>
            <hr className="text-gray-300 mb-1.5 mt-0.5" />
            <div className="grid grid-cols-4 gap-1.5">
              {/* <!-- UI/UX Bar --> */}
              <div className="flex flex-col items-center justify-end">
                <div className="h-20 w-10 rounded-t-xl rounded-b-sm bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400 relative">
                  <span className="text-[10px] text-white font-semibold absolute bottom-0 left-1/2 -translate-x-1/2">
                    90%
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-gray-700">UI/UX</p>
              </div>

              {/* <!-- React Bar --> */}
              <div className="flex flex-col items-center justify-end">
                <div className="h-16 w-10 rounded-t-xl rounded-b-sm bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400 relative">
                  <span className="text-[10px] text-white font-semibold absolute bottom-0 left-1/2 -translate-x-1/2">
                    70%
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-gray-700">React</p>
              </div>

              {/* <!-- Rust Bar --> */}
              <div className="flex flex-col items-center justify-end">
                <div className="h-[4.5rem] w-10 rounded-t-xl rounded-b-sm bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400 relative">
                  <span className="text-[10px] text-white font-semibold absolute bottom-0 left-1/2 -translate-x-1/2">
                    80%
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-gray-700">Rust</p>
              </div>

              {/* <!-- Ruby Bar --> */}
              <div className="flex flex-col items-center justify-end">
                <div className="h-12 w-10 rounded-t-xl rounded-b-sm bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400 relative">
                  <span className="text-[10px] text-white font-semibold absolute bottom-0 left-1/2 -translate-x-1/2">
                    65%
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-gray-700">Ruby</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
