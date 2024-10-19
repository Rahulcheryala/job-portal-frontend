"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { GoHome } from "react-icons/go";
import { CiViewList } from "react-icons/ci";
import { VscGitStashApply } from "react-icons/vsc";
import { FaChevronLeft } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { HiUserCircle } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface Profile {
  email: string;
  first_name: string;
  profile_picture_url: string;
}

const Sidebar = ({ isHirer }: { isHirer: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPop, setIsPop] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    email: "",
    first_name: "",
    profile_picture_url: "",
  });
  const Links = [
    {
      name: "Home",
      icon: <GoHome size={20} />,
      href: isHirer ? "/dashboard" : "/seeker-dashboard",
    },
    {
      name: isHirer ? "Posted Jobs" : "Applied Jobs",
      icon: <CiViewList size={20} />,
      href: isHirer ? "/postedJobs" : "/appliedJobs",
    },
  ];
  isHirer &&
    Links.push({
      name: "Post a job",
      icon: <VscGitStashApply size={20} />,
      href: "/post",
    });
  const pathname = usePathname();
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const token = Cookies.get("access_token");

  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("account_type");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("account_type");
    router.push("/");
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(`${baseUrl}/accounts/user-details/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response.data);
      setProfile({
        email: response.data.working_email || response.data.email,
        first_name: response.data.first_name,
        profile_picture_url: response.data.profile_picture_url,
      });
    } catch (error) {
      // Handle any errors that occurred during the login or profile fetching
      console.error(error);
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        router.replace("/login");
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setIsPop(false);
  }, [pathname]);

  return (
    <>
      {isOpen && (
        <div className="fixed z-40 w-[100vw] h-[100dvh] inset-0 bg-black opacity-70 backdrop-blur-sm transition-opacity duration-1000"></div>
      )}
      <aside
        className={`h-screen fixed z-50 transition-all duration-500 ease-out ${
          isOpen
            ? "sm:min-w-72 sm:max-w-72 min-w-52 max-w-52"
            : "min-w-[4.5rem] max-w-[4.5rem] max-[450px]:min-w-0 max-[450px]:max-w-0"
        }`}
      >
        <nav
          className={`relative h-full flex flex-col bg-[#FAFAFA] border-r-2 border-gray-300 pt-2`}
        >
          <Link
            href={isHirer ? "/dashboard" : "seeker-dashboard"}
            className="w-full px-4 text-center outline-none"
          >
            {isOpen ? (
              <Image
                src="/assets/icons/logo.svg"
                alt="Code Unity logo"
                width={600}
                height={90}
                className={`w-24 sm:w-32 sm:h-10 h-8 object-contain mx-4 transition-all duration-700 ${isOpen ? "translate-x-0 opacity-100" : "max-[450px]:-translate-x-14 max-[450px]:opacity-0 translate-x-0"}`}
              />
            ) : (
              <p
                className={`font-bold text-black my-2 transition-all duration-300 ${isOpen ? "translate-x-0 opacity-100" : "max-[450px]:-translate-x-14 max-[450px]:opacity-0 translate-x-0"}`}
              >
                &lt;/&gt;
              </p>
            )}
          </Link>

          {/* Separator */}
          <div className="w-[95%] border border-gray-300 my-1.5 ms-1"></div>

          <button
            className="p-1 rounded-full bg-gray-100 max-[450px]:outline-2 max-[450px]:outline-blue-500 outline-offset-0 hover:bg-gray-200 absolute top-10 max-[450px]:-right-8 max-[450px]:top-1 -right-3 z-10 outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
            onClick={() => {
              setIsOpen((curr) => !curr);
              setIsPop(false);
            }}
          >
            <FaChevronLeft
              size={20}
              className={`${isOpen ? "rotate-0" : "rotate-180"} transition-transform duration-300`}
            />
          </button>

          <ul className="flex-1 flex flex-col px-1 py-2 gap-2">
            {Links.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className={`group relative flex items-center max-[450px]:px-0 px-2 py-2 mx-2 gap-2 font-medium rounded-md text-nowrap cursor-pointer transition-colors outline-none focus-visible:ring-2 focus-visible:ring-gray-500 
                  ${
                    pathname === link.href
                      ? "bg-gray-200 text-gray-700"
                      : "text-gray-600 hover:bg-gray-200/40"
                  }`}
                >
                  <div
                    className={`p-1 transition-all duration-300 ${isOpen ? "-translate-x-0 opacity-100" : "max-[450px]:-translate-x-14 max-[450px]:opacity-0 translate-x-0"} `}
                  >
                    {link.icon}
                  </div>
                  <span
                    className={`overflow-hidden px-1 transition-all duration-500 
              ${!isOpen && "opacity-0 overflow-hidden translate-x-14"}`}
                  >
                    {link.name}
                  </span>
                  {!isOpen && (
                    <span className="max-[450px]:hidden block absolute left-full rounded-md px-2 py-1 ml-6 bg-gray-200/90 text-gray-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                      {link.name}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="w-full">
            <button
              className={`sm:hidden block rounded-t-md border-t-2 border-x-2 border-gray-300 p-1 mx-1 bg-gray-100 hover:bg-gray-200 outline-none focus-visible:ring-2 focus-visible:ring-gray-500 transition-all duration-300  ${isOpen ? "-translate-x-0 opacity-100" : "max-[450px]:-translate-x-14 max-[450px]:opacity-0 translate-x-0"}`}
              onClick={() => setIsPop((curr) => !curr)}
            >
              <IoIosArrowUp
                size={24}
                className={`${isPop ? "rotate-180" : "rotate-0"} transition-transform duration-300 ease-in-out`}
              />
            </button>

            <div
              className={`sm:hidden block h-fit transition-all duration-500 ${isPop ? "border-t-2 border-gray-300 opacity-100 max-h-40" : "opacity-0 max-h-0"} `}
            >
              <ul className="max-[400px]:p-1 p-2 text-sm text-gray-700">
                <li className="block text-xs text-center sm:px-4 px-2 py-2 hover:bg-gray-200 rounded-lg font-semibold">
                  <Link href="/profile">Profile</Link>
                </li>
                <li className="block text-xs text-center w-full sm:px-4 px-2 py-2 hover:bg-gray-200 rounded-lg font-semibold">
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`border-t-2 border-gray-300 px-3 pt-3.5 pb-3 flex gap-x-1 items-center relative transition-all duration-300 ${isOpen ? "-translate-x-0 opacity-100" : "max-[450px]:-translate-x-14 max-[450px]:opacity-0 translate-x-0"}`}
          >
            <div
              className="p-1 relative w-10 h-10 rounded-full shrink-0"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              {!profile.profile_picture_url ? (
                <HiUserCircle
                  size={32}
                  className="hover:bg-gray-100 rounded-full cursor-pointer p-0.5"
                />
              ) : (
                <Image
                  src={profile.profile_picture_url}
                  alt="Profile Picture"
                  sizes="100%"
                  fill
                  className="hover:bg-gray-100 rounded-full cursor-pointer object-fill"
                />
              )}
            </div>
            <div
              className={`overflow-hidden leading-4 transition-all w-full ${
                !isOpen && "opacity-0 overflow-hidden translate-x-14"
              }`}
            >
              <div className="w-full pl-2 flex justify-between items-center">
                <h3 className="flex-1 min-w-0">
                  <p className="font-semibold md:text-base text-sm whitespace-nowrap truncate">
                    {profile.first_name}
                  </p>
                  <span className="text-xs text-gray-600 truncate block">
                    {profile.email}
                  </span>
                </h3>
                <button
                  className="w-fit"
                  onClick={() => setIsPop((curr) => !curr)}
                >
                  <HiDotsVertical
                    size={20}
                    className="hidden sm:block hover:bg-gray-200 rounded-full cursor-pointer p-0.5"
                  />
                </button>
              </div>
            </div>

            <div
              className={`absolute sm:block hidden -right-5 -top-16 bg-gray-100 space-y-1 rounded-lg shadow w-fit dark:bg-gray-700 transition-all duration-300 ${
                isPop
                  ? "-translate-y-5 translate-x-5"
                  : "scale-0 origin-bottom "
              }`}
            >
              <ul className="p-2 text-sm text-gray-700">
                <li>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-200 rounded-lg font-semibold"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="block px-4 py-2 hover:bg-gray-200 rounded-lg font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
