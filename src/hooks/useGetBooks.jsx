import { useQuery } from "react-query";
import { fetchBooks } from "../utils/fetchbooks";
import { useEffect, useState } from "react";

export default function useGetTodos() {
  const booksQuery = useQuery("books", fetchBooks, {
  });

  const { data: books, isLoading, error } = booksQuery;

  return { books, isLoading };
}
