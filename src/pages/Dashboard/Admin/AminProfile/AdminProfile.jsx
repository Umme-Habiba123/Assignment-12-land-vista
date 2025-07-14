import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const AdminProfile = () => {
  const { user: firebaseUser, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);

  useEffect(() => {
    if (firebaseUser?.email) {
      axiosSecure
        .get(`/users/${firebaseUser.email}`)
        .then((res) => {
          setUserData(res.data);
          setLoadingUserData(false);
        })
        .catch((err) => {
          console.error("Failed to fetch user data:", err);
          setLoadingUserData(false);
        });
    }
  }, [firebaseUser, axiosSecure]);

  if (loading || loadingUserData) {
    return <p>Loading...</p>;
  }

  if (!userData || userData.role !== "admin") {
    return (
      <div className="text-center text-red-600 font-bold mt-10">
        Access Denied: Admins only!
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
      <img
        src={firebaseUser?.photoURL}
        alt="Admin"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Role:</strong> {userData.role}</p>
    </div>
  );
};

export default AdminProfile;
