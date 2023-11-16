import React, { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { customFetch } from "../utils/customFetch";
import { FaTimes } from "react-icons/fa";

export default function UpdateProgressModal({
  handleCloseProgressModal,
  bookID,
}) {
  const [pageData, setPageData] = useState({
    totalPages: "",
    currentPage: "",
  });

  const updateProgress = async () => {
    const response = await customFetch.patch(
      `books/progress/${bookID}`, pageData
    );
    return response.data;
  };

  const queryClient = useQueryClient();

  const { mutate: updateProgressMutation, isLoading } = useMutation(
    updateProgress,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("book");
      },
    }
  );

  const handleChange = (e) => {
    setPageData({
      ...pageData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProgressMutation();
    handleCloseProgressModal();
  };

  return (
    <div className=" inset-0 fixed  bg-black bg-opacity-30 min-h-screen z-10 flex items-center justify-center">
      <div className="h-50 w-full max-w-xs lg:max-w-sm border bg-white mb-24 p-3 rounded shadow-sm text-sm">
      <button className="px-1 mb-2 text-red-500" onClick={handleCloseProgressModal}>
          <FaTimes size={22}/>
        </button>
        <form className="grid" onSubmit={handleSubmit}>
          <label>Current Page</label>

          <input
            type="text"
            value={pageData.currentPage}
            name="currentPage"
            className="border p-1 outline-none"
            onChange={handleChange}
          />
          <label className="mt-2">Total Pages</label>
          <input
            type="text"
            className="border p-1 outline-none"
            value={pageData.totalPages}
            name="totalPages"
            onChange={handleChange}
          />
          <button className="w-fit py-[3px] px-2 border mt-2 bg-blue-500 text-white rounded">
            {isLoading ? "Submitting" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
