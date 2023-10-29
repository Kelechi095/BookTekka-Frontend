import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetBooks from "../hooks/useGetBooks";
import useDeleteBook from "../hooks/useDeleteBook";
import Loader from "../components/Loader";
import { BsFillBellFill } from "react-icons/bs";
import { BiSolidEditAlt, BiChevronRight, BiSolidBookReader, BiSolidBookAlt } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import {FaBook} from "react-icons/fa"
import { sortButtonsArr } from "../utils/buttons";
import { filterButtonsArr } from "../utils/buttons";
import { getDate } from "../utils/dateMaker";

export default function Home() {
  const { books, isLoading } = useGetBooks();
  const [sortButtons, setSortButtons] = useState(sortButtonsArr);
  const [filterButtons, setFilterButtons] = useState(filterButtonsArr);

  const navigate = useNavigate();

  const { deleteBookMutate } = useDeleteBook();

  const handleSort = (arg) => {
    setSortButtons(
      sortButtonsArr.map((button) => {
        if (button.name === arg) {
          return { ...button, isClicked: true };
        }
        return { ...button, isClicked: false };
      })
    );
  };
  const handleFilter = (arg) => {
    setFilterButtons(
      filterButtonsArr.map((button) => {
        if (button.name === arg) {
          return { ...button, isClicked: true };
        }
        return { ...button, isClicked: false };
      })
    );
  };

  const handleAddBook = () => {
    navigate("/add-todo");
  };

  console.log(books);

  
  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto bg-zinc-100 text-slate-900 max-w-md">
      <div className="bg-white p-4">
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
        <button
          className="border p-1 px-2 mt-3 rounded text-xs bg-blue-500 text-white"
          onClick={handleAddBook}
        >
          Add Book
        </button>
        <p className="font-semibold text-sm mt-4">Sort by</p>
        
      </div>
      <div className="bg-white mt-1 p-4">
        {books?.map((book) => (
          <div key={book._id} className="my-2 border-b pb-1">
            <div className="flex justify-between items-center">
              <p className="text-sm font-bold text-slate-800">{book.title}</p>
              <div className="flex items-center gap-2">
                <p
                  className={
                    book.status === "Reading"
                      ? "text-md font-medium text-blue-500"
                      : book.status === "Unread"
                      ? "text-md font-medium text-red-500"
                      : "text-md font-medium text-green-500"
                  }
                >
                  {book.status === 'Reading' ? <BiSolidBookReader /> : book.status === 'Unread' ? <BiSolidBookAlt /> : <FaBook />}
                </p>
                <BiChevronRight className="text-blue-400" />
              </div>
            </div>
            <p className="text-xs font-medium text-slate-900">{book.author}</p>
            <p className="text-xs font-medium text-slate-900">{book.genre}</p>
            <p className="text-xs font-medium text-slate-900">{getDate(book.createdAt)}</p>
            <p className="text-xs font-medium text-slate-900">${book.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
