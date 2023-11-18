import { useState } from "react";
import useGetBookData from "../hooks/useGetBookData";
import BookBoarding from "../components/BookBoarding";
import SearchBook from "../components/SearchBook";
import Nav from "../components/Nav";

export default function AddTodo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookInfo, setBookInfo] = useState(null);

  const { bookData } = useGetBookData(searchTerm);

  console.log(bookData)

  return (
    <div className="mx-auto text-slate-900 grid lg:grid-cols-10 gap-2 relative">
      <div className="hidden lg:grid justify-center px-4 lg:fixed lg:w-[20%] lg:left-0  bg-white border-r h-screen">
        <Nav />
      </div>
      <div className=" px-4 lg:absolute lg:right-0 lg:w-[80%] mb-4 mt-8 p-2">
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
