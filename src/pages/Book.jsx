import { useState } from "react";
import useGetBook from "../hooks/useGetBook";
import Loader from "../components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import CircularProgressbarComponent from "../components/CircularProgressbarComponent";
import UpdateProgressModal from "../components/UpdateProgressModal";
import DeleteBookModal from "../components/DeleteBookModal";
import Header from "../components/Header";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { customFetch } from "../utils/customFetch";
import { toast } from "react-toastify";

export default function Book() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const { id } = useParams();
  const { book, isLoading } = useGetBook(id);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const addBookRec = async () => {
    const response = await customFetch.post(`/recommend`, {
      title: book.title,
      author: book.author,
      description: book.description,
      genre: book.genre,
      thumbnail: book.thumbnail,
      smallThumbnail: book.smallThumbnail,
    });

    return response.data;
  };

  const { isLoading: isRecommending, mutate: addBookRecMutation } = useMutation(
    "recommendation",
    () => addBookRec(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("recommendation");
        toast.success("Book added to recommendation list", {
          position: toast.POSITION.TOP_CENTER,
          className: "text-xs",
        }),
          navigate("/recommendations");
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.msg || error?.response?.data?.error,
          {
            position: toast.POSITION.TOP_CENTER,
            className: "text-xs",
          }
        );
      },
    }
  );

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleShowProgressModal = () => {
    setShowProgressModal(true);
  };

  const handleCloseProgressModal = () => {
    setShowProgressModal(false);
  };

  const handleSubmit = () => {
    addBookRecMutation();
  };

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto text-slate-900 p-4">
      <h1 className="font-bold text-xl font-mono">Book details</h1>
      {showDeleteModal && (
        <DeleteBookModal
          handleCloseDeleteModal={handleCloseDeleteModal}
          bookID={id}
        />
      )}

      {showProgressModal && (
        <UpdateProgressModal
          handleCloseProgressModal={handleCloseProgressModal}
          bookID={id}
        />
      )}

      <div className="flex justify-between items-center"></div>
      <div className="p-4 bg-white mt-4">
        <img
          src={book?.thumbnail}
          alt={book?.title}
          className="w-40 mx-auto rounded
            mb-4"
        />
        <h2 className="text-lg font-bold mt-8">{book?.title}</h2>
        <h2 className="text-sm font-semibold">{book?.author}</h2>
        <h2 className="text-xs font-semibold">{book?.genre}</h2>
        {book?.description && (
          <h2 className="text-xs font-base mt-1">
            <span className="font-bold">Description: </span> {book?.description}
          </h2>
        )}
      </div>

      <div className="mx-2 mb-4 flex gap-2">
        <Link to={`/edit-book/${id}`}>
          <button
            size={20}
            className="text-white flex items-center gap-1 bg-blue-500 rounded m-2 text-xs border py-[6px] px-2 cursor-pointer"
          >
            <BiSolidEditAlt />
            Edit
          </button>
        </Link>
        <button
          size={18}
          className="text-white flex gap-1 items-center bg-red-500 rounded m-2 text-xs px-2 py-[6px] border cursor-pointer"
          onClick={handleShowDeleteModal}
        >
          <BsFillTrashFill />
          Delete
        </button>
        <button
          size={18}
          className="text-white flex gap-1 items-center bg-green-500 m-2 rounded text-xs px-2 py-[6px] border cursor-pointer"
          onClick={handleSubmit}
        >
          <IoEyeSharp />
          {isRecommending ? "Submitting" : "Recommend"}
        </button>
      </div>


      {book?.status === "Reading" && (
        <div className="p-4 mt-1 mx-1 shadow-sm">
          {book.progress > 0 && (
            <CircularProgressbarComponent progress={book.progress} />
          )}

          <button
            className="text-xs mt-4 text-cyan-600 rounded-full border border-cyan-600 px-3 py-[6px]"
            onClick={handleShowProgressModal}
          >
            {book?.progress > 0 ? "Update progress" : "Start progress"}
          </button>
        </div>
      )}
    </div>
  );
}
