import { useState } from "react";
import useGetBook from "../hooks/useGetBook";
import Loader from "../components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import ProgressbarComponent from "../components/CircularProgressbarComponent";
import UpdateProgressModal from "../components/UpdateProgressModal";
import DeleteBookModal from "../components/DeleteBookModal";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { customFetch } from "../utils/customFetch";
import { toast } from "react-toastify";
import Nav from "../components/Nav";
import CircularProgressbarComponent from "../components/CircularProgressbarComponent";

export default function Book() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [isFull, setIsFull] = useState(false);
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
          navigate("/");
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

  console.log(book);

  const handleShowMore = () => {
    setIsFull(!isFull);
  };

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

  return (
    <div className="mx-auto text-slate-900 grid lg:grid-cols-10 gap-2 relative">
      <div className="hidden lg:grid justify-center px-4 lg:fixed lg:w-[20%] lg:left-0  bg-white border-r h-screen">
        <Nav />
      </div>
      <div className=" px-4 lg:absolute lg:right-0 lg:w-[80%] my-2 gap-4">
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
            pagesRemaining={book.pagesRemaining}
            currentPage={book.currentPage}
            totalPages={book.totalPages}
          />
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <div className="mt-6">
            <div className="lg:grid-cols-10 grid gap-4 border-b mb-1 p-4">
              <div className="col-span-3">
                <img
                  src={book?.thumbnail}
                  alt={book?.title}
                  className="w-40 lg:w-44 rounded"
                />
              </div>
              <div className="col-span-7">
                <h2 className="text-lg lg:text-2xl font-bold mt-2">
                  {book?.title}
                </h2>
                <h2 className="text-sm lg:text-base font-semibold">
                  <span className="font-bold">Author: </span>
                  {book?.author}
                </h2>
                <h2 className="text-sm lg:text-base font-semibold">
                  <span className="font-bold">Genre: </span>
                  {book?.genre}
                </h2>
                {book?.description && (
                  <h2 className="text-sm font-base">
                    <span className="font-bold">Description: </span>{" "}
                    {isFull ? book.description : book.description.slice(0, 570)}
                    {isFull ? "" : "..."}
                    <button
                      className="text-blue-500 underline ml-2"
                      onClick={handleShowMore}
                    >
                      {isFull ? "Show less" : "Show more"}
                    </button>
                  </h2>
                )}
                <div className="my-4 flex gap-2">
                  <Link to={`/library/edit-book/${id}`}>
                    <button
                      size={20}
                      className="text-white flex items-center gap-1 bg-blue-500 rounded text-xs border py-[6px] px-2 cursor-pointer"
                    >
                      <BiSolidEditAlt />
                      Edit
                    </button>
                  </Link>
                  <button
                    size={18}
                    className="text-white flex gap-1 items-center bg-red-500 rounded text-xs px-2 py-[6px] border cursor-pointer"
                    onClick={handleShowDeleteModal}
                  >
                    <BsFillTrashFill />
                    Delete
                  </button>
                  <button
                    size={18}
                    className="text-white flex gap-1 items-center bg-green-500 rounded text-xs px-2 py-[6px] border cursor-pointer"
                    onClick={handleSubmit}
                  >
                    <IoEyeSharp />
                    {isRecommending ? "Submitting" : "Recommend"}
                  </button>
                </div>
                {book?.status === "Reading" && (
                  <button
                    className="flex border-cyan-800 gap-1 items-center bg-white text-cyan-800 rounded text-xs px-2 py-[6px] border cursor-pointer"
                    onClick={handleShowProgressModal}
                  >
                    {book?.progress > 0
                      ? "Update progress"
                      : "Monitor progress"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {book?.status === "Reading" && (
          <div className="p-4 mt-1 w-full mx-auto">
            {book.progress > 0 && (
              <div className="p-2 mt-1 w-full mx-auto grid grid-cols-2">
                <div className="flex justify-center flex-col">
                  <h2 className="font-semibold text-xs lg:text-sm mt-2">
                    Total Pages: {book.totalPages}
                  </h2>
                  <h2 className="font-semibold mt-2 text-xs lg:text-sm">
                    Current Page: {book.currentPage}
                  </h2>
                  <h2 className="font-semibold text-xs lg:text-sm">
                    Pages Remaining: {book.pagesRemaining}
                  </h2>
                </div>
                <div className="mx-auto flex flex-col justify-center">
                  <CircularProgressbarComponent progress={book.progress} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
