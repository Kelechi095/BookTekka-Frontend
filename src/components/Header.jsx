import React from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import useGetContext from "../hooks/useGetContext";

export default function Header({ title, rightSide }) {
  const { handleSidebar } = useGetContext();

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center mb-2">
        <HiOutlineMenuAlt2
          size={25}
          className="cursor-pointer"
          onClick={handleSidebar}
        />
        <h1 className="font-bold text-xl font-mono">{title}</h1>
      </div>
      {rightSide && rightSide}
    </div>
  );
}
