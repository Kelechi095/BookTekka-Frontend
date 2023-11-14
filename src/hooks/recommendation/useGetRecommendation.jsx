import { useQuery } from "react-query"
import { customFetch } from "../../utils/customFetch"

export default function useGetRecommendation() {

    const fetchRecommendation = async() => {
        const response = await customFetch.get('/recommend')
        return response.data
    }
    const {data, isLoading} = useQuery('recommendations', fetchRecommendation, {
        cacheTime: 0
    })

  return {data, isLoading}
}
