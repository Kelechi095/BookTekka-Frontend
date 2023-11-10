import { useQuery } from "react-query";
import { customFetch } from "../../utils/customFetch";
import { saveUserToLocalStorage } from "../../utils/localstorage/saveUser";

export default function useRefresh() {

  const refreshUserFn = async () => {
      const res = await customFetch.get("/auth/refresh");
      return res.data
  }
  const user = 'user'
  const token = 'token'


  const {data, isLoading} = useQuery("users", refreshUserFn, {
    onSuccess: (data) => {
      saveUserToLocalStorage(user, data.username);
      saveUserToLocalStorage(token, data.accessToken);
    }
  })

  
  return {isLoading}
}