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
        <h4 className='text-lg mt-4 font-mono max-w-md md:max-w-lg text-green-800 lg:max-w-3xl lg:text-xl text-center mx-auto p-3'>Keep track of your favorite books and meet fellow book lovers</h4>

      </div>
      <div className="mx-auto max-w-sm flex flex-col justify-center gap-4 mt-2">
        <button className="border-green-800 text-md text-green-800 border  shadow-sm rounded-full py-[3px] px-2 w-full">Login</button>
        <button className="border text-md shadow-sm rounded-full px-2 py-[3px] border-green-800 text-green-800 w-full">Register</button>
      </div>
    </div>
  );
}
