import { customFetch } from "../utils/customFetch";
import { useQuery } from "react-query";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Profile1() {
  const getUserProfileFn = async () => {
    const res = await customFetch.get("/auth/profile");
    console.log(res.data);
    return res.data;
  };

  const { data } = useQuery("user", getUserProfileFn);

  console.log(data);

  return (
    <div className="mx-auto text-slate-900 m-4 mt-6 px-4 mb-8">
      <Header title={"Profile"} />
      <div className="my-4 shadow-sm border p-6 flex flex-col items-center gap-2 max-w-sm mx-auto relative">
        <img
          src={data?.profilePicture}
          alt=""
          className="w-40 h-40 object-cover rounded-full"
        />
        <p className="self-start mt-4">
          <span className="font-semibold">Username:</span> {data?.username}
        </p>
        <p className="self-start">
          <span className="font-semibold mb-4">Email:</span> {data?.email}
        </p>
        <Link
          to="/edit-profile"
          className="border px-2 py-1 rounded bg-cyan-600 text-white text-sm self-start"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
