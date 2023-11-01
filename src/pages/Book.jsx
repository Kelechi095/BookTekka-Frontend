import React, { useEffect } from 'react'
import useGetBook from '../hooks/useGetBook'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import { useQueryClient } from "react-query";


export default function Book() {
    const queryClient = useQueryClient()
    const {id} = useParams()
    const {book, isLoading} = useGetBook(id)

    if(isLoading) return <Loader />


  return (

    <div>
        <h2 className='text-lg'>{book.title}</h2>
        <p className='text-md'>{book.author}</p>
    </div>
  )
}
