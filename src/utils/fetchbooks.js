import { customFetch } from "./customFetch";

export const fetchBooks = async (params) => {
    const response = await customFetch.get(`/books?${params}`)
    return response.data
  };