import axios from "axios";

export const fetchBooks = async (params) => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_ENDPOINT}/api/books?${params}`)
    return response.data
  };