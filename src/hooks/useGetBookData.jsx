import React from 'react'
import { useQuery } from 'react-query'
import { fetchBookData } from '../utils/fetchBookData'

export default function useGetBookData(arg) {
    const {data: bookData, isLoading} = useQuery(['bookData', arg], () => fetchBookData(arg))

  return {bookData}
}
