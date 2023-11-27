import { useMutation } from "react-query";
import { createBook } from "../utils/createBook";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast'

export default function useCreateBook() {

    const navigate = useNavigate()

    const queryClient = useQueryClient()
  const {mutate: createBookMutation, isLoading: isSubmitting} = useMutation((book) => createBook(book), {
    onSuccess: () => {
      queryClient.invalidateQueries("books");
      navigate("/library")
      toast.success("Book added to library");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.msg || error?.response?.data?.error);
    }
  });

  return {createBookMutation, isSubmitting}
}

