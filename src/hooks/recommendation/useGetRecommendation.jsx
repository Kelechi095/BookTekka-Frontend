import { useQuery } from "react-query"
import { customFetch } from "../../utils/customFetch"

export default function useGetRecommendation() {

    const fetchRecommendation = async(searchQuery) => {
        const response = await customFetch.get(`/recommend?${searchQuery}`)
        return response.data
    }
    const {data, isLoading} = useQuery('recommendation', (searchQuery) => fetchRecommendation(searchQuery), {
        cacheTime: 0
    })

  return {data, isLoading}
}
