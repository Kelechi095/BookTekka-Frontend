import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../utils/customFetch";
import useOauth from "../hooks/useOauth";
import { useMutation } from "react-query";
import useIsLoggedIn from "../hooks/user/useIsLoggedIn";
import { toast } from "react-hot-toast";
import { capitalizeFirst } from "../utils/capitalizeFirst";
import NewUser from "../components/NewUser";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { isLoggedIn } = useIsLoggedIn();
  const { handleGoogleAuth } = useOauth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const registerFn = async () => {
    const res = await customFetch.post("/auth/register", {
      ...formData,
      username: capitalizeFirst(formData.username),
    });
    return res.data;
  };

  const { mutate: registerMutation, isLoading } = useMutation(
    () => registerFn(),
    {
      onSuccess: () => {
        navigate("/login");
        toast.success("Registration Successful");
      },
      onError: (error) => {
        error?.response?.data?.error?.split(" ")[0] === "E11000"
          ? toast.error("Email already in use")
          : toast.error(error?.response?.data?.msg);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.username || !formData.password)
      return toast.error("Please fill all fields");
    registerMutation();
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <NewUser
      title="Welcome to BookTekka"
      subtitle="Register"
      label1="Username"
      id1="username"
      isLoading={isLoading}
      linkText="login"
      footerTitle="Already have an account"
      footerLinkTitle="Login"
      onGoogleSubmit={handleGoogleAuth}
      onSubmit={handleSubmit}
      onChange={handleChange}
      buttonTitle="Register"
    />
  );
}
