import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { filterGenres, statusOptions2 } from "../utils/buttons";
import { statusOptions } from "../utils/buttons";
import useGetBook from "../hooks/useGetBook";
import Loader from "../components/Loader";
import { customFetch } from "../utils/customFetch";
import Nav from "../components/Nav";
import {toast} from 'react-toastify'

export default function EditTodo() {
  const [formData, setFormData] = useState({
    genre: "",
    status: "",
  });

  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const { book, isLoading } = useGetBook(id);

  const queryClient = useQueryClient();

  const setBook = async () => {
    formData.price = book?.price;
    formData.genre = book?.genre;
    formData.status = book?.status;
  };

  useEffect(() => {
    setBook();
  }, [id]);

  const editBook = async () => {
    await customFetch.patch(`/books/${id}`, formData);
  };

  const { mutate: editMutate, isLoading: isSubmitting } = useMutation(
    editBook,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("books");
        toast.success("Book updated", {
          position: toast.POSITION.TOP_CENTER,
          className: "text-xs",
        });
        navigate("/library");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.error.split(' ')[0] === "Book" ? "Status is not a valid input" : '', {
              position: toast.POSITION.TOP_CENTER,
              className: "text-xs",
            });
      },
    }
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.price = Number(formData.price);
    editMutate();
  };

  return (
    <div className="mx-auto text-slate-900 grid lg:grid-cols-10 gap-2 relative">
      <div className="hidden lg:grid justify-center px-4 lg:fixed lg:w-[20%] lg:left-0  bg-white border-r h-screen">
        <Nav />
      </div>
      <div className=" px-4 lg:absolute lg:right-0 lg:w-[80%] mb-4 mt-8 p-2">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className="font-bold text-xl font-mono">Edit book</h1>
            <img
              src={book?.thumbnail}
              alt={book?.title}
              className="mx-auto my-4"
            />
            <p className="text-md font-semibold text-center">{book?.title}</p>
            <p className="text-sm font-semibold text-center">{book?.author}</p>
            {book && (
              <form
                className=" bg-white py-8 my-6 shadow-sm rounded w-full max-w-xs lg:max-w-md mx-auto"
                onSubmit={handleSubmit}
              >
                <h1 className="text-lg text-center font-semibold text-slate-800">
                  Edit Book Details
                </h1>
                <div className="grid gap-4 p-4">
                  <select
                    name="genre"
                    value={formData.genre}
                    className="text-sm  text-slate-800 outline-none border-t px-1 py-2 bg-zinc-100 cursor-pointer"
                    onChange={handleChange}
                  >
                    {filterGenres.slice(1).map((genre, index) => (
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
