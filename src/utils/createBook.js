import axios from "axios"

export const createBook = async(todo) => {
    await axios.post(`${import.meta.env.VITE_BASE_ENDPOINT}/api/books`, todo)
}
