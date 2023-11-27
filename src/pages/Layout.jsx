import React from "react";
import BottomBar from "../components/BottomBar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";

export default function Layout() {
  return (
    <div className="relative">
      <Nav />
      <Sidebar/>
      <Outlet/>
    </div>
  );
}
