import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
//import { Ring } from '@uiball/loaders'

export default function EditTodo() {
  const [title, setTitle] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const queryClient = useQueryClient();

  const setTodo = async () => {
    const response = await axios.get(`import.meta.env.VITE_BASE_ENDPOINT/api/todos/${id}`);
    setTitle(response.data.title);
  };
  useEffect(() => {
    setTodo();
  }, [id]);

  const editTodo = async () => {
    await axios.patch(`import.meta.env.VITE_BASE_ENDPOINT/api/todos/${id}`, { title });
  };

  const { mutate: editMutate, isLoading } = useMutation(editTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      navigate("/");
    },
  });

  const handleEditTodo = async (e) => {
    e.preventDefault();
    editMutate();
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Edit Todo</h1>
      <form className="flex flex-col gap-4" onSubmit={handleEditTodo}>
        <input
          type="text"
          placeholder="Todo..."
          className="bg-slate-200 p-3 rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="border w-20 border-black rounded hover:bg-slate-300">
          {isLoading ? "Editing..." : "Edit Todo"}
        </button>
      </form>
    </div>
  );
}
