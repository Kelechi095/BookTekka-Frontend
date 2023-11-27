import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../utils/firebase/firebase";
import { customFetch } from "../utils/customFetch";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { saveUserToLocalStorage } from "../utils/localstorage/saveUser";
import { toast } from "react-hot-toast";

export default function useOauth() {
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
      console.log(data);
      saveUserToLocalStorage(token, data.accessToken);
      saveUserToLocalStorage(user, data.username);
      navigate("/");
      toast.success("Login Successful");
    },
    onError: (error) => {
      error?.response?.data?.error?.split(" ")[0] === "E11000"
        ? toast.success("Email already in use")
        : toast.error(error?.response?.data?.error);
    },
  });

  const handleGoogleAuth = (e) => {
    e.preventDefault();
    console.log('clicked google')
    googleMutation();
  };

    return {handleGoogleAuth};
}
