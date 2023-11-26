import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { customFetch } from "../utils/customFetch";
import { useMutation, useQueryClient } from "react-query";
import { saveUserToLocalStorage } from "../utils/localstorage/saveUser";
import useIsLoggedIn from "../hooks/user/useIsLoggedIn";
import {toast} from 'react-hot-toast'
import useOauth from "../hooks/useOauth"
import NewUser from "../components/NewUser";

export default function Login() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const { isLoggedIn } = useIsLoggedIn();
  const {handleGoogleAuth} = useOauth()

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
      toast.success("Login Successful");
    },
    onError: (error) => {
      error?.response?.data?.error?.split(" ")[0] === "E11000"
        ? toast.success("Email already in use")
        : toast.error(error?.response?.data?.error);
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
    <NewUser
      title="Welcome back"
      subtitle="Login"
      label1=""
      id1=""
      isLoading={isLoading}
      linkText="register"
      footerTitle="Not registered?"
      footerLinkTitle="Register"
      onGoogleSubmit={handleGoogleAuth}
      onSubmit={handleSubmit}
      onChange={handleChange}
      buttonTitle="Login"
    />
  );
}
