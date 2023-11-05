import { useQuery } from "react-query";
import { fetchBooks } from "../utils/fetchbooks";
import { useEffect, useState } from "react";

export default function useGetTodos(searchQuery) {
  const booksQuery = useQuery(["books", searchQuery], () => fetchBooks(searchQuery), {
  });

  const { data: books, isLoading } = booksQuery;

  return { books, isLoading};
}
