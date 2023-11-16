import React from "react";
import BottomBar from "../components/BottomBar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Layout() {
  return (
    <div className="relative">
      <Sidebar />
      <Outlet/>
    </div>
  );
}
