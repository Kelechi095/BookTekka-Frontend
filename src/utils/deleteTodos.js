import axios from "axios"

export const deleteTodos = async(id) => {
    await axios.delete(`import.meta.env.BASE_ENDPOINT/api/todos/${id}`)
}
