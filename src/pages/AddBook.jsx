import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useCreateBook from "../hooks/useCreateBook";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState('')
  const [price, setPrice] = useState(null)

  const navigate = useNavigate();

  const { createBookMutate, isSubmitting } = useCreateBook();

  const handleSubmit = (e) => {
    e.preventDefault();
    createBookMutate({ title });
  };
  

  return (
    <div className="p-3 max-w-lg mx-auto">
      <Link to="/" className="underline text-blue-500 hover:text-blue-700">
        Back to home
      </Link>
      <h1 className="text-3xl text-center font-semibold my-7">Add Todo</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Todo..."
          className="bg-slate-200 p-3 rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="border w-20 border-black rounded hover:bg-slate-300">
          {isSubmitting ? 'Submitting...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
}
