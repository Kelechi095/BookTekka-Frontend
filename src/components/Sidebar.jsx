import { LiaTimesSolid } from "react-icons/lia";
import { AiOutlineHome } from "react-icons/ai";
import { filterGenres, filterStatus, sortButtons } from "../utils/buttons";

export default function Sidebar({ toggleSidebar }) {
  return (
    <div
      className=" inset-0 fixed  bg-black bg-opacity-10 min-h-screen"
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
        <div className="flex gap-1 items-center cursor-pointer border-t" >
          {/* <AiOutlineHome size={18} color="blue"/> */}
          <button className="font-semibold text-base text-blue-500">
            Home
          </button>
        </div>
        <div className="mt-1 py-1 border-t">
          <p className="font-semibold">Sort by</p>
          {sortButtons.map((button, index) => (
            <div key={index}>
              <button className="mt-1" onClick={toggleSidebar}>
                {button}
              </button>
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
