import axios from "axios"

export const createBook = async(book) => {
    await axios.post(`${import.meta.env.VITE_BASE_ENDPOINT}/api/books`, book)
}
