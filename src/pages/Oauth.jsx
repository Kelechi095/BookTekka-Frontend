import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../utils/firebase/firebase";
import { customFetch } from "../utils/customFetch";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { saveUserToLocalStorage } from "../utils/localstorage/saveUser";
import {toast} from "react-toastify"

export default function Oauth() {
  const navigate = useNavigate();

  const googleFn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);
    const newUser = {
      name: result.user.displayName,
      email: result.user.email,
      photo: result.user.photoURL,
    };

    const res = await customFetch.post("/auth/google", newUser);
    return res.data;
  };

  const user = "user";
  const token = "token";

  const { mutate: googleMutation, isLoading } = useMutation(() => googleFn(), {
    onSuccess: (data) => {
      console.log(data)
      saveUserToLocalStorage(token, data.accessToken);
      saveUserToLocalStorage(user, data.username);
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
    googleMutation();
  };

  return (
    <button
      type="button"
      className="bg-green-500 text-white p-2 uppercase hover:opacity-95"
      onClick={handleSubmit}
    >
      Continue with google
    </button>
  );
}