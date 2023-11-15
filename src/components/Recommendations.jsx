import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function Recommendations({
  data,
  handleLike,
  handleAddToLibrary,
  user,
}) {
  return (
    <div>
      {data?.recommendations?.map((book) => (
        <div className="border rounded shadow-sm mb-4 py-4 px-2" key={book._id}>
          <div className="flex items-center gap-2 mb-2">
            <img
              src={book.posterPhoto}
              alt=""
              className="w-8 h-8 object-cover rounded-full"
            />
            <p className="font-bold text-xs">{book.poster}</p>
          </div>
          <Link to={`/recommendations/${book._id}`} key={book._id}>
            <div className="  py-2 flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <img
                  src={book.smallThumbnail}
                  alt={book.title}
                  className="w-16"
                />
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {book.title}
                  </p>
                  <p className="text-xs font-medium text-slate-900">
                    {book.author}
                  </p>
                  <p className="text-xs font-medium text-slate-900">
                    {book.genre}
                  </p>

                  <p className="text-xs font-medium text-slate-900">
                    {book.reviews.length}{" "}
                    {book.reviews.length === 1 ? "review" : " reviews"}
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <button className="text-xs border py-1 px-4 mt-2 rounded-full bg-slate-700 text-white" onClick={() => handleAddToLibrary(book)}>Add to library</button>
          <div className="flex items-center gap-2 text-sm mt-2">
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
        </div>
      ))}
    </div>
  );
}
