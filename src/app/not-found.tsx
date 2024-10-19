"use client";
import { useRouter } from "next/navigation";
import { FaLongArrowAltRight } from "react-icons/fa";

const Notfound = () => {
  const router = useRouter();

  return (
    <section className="w-full h-dvh overflow-hidden grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-8xl font-semibold text-blue-500">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => router.back()}
          >
            Go back home
          </button>
          <button className="text-sm font-semibold text-gray-900">
            Contact support{" "}
            <span aria-hidden="true">
              <FaLongArrowAltRight className="ml-1 inline-block" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Notfound;
