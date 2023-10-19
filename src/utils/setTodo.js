import axios from 'axios'

export const setTodo = async(id) => {
    const response = await axios.get(`https://keltdmapi.onrender.com/api/todos/${id}`)
    return response.data
}