import React from "react";

export default function SearchBook({
  bookData,
  searchTerm,
  setSearchTerm,
  setBookInfo,
}) {
  const handleAddBookInfo = (bookInfo) => {
    setBookInfo(bookInfo);
  };

  return (
    <div className="mt-4">
      <div className="mx-auto max-w-sm">
        <input
          type="text"
          placeholder="Search for book..."
          className="border-1 outline-none px-2 py-1 w-full shadow-sm rounded mx-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {bookData?.items?.map((book) => (
        <div
          key={book?.id}
          className="mt-4 cursor-pointer"
          onClick={() =>
            handleAddBookInfo({
              thumbnail: book?.volumeInfo?.imageLinks?.thumbnail,
              smallThumbnail: book?.volumeInfo?.imageLinks?.smallThumbnail,
              description: book?.volumeInfo?.description,
              title: book?.volumeInfo?.title,
              author: book?.volumeInfo?.authors?.[0],
            })
          }
        >
          <img
            src={book?.volumeInfo?.imageLinks?.smallThumbnail}
            alt=""
            className="w-20"
          />
          <p className="text-sm">{book?.volumeInfo?.title}</p>
          <p className="text-sm">{book?.volumeInfo?.authors?.[0]}</p>
        </div>
      ))}
    </div>
  );
}
