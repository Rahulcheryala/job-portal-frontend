import React from "react";

const Skeleton = () => {
  return (
    <div className="flex animate-pulse 2xl:px-10 max-w-screen-lg mx-auto">
      <div
        role="status"
        className="min-w-full flex flex-col gap-4 animate-pulse"
      >
        <div className="h-60 bg-gray-300 rounded-md min-w-full"></div>
        <div className="h-60 bg-gray-300 rounded-md min-w-full"></div>
        <div className="h-60 bg-gray-300 rounded-md min-w-full"></div>
        <div className="h-60 bg-gray-300 rounded-md min-w-full"></div>
        <div className="h-60 bg-gray-300 rounded-md min-w-full"></div>
        <div className="h-60 bg-gray-300 rounded-md min-w-full"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Skeleton;
