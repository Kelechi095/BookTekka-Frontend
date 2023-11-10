import React from "react";
import useDeletebooks from "../hooks/useDeleteBook";

export default function DeleteBookModal({ handleCloseDeleteModal, bookID }) {
  const { deleteBookMutate } = useDeletebooks();

  const handleDelete = () => {
    deleteBookMutate(bookID);
    handleCloseDeleteModal();
  };

  return (
    <div
      className=" inset-0 fixed  bg-black bg-opacity-30 min-h-screen z-10 flex items-center justify-center"
      onClick={handleCloseDeleteModal}
    >
      <div
        className="h-40 w-96 max-w-xs border bg-white mb-24 p-2 rounded shadow-sm text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="border px-4 text-red-500 border-red-500 mb-2"
          onClick={handleCloseDeleteModal}
        >
          X
        </button>
        <p className="text-center text mt-2">
          Are you sure you want to delete this book from your library?
        </p>
        <div className="flex justify-around mt-3">
          <button
            className="border border-green-500 py-[3px] px-4"
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            className="border border-red-500 py-[3px] p-1 px-4"
            onClick={handleCloseDeleteModal}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
