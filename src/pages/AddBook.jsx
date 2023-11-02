import { useState } from "react";
import { Link } from "react-router-dom";
import useGetBookData from "../hooks/useGetBookData";
import BookBoarding from "../components/BookBoarding";
import SearchBook from "../components/SearchBook";

export default function AddTodo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookInfo, setBookInfo] = useState(null);


  const { bookData } = useGetBookData(searchTerm);

  return (
    <div className="p-3 max-w-lg mx-auto py-8 bg-zinc-100 h-screen">
      <Link to="/" className="bg-blue-500 p-2 rounded text-xs text-white">
        Back to library
      </Link>

      {bookInfo ? (
        <BookBoarding bookInfo={bookInfo}/>
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
