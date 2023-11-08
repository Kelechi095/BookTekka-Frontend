import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Loader from "../components/Loader";
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
import { useQuery } from "react-query";
import { fetchBooks } from "../utils/fetchbooks";
import useDebounce from "../hooks/useDebounce";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortTerm, setSortTerm] = useState("Newest");
  const [statusTerm, setStatusTerm] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const debouncedValue = useDebounce(searchTerm, 500);

  const searchQuery = `sort=${sortTerm}&status=${statusTerm}&search=${debouncedValue}&limit=5&page=${currentPage}`;

  const { data, isLoading } = useQuery([searchQuery], () =>
    fetchBooks(searchQuery)
  );

  console.log(currentPage);

  const handleAddBook = () => {
    navigate("/add-book");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handlePageNext = () => {
    if (currentPage < data?.numOfPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePagePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1)
  }, [statusTerm, searchTerm])

  if (isLoading && !debouncedValue) return <Loader />;

  return (
    <div className="mx-auto text-slate-900 m-4 px-4">
      <Sidebar
        toggleSidebar={toggleSidebar}
        isOpen={isOpen}
        setStatusTerm={setStatusTerm}
        setSortTerm={setSortTerm}
        statusTerm={statusTerm}
        sortTerm={sortTerm}
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

        <div className="rounded-xl bg-zinc-100 px-2 my-2 flex items-center">
          <AiOutlineSearch />
          <input
            type="text"
            className="bg-zinc-100 outline-none p-2 w-full text-sm"
            placeholder="search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <AiOutlinePlus
          size={32}
          className="my-2 cursor-pointer hover:text-blue-500"
          onClick={handleAddBook}
        />
      </div>
      <div>
        {data?.books?.length === 0 ? (
          <div className="h-60 flex items-center justify-center">
            <h2 className="text-slate-800 text-2xl">Your library is Empty</h2>
          </div>
        ) : (
          data?.books?.map((book) => (
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
      <div className="flex justify-center items-center gap-8 my-8">
        <button className="border text-white bg-cyan-600 rounded py-[3px] px-4 disabled:bg-gray-400" onClick={handlePagePrev} disabled={currentPage === 1}>
          Prev
        </button>
        <button className="border py-[3px] px-4 text-white bg-cyan-600 rounded  disabled:bg-gray-400" onClick={handlePageNext} disabled={currentPage === data?.numOfPages}>
          Next
        </button>
      </div>
    </div>
  );
}
