import { useMutation } from "react-query";
import { deleteBook } from "../utils/deleteBook";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";


export default function useDeletebooks() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

  const { mutate: deleteBookMutate } = useMutation((id) => deleteBook(id), {
    onSuccess: () => {
        queryClient.invalidateQueries(["books"])
        navigate('/')
    }
  });

  return { deleteBookMutate };
}
