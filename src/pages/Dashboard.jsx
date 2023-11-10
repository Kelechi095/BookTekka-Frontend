import React, { useEffect, useState } from "react";
import { dItems } from "../utils/dashboardItems";

export default function Dashboard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (currentIndex === 2) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 3000);

    return () => clearInterval(id);
  }, [currentIndex]);


  return (
    <div className="py-4 px-4 lg:px-12 lg:py-6 bg-lighterCyan min-h-screen">
      <div>
        <h2 className="mt-4 mx-auto max-w-md text-5xl md:text-6xl lg:text-7xl md:max-w-lg  lg:max-w-4xl text-center font-serif p-2 text-textColor">
          Welcome to BookTekka
        </h2>
      </div>
      <div className="mt-8">
        <img
          src={dItems[currentIndex].image}
          alt=""
          className="w-40 mx-auto"
        />
        <h4
          className={
            currentIndex === 0
              ? "text-md mt-4 font-mono max-w-md md:max-w-lg text-green-500 lg:max-w-3xl lg:text-xl text-center mx-auto p-3"
              : currentIndex === 1
              ? "text-md mt-4 font-mono max-w-md md:max-w-lg text-red-500 lg:max-w-3xl lg:text-xl text-center mx-auto p-3"
              : "text-md mt-4 font-mono max-w-md md:max-w-lg text-cyan-600 lg:max-w-3xl lg:text-xl text-center mx-auto p-3"
          }
        >
          {dItems[currentIndex].text}
        </h4>
      </div>

      <div className="mx-auto max-w-sm flex flex-col justify-center gap-4 mt-2">
        <button
          className={
            currentIndex === 0
              ? "border-green-600 text-md text-green-500 border  shadow-sm rounded-full py-[3px] px-2 w-full"
              : currentIndex === 1
              ? "border-red-500 text-md text-red-500 border  shadow-sm rounded-full py-[3px] px-2 w-full"
              : "border-blue-600 text-md text-blue-600 border  shadow-sm rounded-full py-[3px] px-2 w-full"
          }
        >
          Login
        </button>
        <button
          className={
            currentIndex === 0
              ? "border-green-600 text-md text-green-500 border  shadow-sm rounded-full py-[3px] px-2 w-full"
              : currentIndex === 1
              ? "border-red-600 text-md text-red-500 border  shadow-sm rounded-full py-[3px] px-2 w-full"
              : "border-blue-600 text-md text-blue-600 border  shadow-sm rounded-full py-[3px] px-2 w-full"
          }
        >
          Register
        </button>
      </div>
    </div>
  );
}
