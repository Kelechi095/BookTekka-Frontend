import { useMutation } from "react-query";
import { createBook } from "../utils/createBook";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

export default function useCreateBook() {

    const navigate = useNavigate()

    const queryClient = useQueryClient()
  const {mutate: createBookMutation, isLoading: isSubmitting} = useMutation((book) => createBook(book), {
    onSuccess: () => {
      queryClient.invalidateQueries("books");
      navigate("/library")
      toast.success("Book added to library", {
        position: toast.POSITION.TOP_CENTER,
        className: "text-xs",
      });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.msg || error?.response?.data?.error,
        {
          position: toast.POSITION.TOP_CENTER,
          className: "text-xs",
        }
      );
    }
  });

  return {createBookMutation, isSubmitting}
}

