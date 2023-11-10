import React from "react";

export default function Dashboard() {
  return (
    <div className="@apply py-4 px-4 lg:px-12 lg:py-6 bg-lighterCyan h-screen">
      <div>
        <h2 className="mt-12 mx-auto max-w-md text-5xl md:text-6xl lg:text-7xl md:max-w-lg  lg:max-w-4xl text-center font-serif p-2 text-textColor">
          Welcome to BookTekka
        </h2>
      </div>
      <div className="mt-8">
        <img
          src="https://res.cloudinary.com/djpyctzcq/image/upload/v1699640951/reading_green_jyckxt.svg"
          alt=""
          className="w-48 mx-auto"
        />
        <h4 className='text-md mt-4 font-mono max-w-md md:max-w-lg text-green-800 lg:max-w-3xl lg:text-xl text-center mx-auto p-3'>Keep track of your favorite books and meet fellow book lovers</h4>

      </div>
      <div className="mx-auto flex justify-center gap-4 mt-4">
        <button className="border-green-800 text-lg text-green-800 border  shadow-sm rounded py-[3px] px-4">Login</button>
        <button className="border text-lg shadow-sm rounded px-4 border-green-800 text-green-800">Register</button>
      </div>
    </div>
  );
}
