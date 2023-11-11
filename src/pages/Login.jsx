import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { customFetch } from "../utils/customFetch";
import { Ring } from "@uiball/loaders";
//import Oauth from "../components/Oauth";
import { useMutation, useQueryClient } from "react-query";
import { saveUserToLocalStorage } from "../utils/localstorage/saveUser";
import useIsLoggedIn from "../hooks/user/useIsLoggedIn";


export default function Login() {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const {isLoggedIn} = useIsLoggedIn()

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

  const user = 'user'
  const token = 'token'

  const { mutate: loginMutation, isLoading } = useMutation(
    () => loginFn(),
    {
      onSuccess: (data) => {
        saveUserToLocalStorage(user, data.username);
        saveUserToLocalStorage(token, data.accessToken);
        navigate("/");
      },
      onError: (error) => {
        error?.response?.data?.error?.split(" ")[0] === "E11000"
          ? setError("Email already used")
          : setError(error.response.data.error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault()
    loginMutation()
  }

  useEffect(() => {
    if(isLoggedIn) navigate('/')
  }, [isLoggedIn])

  
  return (
    <section className="h-screen flex items-center justify-center bg-lighterCyan">
        <div className="w-full lg:max-w-lg md:max-w-sm max-w-sm p-2">
          <form className="flex flex-col p-4 bg-white rounded-lg border-2 shadow-sm mb-12">
            <h2 className="text-center font-semibold mb-4">LOGIN</h2>
            
            <div className="flex flex-col my-2">
              <label className="text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                className="border border-cyan-800 text-sm focus:outline-none p-1 rounded text-black"
              />
            </div>
            <div className="flex flex-col my-2">
              <label className="text-sm  font-medium mb-1">Email Address</label>
              <input
                type="text"
                className="border border-cyan-800 text-black text-sm focus:outline-none p-1 rounded"
              />
            </div>
            <div className="flex flex-col my-2">
              <label className="text-sm  font-medium mb-1">Password</label>
              <input
                type="text"
                className="border border-cyan-800 text-sm focus:outline-none p-1 rounded"
              />
            </div>
            <button className="bg-cyan-600 text-white rounded text-sm p-2 my-2">
              Create an account
            </button>
            <div className="flex gap-2 text-sm mt-1">
              <p>Not registered?</p>
              <Link to="/register" className="text-cyan-800">Register</Link>
            </div>
          </form>
        </div>
      </section>
  );
}