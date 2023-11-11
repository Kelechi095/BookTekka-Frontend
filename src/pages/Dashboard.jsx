import React, { useEffect, useState } from "react";
import { dItems } from "../utils/dashboardItems";
import { BiChevronsRight, BiChevronsLeft } from "react-icons/bi";

export default function Dashboard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  /* useEffect(() => {
    const id = setInterval(() => {
      if (currentIndex === 2) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 3000);

    return () => clearInterval(id);
  }, [currentIndex]);
 */

  return (
    <div className="py-4 px-4 lg:px-12 lg:py-6 bg-lighterCyan min-h-screen">
      <div>
        <h2 className="mt-12 mx-auto max-w-md text-5xl md:text-6xl lg:text-7xl md:max-w-lg  lg:max-w-4xl text-center font-serif p-2 text-textColor">
          Welcome to BookTekka
        </h2>
      </div>
      <div className="mt-8">
        <img src={dItems[currentIndex].image} alt="" className="w-40 mx-auto" />
        <ul className="my-4 max-w-md md:max-w-lg mx-auto">
          <li className="flex items-center justify-center gap-4">
            
            <span className="text-sm font-mono  text-slate-800 lg:max-w-3xl lg:text-xl">
              Create a personal library
            </span>
          </li>
          <li className="flex items-center gap-4 justify-center">
            
            <span className="text-sm font-mono  text-slate-800 lg:max-w-3xl lg:text-xl">
              Recommend your favorite books to other users
            </span>
          </li>
          <li className="flex items-center gap-4 justify-center">
            
            <span className="text-sm font-mono  text-slate-800 lg:max-w-3xl lg:text-xl">
              Monitor your reading progress
            </span>
          </li>
        </ul>
        
      </div>

      <div className="mx-auto max-w-sm flex flex-col justify-center gap-4 mt-2">
        <button className=" border border-slate-800 text-md text-slate-800  shadow-sm rounded-full py-[3px] px-2 w-full">
          Login
        </button>
        <button className=" border border-slate-800 text-md text-slate-800  shadow-sm rounded-full py-[3px] px-2 w-full">
          Register
        </button>
      </div>
    </div>
  );
}
