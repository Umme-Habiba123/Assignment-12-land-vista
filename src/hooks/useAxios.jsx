// hooks/useAxiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  // headers: { authorization: `Bearer ${token}` }, // চাইলে auth header add করো
});

export default function useAxiosSecure() {
  return axiosSecure;
}
