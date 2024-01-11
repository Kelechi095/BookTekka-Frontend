import { useEffect, useState } from "react";
import useGetBook from "../hooks/useGetBook";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { customFetch } from "../utils/customFetch";
import { toast } from "react-hot-toast";
import useGetSingleRecommendation from "../hooks/recommendation/useGetSingleRecommendation";

export default function RecommendPage() {
  const { id } = useParams();
  const { book, isLoading } = useGetSingleRecommendation(id);
  const [userReview, setUserReview] = useState("");
  const [isFull, setIsFull] = useState(false);

  const queryClient = useQueryClient();

  const fetchUser = async () => {
    const response = await customFetch.get("/auth/user");
    return response.data;
  };

  

  const handleShowMore = () => {
    setIsFull(!isFull);
  };

  const { data: user } = useQuery("user", fetchUser);

  const addReview = async () => {
    await customFetch.post(`/recommend/review`, {
      review: userReview,
      reviewer: user.username,
      bookId: id,
    });
  };

  const { isLoading: isSubmitting, mutate: addReviewMutation } = useMutation(
    "singleRecommendation",
    () => addReview(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("singleRecommendation");
        setUserReview("");
        toast.success("Review added");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.msg || error?.response?.data?.error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    addReviewMutation();
  };

  return (
    <div className="container">
      <div className=" px-4">
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
              </div>
            </div>
            <div>
              <h2 className="mt-4 font-semibold text-blue-400 mx-2">
                {book.reviews.length > 0 ? "Reviews" : "No reviews"}
              </h2>
              {book?.reviews.map((review) => (
                <div
                  key={review._id}
                  className="text-sm w-full max-w-xs lg:max-w-lg p-2 px-2 border shadow-sm mt-3 rounded-lg"
                >
                  <p className="font-semibold text-sm text-red-700">
                    {review.reviewer}
                  </p>
                  <p className="text-sm lg:text-sm">{review.review}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit}>
              <textarea
                cols="10"
                rows="5"
                className="border w-full max-w-xs lg:max-w-lg outline-none block p-2 text-sm mt-4 mb-1"
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
              ></textarea>
              <button className="text-sm border mb-4 mt-1 rounded p-1 bg-cyan-600 text-white">
                {isSubmitting ? "Submitting" : "Add review"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
