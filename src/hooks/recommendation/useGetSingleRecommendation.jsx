import { useQuery } from 'react-query'
import { customFetch } from '../../utils/customFetch';

const fetchRec = async(id) => {
    const response = await customFetch.get(`/recommend/${id}`)
    return response.data
}

export default function useGetSingleRecommendation(id) {

    const {data: book, isLoading} = useQuery("singleRecommendation", () => fetchRec(id), {
        cacheTime: 0,
    })

  return {book, isLoading}
}
