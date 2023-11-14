import { useQuery } from "react-query"
import { customFetch } from "../../utils/customFetch"

export default function useBookRec() {

    const likeRec = async(id) => {
        const response = await customFetch.patch(`/recommend/${id}`)
        return response.data
    }
    const {isLoading, mutate: likeRecMutation} = useQuery('recommendation', (id) => likeRec(id))
    
  return {isLoading, likeRecMutation}
}
