import { LiaTimesSolid } from "react-icons/lia";
import { statusOptions, sortButtons } from "../utils/buttons";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div
      className={
        isOpen ? "inset-0 fixed  bg-black bg-opacity-10 min-h-screen z-10" : ""
      }
      onClick={toggleSidebar}
    >
      <nav
        className={
          isOpen
            ? "w-[300px] bg-white py-4 px-4 text-[13px]  shadow-md h-full top-0 left-0 fixed"
            : "w-[300px] bg-white py-4 px-4 text-[13px]  shadow-md h-full top-0 -left-96 fixed"
        }
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

        <ul>
          <li className="text-sm font-semibold my-4">Home</li>
          <li className="text-sm font-semibold my-4">Library</li>
          <li className="text-sm font-semibold my-4">Profile</li>
          <li className="text-sm font-semibold my-4">Settings</li>
        </ul>
      </nav>
    </div>
  );
}
