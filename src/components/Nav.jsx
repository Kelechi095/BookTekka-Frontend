import React from "react";
import { MdMenuBook } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { BsPeopleFill, BsFillBarChartFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import useLogoutUser from "../hooks/user/useLogoutUser";
import Wrapper from "./Wrapper";
import Dropdown from "./DropDown";
import useGetUser from "../hooks/user/useGetUser";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="border-b-[1px] py-4">
        <Wrapper>
          <div className="inner-nav">
            <ul className="flex items-center justify-between gap-8 text-sm">
              <h1 className="font-semibold text-xl">BookTekka</h1>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-cyan-600" : "text-gray-700"
                }
              >
                <li className="cursor-pointer items-center font-semibold text-base">Home
                  
                </li>
              </NavLink>
              <NavLink
                to="/library"
                className={({ isActive }) =>
                  isActive ? "text-cyan-600" : "text-gray-700"
                }
              >
                <li className="cursor-pointer items-center font-semibold text-base">
                  Library
                </li>
              </NavLink>

              <NavLink
                to="/overview"
                className={({ isActive }) =>
                  isActive ? "text-cyan-600" : "text-gray-700"
                }
              >
                <li className="cursor-pointer items-center font-semibold text-base"> Stats
                </li>
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "text-cyan-600" : "text-gray-700"
                }
              >
                <li className="cursor-pointer items-center font-semibold text-base">
                  Profile
                </li>
              </NavLink>
            </ul>
            <Dropdown />
          </div>
        </Wrapper>
      </div>
    </nav>
  );
}
