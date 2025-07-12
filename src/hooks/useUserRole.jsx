import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: dbUser = {}, isLoading, refetch } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  return { dbUser, isLoading, refetch };
};

export default useUserRole;
