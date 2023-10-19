import axios from "axios";

export const fetchTodos = async () => {
    const response = await axios.get("import.meta.env.VITE_BASE_ENDPOINT/api/todos")
    return response.data
  };