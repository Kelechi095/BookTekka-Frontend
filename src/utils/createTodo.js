import axios from "axios"

export const createTodos = async(todo) => {
    await axios.post("https://keltdmapi.onrender.com/api/todos", todo)
}
