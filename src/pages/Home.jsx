import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGetTodos from "../hooks/useGetTodos";
import useDeleteTodos from "../hooks/useDeleteTodos";

export default function Home() {
  const { todos, isLoading} = useGetTodos();

  const { deleteTodoMutate } = useDeleteTodos();

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className="px-6 py-4 max-w-lg mx-auto">
      <Link to="/add-todo" className="underline text-blue-500">
        Add Todo
      </Link>
      {todos &&
        todos.map((todo) => (
          <div
            key={todo._id}
            className="flex justify-between items-center mt-2"
          >
            <h4 className="font-semibold">{todo.title}</h4>
            <div className="button-container flex gap-4">
              <Link to={`/edit-todo/${todo._id}`}>
                <button className="border border-black px-4 py-1 rounded text-xs hover:bg-green-700 border-none bg-green-600 text-white">
                  Edit
                </button>
              </Link>
              <button
                className="border border-black px-4 py-1 rounded text-xs hover:bg-red-700 border-none bg-red-600 text-white"
                onClick={() => deleteTodoMutate(todo._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
