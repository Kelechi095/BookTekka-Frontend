import axios from "axios";

export const fetchBooks = async (searchQuery) => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_ENDPOINT}/api/books?${searchQuery}`)
    return response.data
  };