import axios from 'axios'

export const setBook = async(id) => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_ENDPOINT}/api/books/${id}`)
    return response.data
}