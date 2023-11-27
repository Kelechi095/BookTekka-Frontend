import Header from "../components/Header";
import { Link } from "react-router-dom";
import useGetUserProfile from "../hooks/user/useGetUserProfile";

export default function Profile1() {
  const { user } = useGetUserProfile();

  return (
    <div className="container">
      <div className="px-4">
        <Header title={"Profile"} />
        <div className="content">
          <div className="max-w-sm mx-auto mt-24 flex flex-col items-center justify-center">
            <img
              src={user?.profilePicture}
              alt=""
              className="shadow rounded-full w-40 h-40 object-cover border-none"
            />
            <p className="self-start mt-4">
              <span className="font-semibold">Username:</span> {user?.username}
            </p>
            <p className="self-start mt-1">
              <span className="font-semibold mb-4">Email:</span> {user?.email}
            </p>
            <Link
              to="/profile/edit-profile"
              className="border px-2 py-1 mt-1 rounded bg-cyan-600 text-white text-sm self-start"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
