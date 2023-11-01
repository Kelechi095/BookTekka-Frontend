import { useState } from "react";
import useGetBook from "../hooks/useGetBook";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import LearnmoreModal from "../components/LearnmoreModal";
import CircularProgressbarComponent from "../components/CircularProgressbarComponent";
import UpdateProgressModal from "../components/UpdateProgressModal";

export default function Book() {
  const [showLearnModal, setShowLearnModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const { id } = useParams();
  const { book, isLoading } = useGetBook(id);

  const navigate = useNavigate();

  const handleBackToLibrary = () => {
    navigate("/");
  };

  const handleShowLearnModal = () => {
    setShowLearnModal(true);
  };

  const handleCloseLearnModal = () => {
    setShowLearnModal(false);
  };
  const handleShowProgressModal = () => {
    setShowProgressModal(true);
  };

  const handleCloseProgressModal = () => {
    setShowProgressModal(false);
  };


  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto text-slate-900 m-4 px-4">
      {showLearnModal && <LearnmoreModal handleCloseLearnModal={handleCloseLearnModal} />}

      {showProgressModal && <UpdateProgressModal handleCloseProgressModal={handleCloseProgressModal} bookID={id}/>}
      <button
        className="border-blue border p-2 rounded mb-2 bg-slate-700 text-white text-sm"
        onClick={handleBackToLibrary}
      >
        Back to Library
      </button>
      <h2 className="text-md font-base">
        <span className="text-md font-semibold">Book Name: </span>
        {book.title}
      </h2>
      <h2 className="text-md font-base">
        <span className="text-md font-semibold">Book Author: </span>
        {book.author}
      </h2>
      <h2 className="text-md font-base">
        <span className="text-md font-semibold">Book Genre: </span>
        {book.genre}
      </h2>

      <div className="mt-2 flex gap-2">
        <button className="text-sm bg-blue-500 text-white rounded p-1 px-2">
          Edit book
        </button>
        <button className="text-sm bg-red-500 text-white rounded p-1 px-2">
          Delete book
        </button>
      </div>

      <div className="mt-6 flex gap-2">
        <button className="text-sm bg-green-500 text-white rounded p-1 px-2">
          Recommend
        </button>
      </div>

      {book.status === "Reading" && (
        
            <div className="mt-8">
          
          <p className="text-sm font-semibold mb-4 text-center">
            {book.progress > 0 ? "Your Reading Progress so far" : "No reading progress"} 
          </p>

          {book.progress > 0 && <CircularProgressbarComponent progress={book.progress}/>}

          
          <div className="mt-6 flex justify-around">
            <button className="text-sm bg-blue-500 text-white rounded p-1 px-2" onClick={handleShowProgressModal}>
              {book.progress > 0 ? "Update progress" : "Start progress"} 
            </button>

            <button
              className="text-sm bg-blue-500 text-white rounded p-1 px-2"
              onClick={handleShowLearnModal}
            >
              Learn more
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
