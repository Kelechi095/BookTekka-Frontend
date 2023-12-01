import { useMutation } from "react-query";
import { deleteBook } from "../utils/deleteBook";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function useDeletebooks() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteBookMutate } = useMutation((id) => deleteBook(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      toast.success("Book deleted");
      navigate("/library");
    },
  });

  return { deleteBookMutate };
}
