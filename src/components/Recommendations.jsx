import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function Recommendations({
  data,
  handleLike,
  handleAddToLibrary,
  user,
}) {
  console.log(data);
  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-4">
      {data?.recommendations?.map((book) => (
        <div
          className="border-2 rounded shadow-sm my-4 bg-white py-4 px-2"
          key={book._id}
        >
          <div className="flex items-center gap-2 border-b pb-2">
          <Link to={`/public-profile/${book.posterId}`}>
            <img
              src={book.posterPhoto}
              alt=""
              className="w-10 h-10 object-cover rounded-full"
            />
            </Link>
            <p className="font-semibold text-sm">{book.poster}</p>
          </div>
          <Link to={`/${book._id}`} key={book._id}>
            <div className="py-2 flex items-center justify-between">
              <div className="flex gap-2 items-center h-40 lg:h-48">
                <img
                  src={book.smallThumbnail}
                  alt={book.title}
                  className="w-20 lg:w-28 border shadow-sm rounded"
                />
                <div>
                  <p className="text-base font-bold text-slate-800">
                    {book.title}
                  </p>
                  <p className="text-sm font-medium text-slate-900">
                    {book.author}
                  </p>
                  <p className="text-sm font-medium text-slate-900">
                    {book.genre}
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Buttons */}
          <div className="flex justify-between items-center border-t pt-4">
            <p className="text-sm mx-1 font-medium text-slate-900">
              {book.reviews.length}{" "}
              {book.reviews.length === 1 ? "review" : " reviews"}
            </p>
            <div className="flex items-center gap-2 text-sm">
              {book?.likers.includes(user?._id) ? (
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
            <button
              className="text-xs border py-2 px-3 rounded-full text-slate-600"
              onClick={() => handleAddToLibrary(book)}
            >
              Add to library
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
