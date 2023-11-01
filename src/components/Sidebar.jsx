import { LiaTimesSolid } from "react-icons/lia";
import {filterStatus, sortButtons } from "../utils/buttons";

export default function Sidebar({ toggleSidebar }) {
  return (
    <div
      className=" inset-0 fixed  bg-black bg-opacity-10 min-h-screen z-10"
      onClick={toggleSidebar}
    >
      <nav
        className="w-[300px] bg-white py-4 px-4 text-[13px]  shadow-md h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2 items-center mb-2">
          {
            <LiaTimesSolid
              size={25}
              className="cursor-pointer"
              onClick={toggleSidebar}
            />
          }
          <h1 className="font-bold text-xl font-mono">Library</h1>
        </div>

        <button className="font-semibold text-base text-blue-500 my-2">Home</button>
        <div className="mt-1 py-1">
          <p className="font-semibold my-2">Sort by</p>
          {sortButtons.map((button, index) => (
            <div key={index}>
              <button className="my-2" onClick={toggleSidebar}>
                {button}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-2 py-1 border-t">
          <p className="font-semibold my-2">Filter by status</p>
          {filterStatus.map((button, index) => (
            <div key={index}>
              <button className="my-2">{button}</button>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}

{
  /* <div className="mt-2 py-1 border-t">
          <p className="font-semibold">Filter by genre</p>
          {filterGenres.map((button, index) => (
            <div key={index}>
              <button className="mt-1">{button}</button>
            </div>
          ))}
        </div>
        <div className="mt-2 py-1 border-t">
          <p className="font-semibold">Filter by status</p>
          {filterStatus.map((button, index) => (
            <div key={index}>
              <button className="mt-1">{button}</button>
            </div>
          ))}
        </div> */
}
