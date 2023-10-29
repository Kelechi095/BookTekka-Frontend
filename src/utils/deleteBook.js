import axios from "axios"

export const deleteBook = async(id) => {
    await axios.delete(`${import.meta.env.VITE_BASE_ENDPOINT}/api/books/${id}`)
}
