import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetTodos from "../hooks/useGetTodos";
import useDeleteTodos from "../hooks/useDeleteTodos";
import Loader from "../components/Loader";
import { BsFillBellFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { sortButtonsArr } from "../utils/buttons";
import { filterButtonsArr } from "../utils/buttons";

export default function Home() {
  const { todos, isLoading } = useGetTodos();
  const [sortButtons, setSortButtons] = useState(sortButtonsArr)
  const [filterButtons, setFilterButtons] = useState(filterButtonsArr)

  const navigate = useNavigate()

  const { deleteTodoMutate } = useDeleteTodos();


  const handleSort = (arg) => {
     setSortButtons(sortButtonsArr.map(button => {
      if(button.name === arg) {
        return {...button, isClicked: true}
        
      }
      return {...button, isClicked: false}
    }))
  }
  const handleFilter = (arg) => {
     setFilterButtons(filterButtonsArr.map(button => {
      if(button.name === arg) {
        return {...button, isClicked: true}
        
      }
      return {...button, isClicked: false}
    }))
  }

  const handleAddBook = () => {
    navigate('/add-todo')
  }
  
  //if (isLoading) return <Loader />;

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
        <button className="border p-1 px-2 mt-3 rounded text-xs bg-blue-500 text-white" onClick={handleAddBook}>Add Book</button>
        <p className="font-semibold text-sm mt-4">Sort by</p>
        <div className="mt-2 grid gap-4 grid-cols-2 text-[13px]">
          {filterButtons.map((button, index) => (
            <button className={button.isClicked ? "border border-blue-500 p-[6px] text-blue-600 bg-zinc-100 rounded" : "border-2 p-[6px] bg-zinc-100 rounded"} key={index} onClick={() => handleFilter(button.name)}>
              {button.name}
            </button>
          ))}
          {sortButtons.map((button, index) => (
            <button className={button.isClicked ? "border border-blue-500 p-[6px] text-blue-600 bg-zinc-100 rounded" : "border-2 p-[6px] bg-zinc-100 rounded"} key={index} onClick={() => handleSort(button.name)}>
              {button.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
