import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams, useNavigate } from "react-router-dom";


export default function EditTodo() {
  const [title, setTitle] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const queryClient = useQueryClient();

  const setBook = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_ENDPOINT}/api/books/${id}`);
    setTitle(response.data.title);
  };
  useEffect(() => {
    setBook();
  }, [id]);

  const editBook = async () => {
    await axios.patch(`${import.meta.env.VITE_BASE_ENDPOINT}/api/books/${id}`, { title });
  };

  const { mutate: editMutate, isLoading } = useMutation(editBook, {
    onSuccess: () => {
      queryClient.invalidateQueries("books");
      navigate("/");
    },
  });

  const handleEditBook = async (e) => {
    e.preventDefault();
    editMutate();
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Edit Book</h1>
      <form className="flex flex-col gap-4" onSubmit={handleEditBook}>
        <input
          type="text"
          placeholder="Todo..."
          className="bg-slate-200 p-3 rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="border w-20 border-black rounded hover:bg-slate-300">
          {isLoading ? "Editing..." : "Edit Book"}
        </button>
      </form>
    </div>
  );
}
