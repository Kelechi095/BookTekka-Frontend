import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useCreateBook from "../hooks/useCreateBook";

export default function AddTodo() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    genre: "",
    status: "",
  });
  const navigate = useNavigate();

  const { createBookMutate, isSubmitting } = useCreateBook();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBookMutate({ formData });
  };

  console.log(formData)

  return (
    <div className="p-3 max-w-lg mx-auto bg-zinc-100 h-screen">
      <Link to="/" className="underline text-blue-500 hover:text-blue-700">
        Back to home
      </Link>

      <form
        className=" bg-white py-4 mt-6 shadow-sm rounded"
        onSubmit={handleSubmit}
      >
        <h1 className="text-lg text-center font-semibold text-slate-800">
          Add Book
        </h1>
        <div className="grid gap-4 p-4">
          <div>
            <label className="text-sm">Title</label>
            <input
              type="text"
              placeholder="Title"
              className="bg-zinc-100 p-2 mt-2 w-full outline-none text-sm"
              name="title"
              value={formData.title}
              onChange={handleChange}
              
            />
          </div>
          <div>
            <label className="text-sm">Author</label>
            <input
              type="text"
              placeholder="Author"
              className="bg-zinc-100 p-2 mt-2 w-full outline-none text-sm"
              name="author"
              value={formData.author}
              onChange={handleChange}
              
            />
          </div>
          <div>
            <label className="text-sm mb-12">Price</label>
            <input
              type="text"
              placeholder="Price"
              className="bg-zinc-100 p-2 mt-2 w-full outline-none text-sm"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <button className="border w-full px-4 rounded text-white p-2 bg-blue-500">
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
