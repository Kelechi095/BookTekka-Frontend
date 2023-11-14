import { useQuery } from "react-query"
import { customFetch } from "../../utils/customFetch"

export default function useAddToLibrary() {

    const addToLibrary = async(id) => {
        const response = await customFetch.post(`/recommend/${id}`)
        return response.data
    }
    const {isLoading, mutate: addToLibraryMutation} = useQuery('books', (id) => addToLibrary(id))
    
  return {isLoading, addToLibraryMutation}
}
