import { useQuery } from "react-query";
import { fetchTodos } from "../utils/fetchTodos";
import { useEffect, useState } from "react";

export default function useGetTodos() {

const todosQuery = useQuery("todos", fetchTodos, {
    select: (data) => data.sort((a, b) => a.title.localeCompare(b.title)),
})
  
  const { data: todos, isLoading, error } = todosQuery

  return { todos, isLoading};
}
