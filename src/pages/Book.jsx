import { useState } from "react";
import useGetBook from "../hooks/useGetBook";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LearnmoreModal from "../components/LearnmoreModal";

export default function Book() {
  const [showModal, setShowModal] = useState(true);
  const { id } = useParams();
  const { book, isLoading } = useGetBook(id);

  const navigate = useNavigate();

  const handleBackToLibrary = () => {
    navigate("/");
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  console.log(showModal);

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto text-slate-900 m-4 px-4">
      {showModal && <LearnmoreModal handleCloseModal={handleCloseModal} />}
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
            Reading Progress
          </p>
          <div className="max-w-sm mx-auto w-36">
            <CircularProgressbar
              value={book.progress}
              text={`${book.progress}%`}
              styles={buildStyles({
                // Text size
                textSize: "20px",

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Colors
                pathColor: `${
                  book.progress <= 20
                    ? "red"
                    : book.progress > 20 && tester <= 40
                    ? "violet"
                    : book.progress > 40 && tester <= 60
                    ? "blue"
                    : book.progress > 60 && tester <= 80
                    ? "yellow"
                    : "green"
                }`,
                textColor: "rgb(14 116 144)",
                trailColor: "#d6d6d6",
                backgroundColor: "cyan",
              })}
            />
          </div>
          ;
          <div className="mt-6 flex justify-around">
            <button className="text-sm bg-blue-500 text-white rounded p-1 px-2">
              Update progress
            </button>

            <button
              className="text-sm bg-blue-500 text-white rounded p-1 px-2"
              onClick={handleShowModal}
            >
              Learn more
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
