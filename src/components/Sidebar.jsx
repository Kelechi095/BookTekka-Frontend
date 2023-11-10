import { LiaTimesSolid } from "react-icons/lia";
import { FaTimes } from "react-icons/fa";
import useGetContext from "../hooks/useGetContext";
import { MdMenuBook } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { BsPeopleFill, BsFillBarChartFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import useLogoutUser from "../hooks/user/useLogOutUser";

export default function Sidebar() {
  const { isSidebarOpen, handleSidebar, setIsSidebarOpen } = useGetContext();

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    logoutMutation()
    setIsSidebarOpen(false)
  }

  const { logoutMutation } = useLogoutUser();

  return (
    <div
      className={
        isSidebarOpen
          ? "inset-0 fixed  bg-black bg-opacity-10 min-h-screen z-10"
          : ""
      }
      onClick={handleSidebar}
    >
      <nav
        className={
          isSidebarOpen
            ? "w-[300px] bg-white py-4 px-4 text-[13px]  shadow-md h-full top-0 left-0 fixed"
            : "w-[300px] bg-white py-4 px-4 text-[13px]  shadow-md h-full top-0 -left-96 fixed"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2 items-center my-2">
          {
            <FaTimes
              size={25}
              className="cursor-pointer text-gray-700"
              onClick={handleSidebar}
            />
          }
        </div>

        <ul className="py-1 bg-white flex justify-around flex-col">
          <NavLink
            to="/"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "text-cyan-600" : "text-gray-700"
            }
          >
            <li className="cursor-pointer flex gap-4 items-center mt-8">
              <MdMenuBook size={28} />
              <span className={"font-semibold text-base"}>Library</span>
            </li>
          </NavLink>
          <NavLink
            to="/recommendations"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "text-cyan-600" : "text-gray-700"
            }
          >
            <li className="cursor-pointer flex gap-4 items-center mt-8">
              <BsPeopleFill size={28} />
              <span className="font-semibold text-base ">Recommendations</span>
            </li>
          </NavLink>
          <NavLink
            to="/overview"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "text-cyan-600" : "text-gray-700"
            }
          >
            <li className="cursor-pointer flex gap-4 items-center mt-8">
              <BsFillBarChartFill size={28} />
              <span className="font-semibold text-base ">Stats</span>
            </li>
          </NavLink>
          <NavLink
            to="/profile"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "text-cyan-600" : "text-gray-700"
            }
          >
            <li className="cursor-pointer flex gap-4 items-center mt-8">
              <CgProfile size={28} />
              <span className="font-semibold text-base">Profile</span>
            </li>
          </NavLink>
          <NavLink
            to="/settings"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "text-cyan-600" : "text-gray-700"
            }
          >
            <li className="cursor-pointer flex gap-4 items-center mt-8">
              <IoMdSettings size={28} />
              <span className="font-semibold text-base">Settings</span>
            </li>
          </NavLink>
          <li className="cursor-pointer flex gap-4 items-center mt-8 text-red-800" onClick={handleLogout}>
            <BiLogOut size={28} />
            <span className="font-semibold text-base">Logout</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}
