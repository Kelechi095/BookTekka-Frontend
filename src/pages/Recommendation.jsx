import Header from "../components/Header";
import useGetRecommendation from "../hooks/recommendation/useGetRecommendation";

import { customFetch } from "../utils/customFetch";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import useDebounce from "../hooks/useDebounce";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import SortGenre from "../components/SortGenre";
import Recommendations from "../components/Recommendations";
import { useSearchParams, useLocation } from "react-router-dom";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Recommendation() {
  const [isFilter, setIsFilter] = useState(false);
  const [isSort, setIsSort] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const debouncedValue = useDebounce(searchTerm, 500);
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortQueryTerm, setSortQueryTerm] = useState("Newest");
  const [genreQueryTerm, setGenreQueryTerm] = useState("All");
  const [searchQueryTerm, setSearchQueryTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(
    !searchParams.get("page") ? 1 : Number(searchParams.get("page"))
  );
  const [pageQueryTerm, setPageQueryTerm] = useState(null);

  const searchQuery = `sort=${sortQueryTerm || "Newest"}&genre=${
    genreQueryTerm || "All"
  }&search=${searchQueryTerm || ""}&limit=8&page=${pageQueryTerm}`;

  const queryClient = useQueryClient();

  console.log("currentPage:", currentPage)
  console.log("pageQueryTerm:", pageQueryTerm)

  const fetchUser = async () => {
    const response = await customFetch.get("/auth/user");
    return response.data;
  };

  const fetchRecs = async () => {
    const response = await customFetch.get(`/recommend?${searchQuery}`);
    return response.data;
  };

  const { data, isLoading } = useQuery(
    ["singleRecommendation", searchQuery],
    () => fetchRecs(searchQuery)
  );

  const likeBook = async (id) => {
    await customFetch.patch(`/recommend/likes/${id}`);
  };

  const { data: user } = useQuery("user", fetchUser);

  const { mutate: likeMutate } = useMutation((id) => likeBook(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("singleRecommendation");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });

  const addBookLib = async (book) => {
    const response = await customFetch.post(`/recommend/add`, {
      title: book.title,
      author: book.author,
      description: book.description,
      genre: book.genre,
      thumbnail: book.thumbnail,
      smallThumbnail: book.smallThumbnail,
    });

    return response.data;
  };

  const { isLoading: isAdding, mutate: addBookLibMutation } = useMutation(
    "books",
    (book) => addBookLib(book),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("books");
        toast.success("Book added to library"), navigate("/library");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.msg || error?.response?.data?.error);
      },
    }
  );

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

  

  const handlePagePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      searchParams.set("page", currentPage - 1);
      setSearchParams(searchParams);
    }
  };

  const clickPaginate = (value) => {
    setPageQueryTerm(value);
    setCurrentPage(value)
    searchParams.set("page", value);
    setSearchParams(searchParams);
  };

  const handleLike = (id) => {
    likeMutate(id);
  };

  const handleAddToLibrary = (book) => {
    addBookLibMutation(book);
  };

  const handleSort = (arg) => {
    searchParams.delete("page");
    setCurrentPage(1);
    searchParams.set("sort", arg);
    setSearchParams(searchParams);
  };
  const handleGenre = (arg) => {
    searchParams.delete("page");
    setCurrentPage(1);
    searchParams.set("genre", arg);
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
    setGenreQueryTerm(searchParams.get("genre"));
    setSearchQueryTerm(searchParams.get("search"));
    setPageQueryTerm(searchParams.get("page"));
  }, [searchParams]);

  const pagArrayLength = data?.numOfPages + 1

  return (
    <div className="container">
      <div className=" px-4">
        <Header title={"BookTekka"} />

        <div className="content">
          <h2 className="hidden lg:block text-center text-3xl py-2 px-4 font-semibold uppercase font-mono text-neutral-500">
            Recommendations
          </h2>
          <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

          <SortGenre
            isSort={isSort}
            isFilter={isFilter}
            toggleFilterBar={toggleFilterBar}
            toggleSortBar={toggleSortBar}
            handleSort={handleSort}
            handleGenre={handleGenre}
          />
        </div>

        {isLoading && debouncedValue ? (
          <Loader />
        ) : debouncedValue && data.recommendations?.length < 1 ? (
          <div className="h-60 flex items-center justify-center">
            <h2 className="text-slate-800 text-2xl">Search result not found</h2>
          </div>
        ) : !debouncedValue && data?.recommendations?.length < 1 ? (
          <div className="h-60 flex items-center justify-center">
            <h2 className="text-slate-800 text-2xl">No recommendations</h2>
          </div>
        ) : isLoading ? (
          <Loader />
        ) : (
          <Recommendations
            data={data}
            handleLike={handleLike}
            handleAddToLibrary={handleAddToLibrary}
            user={user}
          />
        )}

        {isLoading ||
        data?.recommendations?.length < 1 ||
        (debouncedValue && data?.books?.length < 1) ? null : (
          <Pagination
            data={data}
            handlePageNext={handlePageNext}
            handlePagePrev={handlePagePrev}
            currentPage={currentPage}
            pagArrayLength={pagArrayLength}
            clickPaginate={clickPaginate}
            pageQueryTerm={pageQueryTerm}
          />
        )}
      </div>
      
    </div>
  );
}
