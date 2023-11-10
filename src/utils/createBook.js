import { customFetch } from "./customFetch"

export const createBook = async(book) => {
    await customFetch.post(`/books`, book)
}
