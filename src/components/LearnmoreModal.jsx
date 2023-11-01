import React from "react";

export default function LearnmoreModal({handleCloseModal}) {
  return (
    <div className=" inset-0 fixed  bg-black bg-opacity-30 min-h-screen z-10 flex items-center justify-center" onClick={handleCloseModal}>
      <div className="h-40 w-96 border bg-white mb-24 p-2 rounded shadow-sm text-sm" onClick={(e) => e.stopPropagation()}>
        <button className="border px-4 text-red-500 border-red-500 mb-2" onClick={handleCloseModal}>
          X
        </button>
        <p className="">Monitor your reading progress</p>
        <p className="">
          Progress is calculated by dividing the total number of pages of the
          book by the current page you are on and finding the percentage
        </p>
      </div>
    </div>
  );
}
