import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { customFetch } from "../utils/customFetch";
import { Ring } from "@uiball/loaders";
//import Oauth from "../components/Oauth";
import { useMutation, useQueryClient } from "react-query";
import { saveUserToLocalStorage } from "../utils/localstorage/saveUser";
import useIsLoggedIn from "../hooks/user/useIsLoggedIn";
import {toast} from 'react-toastify'
import Oauth from "./Oauth";

export default function Login() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const { isLoggedIn } = useIsLoggedIn();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const loginFn = async () => {
    const res = await customFetch.post("/auth/login", formData);
    return res.data;
  };

  const user = "user";
  const token = "token";

  const { mutate: loginMutation, isLoading } = useMutation(() => loginFn(), {
    onSuccess: (data) => {
      saveUserToLocalStorage(user, data.username);
      saveUserToLocalStorage(token, data.accessToken);
      navigate("/");
      toast.success("Login Successful", {
        position: toast.POSITION.TOP_CENTER,
        className: "text-xs"
      });
    },
    onError: (error) => {
      error?.response?.data?.error?.split(" ")[0] === "E11000"
        ? toast.success("Email already in use", {
          position: toast.POSITION.TOP_CENTER,
          className: "text-xs"
        })
        : toast.error(error?.response?.data?.error, {
          position: toast.POSITION.TOP_CENTER,
          className: "text-xs "
        });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation();
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <div className="p-3 max-w-xs mx-auto">
      <h1 className="text-3xl font-bold my-8 mt-16 ">Welcome back</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            className="bg-white border-b border-purple-300 outline-none text-sm"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            className="bg-white border-b border-purple-300 outline-none text-sm"
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-purple-800 text-white p-2 hover:opacity-95 disabled:opacity-80"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Login"}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5 text-[15px]">
        <p>Have an account?</p>
        <Link to="/register" className="text-purple-700">
          Login
        </Link>
      </div>
    </div>
  );
}
