import { useEffect, useState } from "react";
import useLogoutUser from "../hooks/user/useLogoutUser";
import { customFetch } from "../utils/customFetch";
import useRefresh from "../hooks/user/useRefresh";
import Loader from "../components/Loader";
import { useLocation } from "react-router-dom";

export default function ProtectedRoute({ children}) {
  const [isAuthError, setIsAuthError] = useState(false)

  const {isLoading } = useRefresh()

  const { logoutMutation } = useLogoutUser();

  const location = useLocation();

    useEffect(() => {
      if (!location.hash) {
        window.scrollTo(0, 0);
      }
    }, [location]);
  

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );



  const handleLogout = (e) => {
    logoutMutation();
  };

  useEffect(() => {
    if (!isAuthError) return;
    handleLogout();
  }, [isAuthError]);

  if (isLoading)
    return <Loader />

  return children;
}