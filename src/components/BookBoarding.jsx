import { useState } from "react";
import useCreateBook from "../hooks/useCreateBook";
import { filterGenres, statusOptions2 } from "../utils/buttons";
import { statusOptions } from "../utils/buttons";

export default function BookBoarding({ bookInfo }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    thumbnail: "",
    smallThumbnail: "",
    price: "",
    genre: "",
    status: "",
  });

  const { createBookMutation, isSubmitting } = useCreateBook();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.price = Number(formData.price);
    formData.title = bookInfo.title;
    formData.author = bookInfo.author;
    formData.description = bookInfo.description;
    formData.thumbnail = bookInfo.thumbnail;
    formData.smallThumbnail = bookInfo.smallThumbnail;
    console.log(formData);
    createBookMutation(formData);
  };

  return (
    <div className="my-4">
      <img
        src={bookInfo?.thumbnail}
        alt={bookInfo?.title}
        className="mx-auto mb-4"
      />
      <p className="text-md font-semibold text-center">{bookInfo?.title}</p>
      <p className="text-sm font-semibold text-center">{bookInfo?.author}</p>
      <form
        className=" bg-white py-8 my-6 shadow-sm rounded"
        onSubmit={handleSubmit}
      >
        <h1 className="text-lg text-center font-semibold text-slate-800">
          Complete Book Details
        </h1>
        <div className="grid gap-4 p-4 w-full max-w-xs lg:max-w-md mx-auto">
          <select
            name="genre"
            value={formData.genre}
            className="text-sm  text-slate-800 outline-none border-t px-1 py-2 bg-zinc-100 cursor-pointer"
            onChange={handleChange}
          >
            {filterGenres.map((genre, index) => (
              <option key={index}>{genre}</option>
            ))}
          </select>

          <select
            name="status"
            value={formData.status}
            className="text-sm text-slate-800 bg-zinc-100 px-1 py-2 outline-none border-t cursor-pointer"
            onChange={handleChange}
          >
            {statusOptions2.map((status, index) => (
              <option key={index}>{status}</option>
            ))}
          </select>

          <button className="border w-full px-4 rounded text-white p-1 bg-blue-500">
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
