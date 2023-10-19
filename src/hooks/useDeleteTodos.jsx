import React from "react";
import { useMutation } from "react-query";
import { deleteTodos } from "../utils/deleteTodos";
import { useQueryClient } from "react-query";


export default function useDeleteTodos() {
    const queryClient = useQueryClient()

  const { mutate: deleteTodoMutate } = useMutation((id) => deleteTodos(id), {
    onSuccess: () => {
        queryClient.invalidateQueries("todos")
    }
  });

  return { deleteTodoMutate };
}
