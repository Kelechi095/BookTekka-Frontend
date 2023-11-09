import { useState } from "react";
import useGetBook from "../hooks/useGetBook";
import Loader from "../components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import CircularProgressbarComponent from "../components/CircularProgressbarComponent";
import UpdateProgressModal from "../components/UpdateProgressModal";
import DeleteBookModal from "../components/DeleteBookModal";

export default function Book() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const { id } = useParams();
  const { book, isLoading } = useGetBook(id);

  const navigate = useNavigate();


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


  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto text-slate-900 p-4 bg-violet-50">
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

      <div className="flex justify-between items-center">
        <Link to={`/edit-book/${id}`}>
          <BiSolidEditAlt
            size={25}
            className="text-blue-500 m-2 cursor-pointer"
          />
        </Link>
        <BsFillTrashFill
          size={25}
          className="text-red-500 m-2 cursor-pointer"
          onClick={handleShowDeleteModal}
        />
      </div>
      <div className="p-4 border-2 bg-white rounded mt-4">
        <img
          src={book?.thumbnail}
          alt={book?.title}
          className="w-40 mx-auto rounded
            mb-4"
        />
        <h2 className="text-lg font-bold mt-8">{book?.title}</h2>
        <h2 className="text-sm font-semibold">{book?.author}</h2>
        <h2 className="text-xs font-semibold">{book?.genre}</h2>
        <h2 className="text-xs font-base mt-1">
          <span className="font-bold">Description: </span> {book?.description}
        </h2>
      </div>

      <div className="mt-6 flex gap-2">
        <button className="text-sm bg-green-500 text-white rounded p-2 px-2 w-full hover:bg-green-600">
          Recommend
        </button>
      </div>

      {book?.status === "Reading" && (
        <div className="p-4 border-2 bg-white rounded mt-4">
          {book.progress > 0 && (
            <CircularProgressbarComponent progress={book.progress} />
          )}

          <div className="mt-6 flex justify-around">
            <button
              className="text-sm border border-slate-800 text-base-800 rounded p-1 px-2"
              onClick={handleShowProgressModal}
            >
              {book?.progress > 0 ? "Update progress" : "Start progress"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
