import { LiaTimesSolid } from "react-icons/lia";
import { filterGenres, filterStatus, sortButtons } from "../utils/buttons";

export default function Sidebar({toggleSidebar}) {
  return (
      <nav className="absolute left-0 top-0 w-60 bg-white py-6 px-4 text-sm h-screen shadow-md">
        <div className="flex gap-2 items-center mb-2">
          {
            <LiaTimesSolid
              size={20}
              className="cursor-pointer lg:hidden dark:text-white"
              onClick={toggleSidebar}
            />
          }
          <h1 className="font-bold text-xl font-mono">Booktekka</h1>
        </div>
        <button>My Profile</button>
        <div className="mt-2">
          <p className="font-semibold">Sort by</p>
          {sortButtons.map((button, index) => (
            <div key={index}>
              <button className="mt-1">{button}</button>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <p className="font-semibold">Filter by genre</p>
          {filterGenres.map((button, index) => (
            <div key={index}>
              <button className="mt-1">{button}</button>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <p className="font-semibold">Filter by status</p>
          {filterStatus.map((button, index) => (
            <div key={index}>
              <button className="mt-1">{button}</button>
            </div>
          ))}
        </div>
    </nav>
  );
}
