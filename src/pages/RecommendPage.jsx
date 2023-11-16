import { useState } from "react";
import useGetBook from "../hooks/useGetBook";
import Loader from "../components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { customFetch } from "../utils/customFetch";
import { toast } from "react-toastify";
import useGetSingleRecommendation from "../hooks/recommendation/useGetSingleRecommendation";
import Nav from "../components/Nav";

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

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto text-slate-900 grid lg:grid-cols-10 gap-2 relative">
      <div className="hidden lg:grid justify-center px-4 lg:fixed lg:w-[20%] lg:left-0  bg-white border-r h-screen">
        <Nav />
      </div>
      <div className=" px-4 lg:absolute lg:right-0 lg:w-[80%] my-2 gap-4">
        
        <div className="mt-6">
          <div className="lg:grid-cols-10 grid gap-4 border-b mb-1 p-4">
            <div className="col-span-3">
              <img
                src={book?.thumbnail}
                alt={book?.title}
                className="w-40 lg:w-60
            mb-4"
              />
            </div>
            <div className="col-span-7">
              <h2 className="text-lg lg:text-2xl font-bold mt-8">
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
                  {book?.description}
                </h2>
              )}
            </div>
          </div>
          <div>
            <h2 className="mt-4 font-semibold text-blue-400 mx-2">
              {book.reviews.length > 0 ? "Reviews" : "No reviews"}
            </h2>
            {book.reviews.map((review) => (
              <div key={review._id} className="text-sm max-w-xs p-2 px-2 border shadow-sm mt-3 rounded-lg">
                <p className="font-semibold text-sm text-red-700">{review.reviewer}</p>
                <p className="text-sm lg:text-base">{review.review}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              cols="10"
              rows="5"
              className="border w-[300px] outline-none p-2 text-sm mt-4 mb-1 block mx-w-"
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
            ></textarea>
            <button className="text-sm border mb-4 rounded p-1 bg-cyan-600 text-white">
              {isSubmitting ? "Submitting" : "Add review"}
            </button>
          </form>
        </div>

        
      </div>
    </div>
  );
}

/* 
<div className="mx-auto text-slate-900 grid lg:grid-cols-10 gap-2 relative">
      <div className="hidden lg:grid justify-center px-4 lg:fixed lg:w-[20%] lg:left-0 bg-white border-r h-screen">
        <Nav />
      </div>
      <div className=" px-4 lg:absolute lg:right-0 lg:w-[80%] my-2 gap-4">
        <div className="mt-6">
          <div className="lg:grid-cols-10 grid border-b mb-4 pb-4">
            <div className="col-span-3">
              <img
                src={book?.thumbnail}
                alt={book?.title}
                className="w-40 lg:w-60
            mb-4"
              />
            </div>
            <div className="col-span-7 ">
              <h2 className="text-lg lg:text-2xl font-bold mt-8">
                {book?.title}
              </h2>
              <h2 className="text-sm lg:text-base font-semibold"><span className="font-bold">Author: </span>
                {book?.author}
              </h2>
              <h2 className="text-sm lg:text-base font-semibold"><span className="font-bold">Genre: </span>
                {book?.genre}
              </h2>
              {book?.description && (
                <h2 className="text-sm font-base">
                  <span className="font-bold">Description: </span>{" "}
                  {book?.description}
                </h2>
              )}
            </div>
          </div>


          
        </div>
      </div>
    </div>
*/
