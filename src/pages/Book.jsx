import { useState } from "react";
import useGetBook from "../hooks/useGetBook";
import Loader from "../components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { FaBookOpen } from "react-icons/fa6";
import { TbDropletHalf2Filled } from "react-icons/tb";

import { IoEyeSharp } from "react-icons/io5";
import { GiSandsOfTime } from "react-icons/gi";

import UpdateProgressModal from "../components/UpdateProgressModal";
import DeleteBookModal from "../components/DeleteBookModal";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { customFetch } from "../utils/customFetch";
import { toast } from "react-hot-toast"
import { BiSolidBookAlt } from "react-icons/bi";

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
        toast.success("Book added to recommendation list"),
          navigate("/");
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.msg || error?.response?.data?.error);
      }
    }
  );


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
    <div className="container">
      
      <div className="px-4">
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
          <div className="content">
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
                    className="text-white flex gap-1 items-center bg-red-400 rounded text-xs px-2 py-[6px] border cursor-pointer"
                    onClick={handleShowDeleteModal}
                  >
                    <BsFillTrashFill />
                    Delete
                  </button>
                  <button
                    size={18}
                    className="text-white flex gap-1 items-center bg-green-400 rounded text-xs px-2 py-[6px] border cursor-pointer"
                    onClick={handleSubmit}
                  >
                    <IoEyeSharp />
                    {isRecommending ? "Submitting" : "Recommend"}
                  </button>
                </div>
                {book?.status === "Reading" && (
                  <button
                    className="flex border-cyan-500 gap-1 items-center bg-white text-cyan-400 rounded text-xs px-2 py-[6px] border cursor-pointer"
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
          <div className="lg:p-4 mt-1">
            {book.progress > 0 && (
              <div className="my-2 gap-2 lg:grid lg:grid-cols-2 items-center">
                <div className="border border-b-[6px] shadow-sm  border-b-purple-400 rounded-b h-36 mt-8 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-2xl text-purple-400">
                      {book.progress}%
                    </p>
                    <GiSandsOfTime size={30} className="text-purple-400" />
                  </div>
                  <p className="font-semibold text-purple-400 text-lg">
                    Reading Progress
                  </p>
                </div>
                <div className="border border-b-[6px] shadow-sm  border-b-green-400 rounded-b h-36 mt-8 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-2xl text-green-400">
                      {book.currentPage}
                    </p>
                    <FaBookOpen size={30} className="text-green-400" />
                  </div>
                  <p className="font-semibold text-green-500 text-lg">
                    Current Page
                  </p>
                </div>
                <div className="border border-b-[6px]  border-b-blue-400 rounded-b h-36 mt-8 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-2xl text-blue-400">
                      {book.totalPages}
                    </p>
                    <BiSolidBookAlt size={30} className="text-blue-400" />
                  </div>
                  <p className="font-semibold text-blue-400 text-lg">
                    Total Pages
                  </p>
                </div>
                <div className="border border-b-[6px]  border-b-red-400 rounded-b h-36 mt-8 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-2xl text-red-400">
                      {book.pagesRemaining}
                    </p>
                    <TbDropletHalf2Filled size={30} className="text-red-400" />
                  </div>
                  <p className="font-semibold text-red-400 text-lg">
                    Pages Remaining
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
