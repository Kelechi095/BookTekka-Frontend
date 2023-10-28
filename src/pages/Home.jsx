import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGetTodos from "../hooks/useGetTodos";
import useDeleteTodos from "../hooks/useDeleteTodos";
import Loader from "../components/Loader";
import { BsFillBellFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { buttons } from "../utils/buttons";

export default function Home() {
  const { todos, isLoading } = useGetTodos();
  const [buttonArr, setButtonArr] = useState(buttons)

  const { deleteTodoMutate } = useDeleteTodos();


  const handleSort = (arg) => {
     setButtonArr(buttons.map(button => {
      if(button.name === arg) {
        return {...button, isClicked: true}
        
      }
      return {...button, isClicked: false}
    }))
  }
  
  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto bg-zinc-100 text-slate-900">
      <div className="bg-white p-6">
        <div className="flex justify-between">
          <h1 className="font-bold text-xl font-mono mb-2">Booktekka</h1>
          <BsFillBellFill size={25} className="text-blue-700 cursor-pointer" />
        </div>
        <div className="rounded-xl bg-zinc-100 px-2 flex items-center">
          <AiOutlineSearch />
          <input
            type="text"
            className="bg-zinc-100 outline-none p-2 w-full text-sm"
            placeholder="search..."
          />
        </div>
        <p className="font-semibold text-sm mt-4">Sort by</p>
        <div className="mt-2 grid gap-4 grid-cols-2 text-[13px]">
          {buttonArr.map((button, index) => (
            <button className={button.isClicked ? "border-2 border-blue-500 p-[6px] text-blue-600 bg-zinc-100 rounded" : "border-2 p-[6px] bg-zinc-100 rounded"} key={index} onClick={() => handleSort(button.name)}>
              {button.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
