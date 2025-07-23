// useAxiosSecure.jsx
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import useAxios from "./useAxios";


const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();
  const axiosSecure=useAxios()

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken();
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        if (status === 401) {
          await logOut();
          navigate("/login");
        } else if (status === 403) {
          navigate("/forbidden");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
