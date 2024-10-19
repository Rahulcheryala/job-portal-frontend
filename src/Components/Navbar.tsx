import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

interface NavbarProps {
  isAuthenticated: boolean;
  accountType: string;
  handleLogout: () => void;
}

const Navbar = ({
  isAuthenticated,
  accountType,
  handleLogout,
}: NavbarProps) => {
  return (
    <nav className="w-full bg-white sm:h-16 h-14 flex justify-between items-center sm:px-10 px-4 mt-1">
      <Link
        href={"/"}
        className="outline-none rounded-full sm:px-4 px-2"
        tabIndex={-1}
      >
        <Image
          src="/assets/icons/logo.svg"
          alt="logo"
          width={415}
          height={60}
          className=" min-w-32 w-32 max-[400px]:min-w-36 sm:min-w-48 sm:w-48 sm:h-12 object-contain"
        />
        <span className="sr-only">Code Unity Logo</span>
      </Link>

      <div className="flex items-center sm:gap-4 gap-2 sm:px-5 px-2 sm:text-xl">
        {isAuthenticated ? (
          <>
            <Link
              href={`${accountType === "job_seeker" ? "/seeker-dashboard" : "/dashboard"}`}
              className="inline-block rounded-full bg-gray-300 from-purple-500 via-indigo-500 to-pink-500 bg-[length:_400%_400%] p-[2.5px] [animation-duration:_6s] animate-background hover:bg-gradient-to-r group"
            >
              <span className="block rounded-full bg-blue-500 group-hover:bg-white px-5 py-2 font-medium text-white group-hover:text-blue-500 transition-colors duration-200">
                Dashboard
                <span className="sr-only">Dashboard</span>
              </span>
            </Link>

            <button
              onClick={handleLogout}
              className="font-medium px-4 sm:py-2 py-1 rounded-full border-2 border-gray-400 text-gray-600 outline-none focus-visible:ring-2 ring-blue-300 focus-visible:ring-offset-2"
            >
              Logout
              <span className="sr-only">Login</span>
            </button>
          </>
        ) : (
          <>
            <Link
              // href={`${accountType === "job_seeker" ? "/seeker-dashboard" : "/dashboard"}`}
              href={"/seeker-dashboard"}
              className="inline-block rounded-full bg-gray-300 from-purple-500 via-indigo-500 to-pink-500 bg-[length:_400%_400%] p-[2.5px] [animation-duration:_6s] animate-background hover:bg-gradient-to-r group"
            >
              <span className="block rounded-full bg-blue-500 group-hover:bg-white px-5 py-2 font-medium text-white group-hover:text-blue-500 transition-colors duration-200">
                Find Jobs{" "}
                <FaArrowRightLong size={16} className="inline-block ms-0.5" />
                <span className="sr-only">Find Jobs</span>
              </span>
            </Link>

            <Link
              href={"/login"}
              className="font-medium px-4 sm:py-2 py-1 rounded-full border-2 border-gray-400 text-gray-600 outline-none focus-visible:ring-2 ring-blue-300 focus-visible:ring-offset-2"
            >
              Login
              <span className="sr-only">Login</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
