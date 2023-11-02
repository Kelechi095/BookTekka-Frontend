import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetBooks from "../hooks/useGetBooks";
import useDeleteBook from "../hooks/useDeleteBook";
import Loader from "../components/Loader";
import { BsFillBellFill } from "react-icons/bs";
import {
  BiSolidEditAlt,
  BiChevronRight,
  BiSolidBookReader,
  BiSolidBookAlt,
} from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaBook } from "react-icons/fa";
import { getDate } from "../utils/dateMaker";
import Sidebar from "../components/Sidebar";
import useGetBookData from "../hooks/useGetBookData";

export default function Home() {
  const { books, isLoading } = useGetBooks();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate();

  const {bookData} = useGetBookData(searchTerm)

  const handleAddBook = () => {
    navigate("/add-book");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto text-slate-900 m-4 px-4">
      <input type="text" className="border-2 outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      {bookData?.items?.map(book => (
        <div key={book?.id} className="mt-4">
          <img src={book?.volumeInfo?.imageLinks?.smallThumbnail} alt="" className="w-20"/>
          <p className="text-sm">{book?.volumeInfo?.title}</p>
          <p className="text-sm">{book?.volumeInfo?.authors?.[0]}</p>
        </div>
      ))}
      {isOpen && <Sidebar toggleSidebar={toggleSidebar} />}
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
          <BsFillBellFill size={20} className="text-blue-700 cursor-pointer" />
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
        <button
          className="border p-2 my-3 rounded text-xs bg-blue-500 text-white"
          onClick={handleAddBook}
        >
          Add to library
        </button>
      </div>
      <div>
        {books.length === 0 ? (
          <div className="h-60 flex items-center justify-center">
            <h2 className="text-slate-800 text-2xl">Your library is Empty</h2>
          </div>
        ) : (
          books?.map((book) => (
            <Link to={`/${book._id}`} key={book._id}>
              {" "}
              <div
                
                className=" border-t py-2 shadow-sm flex items-center justify-between"
              >
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
