import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGetTodos from "../hooks/useGetTodos";
import useDeleteTodos from "../hooks/useDeleteTodos";
import Loader from "../components/Loader";


export default function Home() {
  const { todos, isLoading } = useGetTodos();

  const { deleteTodoMutate } = useDeleteTodos();

  console.log(todos);

  if (isLoading) return <Loader />

  return <div className="mx-auto bg-zinc-100 text-slate-900">
    <div className="bg-white p-6">
      <p className="font-semibold text-sm">Sort by</p>
      <div className="mt-2 grid gap-4 grid-cols-2 text-[13px]">
        <button className="border-2 border-blue-500 p-[6px] text-blue-600 bg-zinc-100 rounded">Task</button>
        <button className="border p-[6px] bg-zinc-100 rounded">Date</button>
        <button className="border p-[6px] bg-zinc-100 rounded">Date</button>
        <button className="border p-[6px] bg-zinc-100 rounded">Order ID</button>
      </div>
    </div>
  </div>;
}
