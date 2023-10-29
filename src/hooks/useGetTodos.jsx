import { useQuery } from "react-query";
import { fetchTodos } from "../utils/fetchTodos";
import { useEffect, useState } from "react";

export default function useGetTodos() {
  const todosQuery = useQuery("todos", fetchTodos, {
    keepPreviousData: true,
  });

  const { data: todos, isLoading, error } = todosQuery;

  return { todos, isLoading };
}
