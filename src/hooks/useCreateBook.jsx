import { useMutation } from "react-query";
import { createBook } from "../utils/createBook";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export default function useCreateTodo() {

    const navigate = useNavigate()

    const queryClient = useQueryClient()
  const {mutate: createTodoMutate, isLoading: isSubmitting} = useMutation((todo) => createBook(todo), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      navigate("/")
    },
  });

  return {createTodoMutate, isSubmitting}
}
