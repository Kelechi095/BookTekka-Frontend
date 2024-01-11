import Header from "../components/Header";
import { Link } from "react-router-dom";
import useGetUserProfile from "../hooks/user/useGetUserProfile";

export default function Profile1() {
  const { user } = useGetUserProfile();

  console.log(user)

  return (
    <div className="container">
      <div className="px-4">
        <Header title={"Profile"} />
        <div className="content">
          <div className=" mx-auto mt-8 flex flex-col items-center justify-center">
            <img
              src={user?.profilePicture}
              alt=""
              className="shadow rounded-full w-40 h-40 md:w-60 md:h-60 object-cover border-none"
            />
            <p className="self-center mt-4 font-semibold md:text-lg">{user?.username}</p>
            <p className="self-center mt-1 font-semibold">{user?.email}</p>
            <Link
              to="/profile/edit-profile"
              className="border px-2 py-1 mt-1 rounded bg-cyan-600 text-white text-sm self-center"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
