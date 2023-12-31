import React, { useState } from "react";
import { dItems } from "../utils/dashboardItems";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate()

  
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
          <li className="flex items-center justify-center gap-4 text-sm font-mono  text-slate-800 lg:max-w-3xl lg:text-xl text-center mt-1">
            Create a personal library
          </li>
          <li className="flex items-center justify-center gap-4 text-sm font-mono  text-slate-800 lg:max-w-3xl lg:text-xl text-center mt-1">
            Recommend books to other users
          </li>
          <li className="flex items-center justify-center gap-4 text-sm font-mono  text-slate-800 lg:max-w-3xl lg:text-xl text-center mt-1">
            Monitor your reading progress
          </li>
        </ul>
      </div>

      <div className="mx-auto max-w-sm flex flex-col justify-center gap-4 mt-2">
        <button className=" border border-slate-800 text-md text-slate-800  shadow-sm rounded-full py-2 px-2 w-full" onClick={() => navigate('/login')}>
          Login
        </button>
        <button className=" border border-slate-800 text-md text-slate-800  shadow-sm rounded-full py-2 px-2 w-full" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
}
