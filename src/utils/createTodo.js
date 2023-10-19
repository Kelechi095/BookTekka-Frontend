import axios from "axios"

export const createTodos = async(todo) => {
    await axios.post(`import.meta.env.BASE_ENDPOINT/api/todos`, todo)
}

//import.meta.env