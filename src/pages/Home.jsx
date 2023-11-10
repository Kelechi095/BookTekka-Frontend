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

  if (isLoading && !debouncedValue && statusTerm === 'All' && sortTerm === 'Newest') return <Loader />;

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

      <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

      {isLoading ||
      data?.books?.length < 1 ||
      (searchTerm && data?.books?.length < 1) ? null : (
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
      )}

      {isLoading && debouncedValue ? (
        <h1>Loading... </h1>
      ) : debouncedValue && data?.books?.length < 1 ? (
        <div className="h-60 flex items-center justify-center">
          <h2 className="text-slate-800 text-2xl">Search result not found</h2>
        </div>
      ) : !debouncedValue && data?.books?.length < 1 ? (
        <div className="h-60 flex items-center justify-center">
          <h2 className="text-slate-800 text-2xl">Your library is Empty</h2>
        </div>
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
  );
}
