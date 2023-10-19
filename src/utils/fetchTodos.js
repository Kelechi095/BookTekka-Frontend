import axios from "axios";

export const fetchTodos = async () => {
    const response = await fetch("import.meta.env.BASE_ENDPOINT/api/todos")
    return response.json()
  };