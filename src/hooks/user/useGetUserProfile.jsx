import { customFetch } from "../../utils/customFetch";
import { useQuery } from "react-query";

export default function useGetUserProfile() {
    const getUserProfileFn = async () => {
        const res = await customFetch.get("/auth/profile");
        return res.data;
      };
    
      const { data: user } = useQuery("user", getUserProfileFn);

  return {user}
}
