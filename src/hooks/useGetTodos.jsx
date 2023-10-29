import { useQuery } from "react-query";
import { fetchTodos } from "../utils/fetchTodos";
import { useEffect, useState } from "react";

export default function useGetTodos() {
  const todosQuery = useQuery("todos", fetchTodos, {
    staleTime: 10 * (60 * 1000), // 10 mins
    cacheTime: 15 * (60 * 1000), // 15 mins
  });

  const { data: todos, isLoading, error } = todosQuery;

  return { todos, isLoading };
}
