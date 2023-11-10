import React, { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import axios from "axios";

export default function UpdateProgressModal({
  handleCloseProgressModal,
  bookID,
}) {
  const [pageData, setPageData] = useState({
    totalPages: "",
    currentPage: "",
  });

  const updateProgress = async () => {
    const response = await axios.patch(
      `${import.meta.env.VITE_BASE_ENDPOINT}/api/books/progress/${bookID}`, pageData
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
      <div className="h-50 w-96 border bg-white mb-24 p-3 rounded shadow-sm text-sm">
        <button
          className="border px-4 text-red-500 border-red-500 mb-2"
          onClick={handleCloseProgressModal}
        >
          X
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
          <button className="w-fit p-1 border mt-2 bg-blue-500 text-white rounded">
            {isLoading ? "Submitting" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}