import { useState } from "react";
import { Link } from "react-router-dom";
import useGetBookData from "../hooks/useGetBookData";
import BookBoarding from "../components/BookBoarding";
import SearchBook from "../components/SearchBook";
import Header from "../components/Header";

export default function AddTodo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookInfo, setBookInfo] = useState(null);

  const { bookData } = useGetBookData(searchTerm);

  return (
    <div className="mx-auto text-slate-900 m-4 mt-6 px-4 mb-8">
      <h1 className="font-bold text-xl font-mono">Add book to library</h1>
      {bookInfo ? (
        <BookBoarding bookInfo={bookInfo} />
      ) : (
        <SearchBook
          setBookInfo={setBookInfo}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          bookData={bookData}
        />
      )}
    </div>
  );
}
