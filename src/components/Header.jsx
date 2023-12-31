import React from "react";
import { HiOutlineMenuAlt2 , HiMenuAlt2} from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import useGetContext from "../hooks/useGetContext";

export default function Header({ title, rightSide }) {
  const { handleSidebar } = useGetContext();

  return (
    <div className="flex justify-between items-center lg:hidden my-4">
      <div className="flex gap-4 items-center mb-2">
        <HiMenuAlt2
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
