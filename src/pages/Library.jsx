import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

export default function Home() {
  const [isFilter, setIsFilter] = useState(false);
  const [isSort, setIsSort] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const [sortQueryTerm, setSortQueryTerm] = useState("Newest");
  const [statusQueryTerm, setStatusQueryTerm] = useState("All");
  const [searchQueryTerm, setSearchQueryTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(!searchParams.get("page") ? 1 : Number(searchParams.get("page")) );
  const [pageQueryTerm, setPageQueryTerm] = useState(null);

  const navigate = useNavigate();

  const debouncedValue = useDebounce(searchTerm, 500);

  const searchQuery = `sort=${sortQueryTerm || "Newest"}&status=${
    statusQueryTerm || "All"
  }&search=${searchQueryTerm || ""}&limit=4&page=${pageQueryTerm}`;

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
      searchParams.set("page", currentPage + 1);
      setSearchParams(searchParams);
    }
  };

  const clickPaginate = (value) => {
    setPageQueryTerm(value);
    setCurrentPage(value)
    searchParams.set("page", value);
    setSearchParams(searchParams);
  };


  const handlePagePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      searchParams.set("page", currentPage - 1);
      setSearchParams(searchParams);
    }
  };

  const handleSort = (arg) => {
    searchParams.delete("page");
    setCurrentPage(1);
    searchParams.set("sort", arg);
    setSearchParams(searchParams);
  };

  const handleStatus = (arg) => {
    searchParams.delete("page");
    setCurrentPage(1);
    searchParams.set("status", arg);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (debouncedValue) {
      searchParams.delete("page");
      setCurrentPage(1);
      searchParams.set("search", debouncedValue);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  }, [debouncedValue]);

  useEffect(() => {
    setSortQueryTerm(searchParams.get("sort"));
    setStatusQueryTerm(searchParams.get("status"));
    setSearchQueryTerm(searchParams.get("search"));
    setPageQueryTerm(searchParams.get("page"));
  }, [searchParams]);

  const pagArrayLength = data?.numOfPages + 1

  return (
    <div className="container">
      <div className="px-4">
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

        <div className="content">
          <h2 className="hidden lg:block text-center text-3xl py-2 px-4 font-semibold uppercase font-mono text-neutral-500">
            Library
          </h2>

          <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

          <SortFilter
            isSort={isSort}
            isFilter={isFilter}
            handleSort={handleSort}
            handleStatus={handleStatus}
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
            pagArrayLength={pagArrayLength}
            clickPaginate={clickPaginate}
          />
        )}
      </div>
    </div>
  );
}
