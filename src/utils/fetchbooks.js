import axios from "axios";

export const fetchBooks = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_ENDPOINT}/api/books`)
    return response.data
  };