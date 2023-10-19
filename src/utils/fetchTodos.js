import axios from "axios";

export const fetchTodos = async () => {
    const response = await fetch("https://keltdmapi.onrender.com/api/todos")
    return response.json()
  };