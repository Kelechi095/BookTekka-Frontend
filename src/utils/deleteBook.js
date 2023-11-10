
import { customFetch } from "./customFetch"

export const deleteBook = async(id) => {
    await customFetch.delete(`/books/${id}`)
}
