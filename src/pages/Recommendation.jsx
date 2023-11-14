import React from "react";
import Header from "../components/Header";
import useGetRecommendation from "../hooks/recommendation/useGetRecommendation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { customFetch } from "../utils/customFetch";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Recommendation() {
  const { isLoading, data } = useGetRecommendation();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const fetchUser = async () => {
    const response = await customFetch.get("/auth/user");
    return response.data;
  };

  const likeBook = async (id) => {
    await customFetch.patch(`/recommend/likes/${id}`);
  };

  const { data: user } = useQuery("user", fetchUser);

  const { mutate: likeMutate } = useMutation((id) => likeBook(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("recommendation");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_CENTER,
        className: "text-xs ",
      });
    },
  });

  const addBookLib = async (book) => {
    const response = await customFetch.post(`/recommend/add`, {
      title: book.title,
      author: book.author,
      description: book.description,
      genre: book.genre,
      thumbnail: book.thumbnail,
      smallThumbnail: book.smallThumbnail,
    });

    return response.data;
  };

  const { isLoading: isAdding, mutate: addBookLibMutation } = useMutation(
    "books",
    (book) => addBookLib(book),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("books");
        toast.success("Book added to library", {
          position: toast.POSITION.TOP_CENTER,
          className: "text-xs w-fit h-fit mx-auto",
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

  const handleLike = (id) => {
    likeMutate(id);
  };

  const handleAddToLibrary = (book) => {
    addBookLibMutation(book);
  };

  console.log(data?.recommendations);
  return (
    <div className="mx-auto text-slate-900 m-4 mt-6 px-4 mb-8">
      <Header title={"Book Recommendations"} />

      {data?.recommendations?.map((book) => (
        <div className="border max-w-xs mt-4">
          <Link key={book._id} to={`/recommendations/${book._id}`}>
            <div className="mt-4 border-b border-b-gray-100 text-sm rounded max-w-xs p-2 mb-2">
              <h1 className="font-semibold">{book.title}</h1>
              <button
                className="border text-xs p-1 bg-cyan-700 rounded mt-1 text-white"
                onClick={() => handleAddToLibrary(book)}
              >
                Add to library
              </button>
            </div>
          </Link>
          <div className="flex items-center gap-2 text-sm px-2">
            {book?.likers.includes(user?.username) ? (
              <AiFillHeart
                size={18}
                className="cursor-pointer text-red-500"
                onClick={() => handleLike(book._id)}
              />
            ) : (
              <AiOutlineHeart
                size={18}
                className="cursor-pointer"
                onClick={() => handleLike(book._id)}
              />
            )}

            <p>
              {book?.likes} {book?.likes !== 1 ? "Likes" : "Like"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* 
    
    </div>


))} */
