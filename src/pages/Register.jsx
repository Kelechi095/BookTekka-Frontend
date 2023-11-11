import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../utils/customFetch";
//import Oauth from "../components/Oauth";
import { useMutation } from "react-query";
import useIsLoggedIn from "../hooks/user/useIsLoggedIn";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  const { isLoggedIn } = useIsLoggedIn();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const registerFn = async () => {
    const res = await customFetch.post("/auth/register", formData);
    return res.data;
  };

  const { mutate: registerMutation, isLoading } = useMutation(
    () => registerFn(),
    {
      onSuccess: () => {
        navigate("/login");
      },
      onError: (error) => {
        error?.response?.data?.error?.split(" ")[0] === "E11000"
          ? setError("Email already used")
          : setError(error.response.data.error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation();
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <div className="p-3 max-w-xs mx-auto">
      <h1 className="text-3xl font-bold my-8 mt-16 ">Hello</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-600">Username</label>
          <input
            type="text"
            id="username"
            className="bg-white border-b border-purple-300 outline-none text-sm"
            onChange={handleChange}
          />
        </div>
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
          <label className="text-xs text-gray-600">Username</label>
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
          {isLoading ? "Submitting..." : "Register"}
        </button>
        {/* <Oauth /> */}
      </form>
      <div className="flex gap-2 mt-5 text-[15px]">
        <p>Have an account?</p>
        <Link to="/login" className="text-purple-700">
          Login
        </Link>
      </div>
      {error && <p className="text-red-700 mt-5">{customError}</p>}
    </div>
  );
}
