import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { AiOutlinePlus } from "react-icons/ai";
import { useQuery } from "react-query";
import { fetchBooks } from "../utils/fetchbooks";
import useDebounce from "../hooks/useDebounce";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import SortFilter from "../components/SortFilter";
import Books from "../components/Books";
import { FaTimes } from "react-icons/fa";
import useGetContext from "../hooks/useGetContext";
import Nav from "../components/Nav";

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
    navigate("add-book");
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

  return (
    <div className="mx-auto text-slate-900 grid lg:grid-cols-10 gap-2 relative">
      <div className="hidden lg:grid justify-center px-4 lg:fixed lg:w-[20%] lg:left-0  bg-white border-r h-screen">
        <Nav />
      </div>
      <div className=" p-4 lg:absolute lg:right-0 lg:w-[80%] lg:py-0">
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

        <div className="bg-white py-4 px-2 lg:px-16 mx-auto shadow-sm">
          <h2 className="hidden lg:block text-center text-2xl px-4 py-2 font-semibold uppercase text-slate-600">
            Library
          </h2>
          <div className="justify-end hidden lg:flex ">
            <AiOutlinePlus size={30} className=" hover:text-blue-500 cursor-pointer" onClick={handleAddBook}/>
          </div>
          <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

          <SortFilter
            isSort={isSort}
            isFilter={isFilter}
            sortTerm={sortTerm}
            setSortTerm={setSortTerm}
            setStatusTerm={setStatusTerm}
            statusTerm={statusTerm}
            toggleFilterBar={toggleFilterBar}
            toggleSortBar={toggleSortBar}
          />
        </div>

        {isLoading && debouncedValue ? (
          <Loader />
        ) : debouncedValue && data?.books?.length < 1 ? (
          <div className="h-60 flex items-center justify-center">
            <h2 className="text-slate-800 text-2xl">Search result not found</h2>
          </div>
        ) : !debouncedValue && data?.books?.length < 1 ? (
          <div className="h-60 flex items-center justify-center">
            <h2 className="text-slate-800 text-2xl">Your library is Empty</h2>
          </div>
        ) : isLoading ? (
          <Loader />
        ) : (
          <Books data={data} />
        )}

        {isLoading ||
        data?.books?.length < 1 ||
        (debouncedValue && data?.books?.length < 1) ? null : (
          <Pagination
            data={data}
            currentPage={currentPage}
            handlePageNext={handlePageNext}
            handlePagePrev={handlePagePrev}
          />
        )}
      </div>
    </div>
  );
}
