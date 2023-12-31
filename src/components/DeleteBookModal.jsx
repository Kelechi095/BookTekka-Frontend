import React from "react";
import useDeletebooks from "../hooks/useDeleteBook";
import { LiaTimesSolid } from "react-icons/lia";
import {FaTimes} from 'react-icons/fa'

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
        className="h-40 w-full max-w-xs lg:max-w-sm  border bg-white mb-24 p-2 rounded shadow-sm text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="px-1 mb-2 text-red-500" onClick={handleCloseDeleteModal}>
          <FaTimes size={22}/>
        </button>
        <p className="text-center text mt-2">
          Are you sure you want to delete this book from your library?
        </p>
        <div className="flex justify-around mt-3">
          <button
            className="border rounded bg-green-400 text-white py-[3px] px-6"
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            className="border rounded bg-red-500 text-white py-[3px] p-1 px-6"
            onClick={handleCloseDeleteModal}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
