import React from "react";
import { useMutation } from "react-query";
import { deleteBook } from "../utils/deleteBook";
import { useQueryClient } from "react-query";


export default function useDeletebooks() {
    const queryClient = useQueryClient()

  const { mutate: deleteBookMutate } = useMutation((id) => deleteBook(id), {
    onSuccess: () => {
        queryClient.invalidateQueries("books")
    }
  });

  return { deleteBookMutate };
}
