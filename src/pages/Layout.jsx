import React from "react";
import BottomBar from "../components/BottomBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="relative mb-20">
      <BottomBar />
      <Outlet />
    </div>
  );
}
