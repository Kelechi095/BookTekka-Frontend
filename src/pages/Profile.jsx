import { customFetch } from "../utils/customFetch";
import { useQuery } from "react-query";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";

export default function Profile1() {
  const getUserProfileFn = async () => {
    const res = await customFetch.get("/auth/profile");
    console.log(res.data);
    return res.data;
  };

  const { data } = useQuery("user", getUserProfileFn);

  return (
    <div className="mx-auto text-slate-900 grid lg:grid-cols-10 gap-2 relative">
      <div className="hidden lg:grid justify-center px-4 lg:fixed lg:w-[20%] lg:left-0  bg-white border-r h-screen">
        <Nav />
      </div>
      <div className=" px-4 lg:absolute lg:right-0 lg:w-[80%]">
      <Header title={"Profile"} />
      <div className="my-4 shadow-sm p-6 mt-12 flex flex-col items-center gap-2 max-w-sm lg:w-[800px] mx-auto relative">
        
        <img
          src={data?.profilePicture}
          alt=""
          className="shadow rounded-full w-40 h-40 object-cover border-none"
        />
        <p className="self-start mt-4">
          <span className="font-semibold">Username:</span> {data?.username}
        </p>
        <p className="self-start">
          <span className="font-semibold mb-4">Email:</span> {data?.email}
        </p>
        <Link
          to="/profile/edit-profile"
          className="border px-2 py-1 rounded bg-cyan-600 text-white text-sm self-start"
        >
          Edit Profile
        </Link>
      </div>
      </div>
    </div>
  );
}
