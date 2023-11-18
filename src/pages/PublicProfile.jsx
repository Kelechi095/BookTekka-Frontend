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
    <div className="mx-auto text-slate-900 grid lg:grid-cols-10 gap-2 relative">
      <div className="hidden lg:grid justify-center px-4 lg:fixed lg:w-[20%] lg:left-0  bg-white border-r h-screen">
        <Nav />
      </div>
      <div className=" px-4 lg:absolute lg:right-0 lg:w-[80%]">
        <Header title={"Profile"} />
        <div className="my-4 shadow-sm p-6 mt-12 gap-2 mx-auto relative">
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

          <div className="flex gap-3">
            {data?.recentlyAdded?.slice(0, 3).map((book) => (
              <img src={book.thumbnail} alt="" className="border rounded w-20" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
