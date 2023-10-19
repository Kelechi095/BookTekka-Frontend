import axios from "axios"

export const deleteTodos = async(id) => {
    await axios.delete(`https://keltdmapi.onrender.com/api/todos/${id}`)
}
