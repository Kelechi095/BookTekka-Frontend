import {
  BiChevronRight,
  BiSolidBookReader,
  BiSolidBookAlt,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { getDate } from "../utils/dateMaker";

export default function Books({ data }) {
  return (
    <div>
      {data?.books?.map((book) => (
        <Link to={`/book/${book._id}`} key={book._id}>
          <div className=" border-t py-2 shadow-sm flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <img
                src={book.smallThumbnail}
                alt={book.title}
                className="w-16"
              />
              <div>
                <p className="text-sm font-bold text-slate-800">{book.title}</p>
                <p className="text-xs font-medium text-slate-900">
                  {book.author}
                </p>
                <p className="text-xs font-medium text-slate-900">
                  {book.genre}
                </p>
                <p className="text-xs font-medium text-slate-900">
                  {getDate(book.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p
                className={
                  book.status === "Reading"
                    ? " text-blue-500"
                    : book.status === "Unread"
                    ? " text-red-500"
                    : " text-green-500"
                }
              >
                {book.status === "Reading" ? (
                  <BiSolidBookReader size={20} />
                ) : book.status === "Unread" ? (
                  <BiSolidBookAlt size={20} />
                ) : (
                  <FaBook size={20} />
                )}
              </p>
              <BiChevronRight className="text-blue-400" size={20} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
