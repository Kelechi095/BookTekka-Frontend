import axios from "axios"

export const createTodos = async(todo) => {
    await axios.post(`${import.meta.env.VITE_BASE_ENDPOINT}/api/books`, todo)
}
