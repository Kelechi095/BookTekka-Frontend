import { useMutation } from "react-query";
import { createBook } from "../utils/createBook";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export default function useCreateBook() {

    const navigate = useNavigate()

    const queryClient = useQueryClient()
  const {mutate: createBookMutation, isLoading: isSubmitting} = useMutation((book) => createBook(book), {
    onSuccess: () => {
      queryClient.invalidateQueries("books");
      navigate("/")
    },
  });

  return {createBookMutation, isSubmitting}
}
