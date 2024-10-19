"use client";
import { FaLongArrowAltRight } from "react-icons/fa";

type ErrorHandlerProps = {
  error: Error;
  reset: () => void;
};

const ErrorHandler = ({ error, reset }: ErrorHandlerProps) => {
  return (
    <section className="w-full h-dvh overflow-hidden grid place-items-center bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            500
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Internal Server Error.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            We are already working to solve the problem. <br />
          </p>
          <p className="mb-4 text-xs font-light text-red-500 line-clamp-3 text-ellipsis">
            {error.message}
          </p>
          <div className="flex gap-5 justify-center items-center">
            <button
              className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={reset}
            >
              Try again
            </button>
            <button className="text-sm font-semibold text-gray-900">
              Contact support
              <span aria-hidden="true">
                <FaLongArrowAltRight className="ml-1 inline-block" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorHandler;
