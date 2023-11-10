import axios from "axios";

export const customFetch = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_ENDPOINT}/api`,
    withCredentials: true
  });
  