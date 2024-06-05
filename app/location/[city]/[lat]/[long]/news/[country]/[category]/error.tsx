"use client";
import React from "react";

function Error() {
  return (
    <div className="flex">
      <div className="bg-transparent  justify-center items-senter">
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="text-xl font-bold text-gray-500">
            Something went wrong!
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

export default Error;
