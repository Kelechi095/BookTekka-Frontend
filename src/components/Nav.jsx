import React from 'react'
import { MdMenuBook } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { BsPeopleFill, BsFillBarChartFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";


export default function Nav() {
  return (
    <nav className=" bg-white">
          <ul className="flex py-6 justify-around h-[80%] mt-6 flex-col">
            <h2 className='text-xl font-semibold'>BookTekka</h2>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-cyan-600" : "text-gray-700"
              }
            >
              <li className="cursor-pointer flex gap-4 items-center mt-8">
                <MdMenuBook size={33} />
                <span className={"font-semibold"}>Library</span>
              </li>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "text-cyan-600" : "text-gray-700"
              }
            >
              <li className="cursor-pointer flex gap-4 items-center mt-8">
                <CgProfile size={35} />
                <span className="font-semibold">Profile</span>
              </li>
            </NavLink>
            <NavLink
              to="/recommendations"
              className={({ isActive }) =>
                isActive ? "text-cyan-600" : "text-gray-700"
              }
            >
              <li className="cursor-pointer flex gap-4 items-center mt-8">
                <BsPeopleFill size={33} />
                <span className="font-semibold text">
                  Recommendations
                </span>
              </li>
            </NavLink>
            <NavLink
              to="/overview"
              className={({ isActive }) =>
                isActive ? "text-cyan-600" : "text-gray-700"
              }
            >
              <li className="cursor-pointer flex gap-4 items-center mt-8">
                <BsFillBarChartFill size={33} />
                <span className="font-semibold">Stats</span>
              </li>
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "text-cyan-600" : "text-gray-700"
              }
            >
              <li className="cursor-pointer flex gap-4 items-center mt-8">
                <IoMdSettings size={33} />
                <span className="font-semibold">Settings</span>
              </li>
            </NavLink>
            <li
              className="cursor-pointer flex gap-4 items-center mt-8 text-red-800"
              /* onClick={handleLogout} */
            >
              <BiLogOut size={33} />
              <span className="font-semibold">Logout</span>
            </li>
          </ul>
        </nav>
  )
}
