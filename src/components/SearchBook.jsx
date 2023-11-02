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

  console.log(bookData)

  return (
    <div className="mt-4">
      <input
        type="text"
        className="border-2 outline-none px-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {bookData?.items?.map((book) => (
        <div
          key={book?.id}
          className="mt-4"
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
