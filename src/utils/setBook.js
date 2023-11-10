import { customFetch } from './customFetch'

export const setBook = async(id) => {
    const response = await customFetch.get(`/books/${id}`)
    return response.data
}