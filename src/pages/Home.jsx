import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetBooks from "../hooks/useGetBooks";
import useDeleteBook from "../hooks/useDeleteBook";
import Loader from "../components/Loader";
import { BsFillBellFill } from "react-icons/bs";
import {
  BiChevronRight,
  BiSolidBookReader,
  BiSolidBookAlt,
} from "react-icons/bi";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaBook } from "react-icons/fa";
import { getDate } from "../utils/dateMaker";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  
  const navigate = useNavigate();
  
  const { books, isLoading } = useGetBooks(searchQuery);

  const handleAddBook = () => {
    navigate("/add-book");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading) return <Loader />;


  return (
    <div className="mx-auto text-slate-900 m-4 px-4">
      <Sidebar
        toggleSidebar={toggleSidebar}
        isOpen={isOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center mb-2">
            <HiOutlineMenuAlt2
              size={25}
              className="cursor-pointer"
              onClick={toggleSidebar}
            />
            <h1 className="font-bold text-xl font-mono">Library</h1>
          </div>
          <div className="w-10 h-10 bg-gray-400 rounded-full cursor-pointer"></div>
        </div>
        {books.length > 0 && (
          <div className="rounded-xl bg-zinc-100 px-2 my-2 flex items-center">
            <AiOutlineSearch />
            <input
              type="text"
              className="bg-zinc-100 outline-none p-2 w-full text-sm"
              placeholder="search..."
            />
          </div>
        )}
        <AiOutlinePlus
          size={32}
          className="my-2 cursor-pointer hover:text-blue-500"
          onClick={handleAddBook}
        />
      </div>
      <div>
        {books.length === 0 ? (
          <div className="h-60 flex items-center justify-center">
            <h2 className="text-slate-800 text-2xl">Your library is Empty</h2>
          </div>
        ) : (
          books?.map((book) => (
            <Link to={`/${book._id}`} key={book._id}>
              <div className=" border-t py-2 shadow-sm flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <img
                    src={book.smallThumbnail}
                    alt={book.title}
                    className="w-16"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {book.title}
                    </p>
                    <p className="text-xs font-medium text-slate-900">
                      {book.author}
                    </p>
                    <p className="text-xs font-medium text-slate-900">
                      {book.genre}
                    </p>
                    <p className="text-xs font-medium text-slate-900">
                      {getDate(book.createdAt)}
                    </p>
                    <p className="text-xs font-medium text-slate-900">
                      ${book.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p
                    className={
                      book.status === "Reading"
                        ? " text-blue-500"
                        : book.status === "Unread"
                        ? " text-red-500"
                        : " text-green-500"
                    }
                  >
                    {book.status === "Reading" ? (
                      <BiSolidBookReader size={20} />
                    ) : book.status === "Unread" ? (
                      <BiSolidBookAlt size={20} />
                    ) : (
                      <FaBook size={20} />
                    )}
                  </p>
                  <BiChevronRight className="text-blue-400" size={20} />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

{
  /* ;
   */
}
