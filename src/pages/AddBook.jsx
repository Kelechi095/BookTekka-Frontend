import { useState } from "react";
import useGetBookData from "../hooks/useGetBookData";
import BookBoarding from "../components/BookBoarding";
import SearchBook from "../components/SearchBook";
import Nav from "../components/Nav";

export default function AddTodo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookInfo, setBookInfo] = useState(null);

  const { bookData } = useGetBookData(searchTerm);

  return (
    <div className="container">
      
      <div className="content">
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
    </div>
  );
}
