import axios from "axios"

export const deleteTodos = async(id) => {
    await axios.delete(`${import.meta.env.VITE_BASE_ENDPOINT}/api/books/${id}`)
}
