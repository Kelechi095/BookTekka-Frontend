import { customFetch } from "../utils/customFetch";
import { useQuery } from "react-query";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import Nav from "../components/Nav";

export default function Profile1() {
  const { userId } = useParams();

  const getUserProfileFn = async () => {
    const res = await customFetch.get(`/auth/public-profile/${userId}`);
    console.log(res.data);
    return res.data;
  };

  const { data } = useQuery(["user", userId], getUserProfileFn, {
    cacheTime: 0,
  });

  return (
    <div className="container">
      
      <div className=" px-4">
        <Header title={"Profile"} />
        <div className="content">
          <div className="w-96 mx-auto flex flex-col items-center justify-center">
          <img
            src={data?.profilePicture}
            alt=""
            className="shadow rounded-full w-60 h-60 object-cover border-none mx-auto"
          />
          <p className="self-start mt-4">
            <span className="font-semibold">Username:</span> {data?.username}
          </p>
          <p className="self-start mt-4">
            <span className="font-semibold">Total books in library:</span>{" "}
            {data?.totalBooks}
          </p>
          <p className="self-start mt-4">
            <span className="font-semibold">Total books recommended:</span>{" "}
            {data?.totalRecommendations}
          </p>

          <p className="self-start mt-4 font-semibold">Recently added</p>
          <div className="flex gap-3 self-start">
            {data?.recentlyAdded?.slice(0, 3).map((book) => (
              <img src={book.thumbnail} alt="" className="border rounded w-20 mt-2" />
            ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
