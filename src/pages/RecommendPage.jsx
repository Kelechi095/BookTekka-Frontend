import { useState } from "react";
import useGetBook from "../hooks/useGetBook";
import Loader from "../components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { customFetch } from "../utils/customFetch";
import { toast } from "react-toastify";
import useGetSingleRecommendation from "../hooks/recommendation/useGetSingleRecommendation";

export default function RecommendPage() {
  const { id } = useParams();
  const { book, isLoading } = useGetSingleRecommendation(id);
  const [userReview, setUserReview] = useState("");

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const fetchUser = async () => {
    const response = await customFetch.get("/auth/user");
    return response.data;
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

        toast.success("Review added", {
          position: toast.POSITION.TOP_CENTER,
          className: "text-xs",
        });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    addReviewMutation();
  };

  console.log(book)

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto text-slate-900 p-4 ">
      <h1 className="font-bold text-xl font-mono">Book details</h1>

      <div className="p-4 bg-white rounded mt-4">
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

      <form onSubmit={handleSubmit}>
        <textarea
          cols="30"
          rows="5"
          className="border w-full outline-none p-2 text-sm"
          value={userReview}
          onChange={(e) => setUserReview(e.target.value)}
        ></textarea>
        <button className="text-sm border p-1 bg-cyan-600 text-white">
          {isSubmitting ? "Submitting" : "Add review"}
        </button>
      </form>

      <div>
        <h2 className="mt-2 font-bold">Reviews</h2>
        {book.reviews.map((review) => (
          <div key={review._id} className="text-sm my-2 w-96 p-1 max-w-xs">
              <p className="font-semibold text-sm">By {review.reviewer}</p>
            <p className="text-xs">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
