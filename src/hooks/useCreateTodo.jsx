import { useMutation } from "react-query";
import { createTodos } from "../utils/createTodo";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export default function useCreateTodo() {

    const navigate = useNavigate()

    const queryClient = useQueryClient()
  const {mutate: createTodoMutate, isLoading: isSubmitting} = useMutation((todo) => createTodos(todo), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      navigate("/")
    },
  });

  return {createTodoMutate, isSubmitting}
}
