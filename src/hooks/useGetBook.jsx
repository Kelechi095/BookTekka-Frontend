import { useQuery } from 'react-query'
import { setBook } from '../utils/setBook'
import { useQueryClient } from "react-query";


export default function useGetBook(id) {
    const queryClient = useQueryClient()

    const {data: book, isLoading} = useQuery("book", () => setBook(id), {
        cacheTime: 0,
    })

  return {book, isLoading}
}
