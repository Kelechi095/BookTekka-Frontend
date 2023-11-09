import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import {
  BiChevronRight,
  BiSolidBookReader,
  BiSolidBookAlt,
  BiSolidChevronDown,
  BiSolidChevronRight,
} from "react-icons/bi";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { FaBook } from "react-icons/fa";
import { getDate } from "../utils/dateMaker";
import { useQuery } from "react-query";
import { fetchBooks } from "../utils/fetchbooks";
import useDebounce from "../hooks/useDebounce";
import { sortButtons, statusOptions } from "../utils/buttons";
import useGetContext from "../hooks/useGetContext";
import Header from "../components/Header";

export default function Home() {
  const [isFilter, setIsFilter] = useState(false);
  const [isSort, setIsSort] = useState(false);

  const [sortTerm, setSortTerm] = useState("Newest");
  const [statusTerm, setStatusTerm] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  const navigate = useNavigate();

  const debouncedValue = useDebounce(searchTerm, 500);

  const searchQuery = `sort=${sortTerm}&status=${statusTerm}&search=${debouncedValue}&limit=10&page=${currentPage}`;

  const { data, isLoading } = useQuery([searchQuery], () =>
    fetchBooks(searchQuery)
  );

  const handleAddBook = () => {
    navigate("/add-book");
  };

  const toggleFilterBar = () => {
    setIsFilter(!isFilter);
  };
  const toggleSortBar = () => {
    setIsSort(!isSort);
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
    setCurrentPage(1);
  }, [statusTerm, searchTerm]);

  if (isLoading && !debouncedValue) return <Loader />;

  return (
    <div className="mx-auto text-slate-900 m-4 px-4 mb-4">
      <Header
        title={"Library"}
        rightSide={
          <AiOutlinePlus
            size={32}
            className="my-2 cursor-pointer hover:text-blue-500"
            onClick={handleAddBook}
          />
        }
      />

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
      <div className="sort_filter relative flex justify-between mb-2">
        <div
          className="border py-1 px-4 cursor-pointer w-36  rounded flex items-center justify-between"
          onClick={toggleSortBar}
        >
          <p className="text-sm">Sort</p>
          {isSort ? <BiSolidChevronRight /> : <BiSolidChevronDown size={16} />}
        </div>
        {isSort && (
          <ul className="absolute top-12 bg-white w-36 px-2 py-1 rounded shadow-sm border z-10 text-sm">
            {sortButtons.map((button) => (
              <li
                className={
                  sortTerm === button
                    ? "list-none my-2 cursor-pointer hover:text-blue-500 w-fit font-bold"
                    : "list-none my-2 cursor-pointer hover:text-blue-500 w-fit"
                }
                onClick={() => {
                  setSortTerm(button);
                  toggleSortBar();
                }}
              >
                {button}
              </li>
            ))}
          </ul>
        )}
        <div
          className="border py-1 px-4 cursor-pointer w-36  rounded flex items-center justify-between"
          onClick={toggleFilterBar}
        >
          <p className="text-sm">Filter</p>
          {isFilter ? (
            <BiSolidChevronRight />
          ) : (
            <BiSolidChevronDown size={16} />
          )}
        </div>
        {isFilter && (
          <ul className="absolute top-12 right-0 bg-white w-36 px-2 py-1 rounded shadow-sm border z-10 text-sm">
            {statusOptions.map((button) => (
              <li
                className={
                  statusTerm === button
                    ? "list-none my-2 cursor-pointer hover:text-blue-500 w-fit font-bold"
                    : "list-none my-2 cursor-pointer hover:text-blue-500 w-fit"
                }
                onClick={() => {
                  setStatusTerm(button);
                  toggleFilterBar();
                }}
              >
                {button}
              </li>
            ))}
          </ul>
        )}
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
      <div className="flex justify-center items-center gap-8 my-2">
        <button
          className="border text-white bg-cyan-600 rounded py-[3px] px-4 disabled:bg-gray-400"
          onClick={handlePagePrev}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="border py-[3px] px-4 text-white bg-cyan-600 rounded  disabled:bg-gray-400"
          onClick={handlePageNext}
          disabled={currentPage === data?.numOfPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
