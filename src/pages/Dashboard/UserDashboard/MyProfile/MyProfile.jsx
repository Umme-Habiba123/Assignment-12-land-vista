// pages/Dashboard/UserDashboard/MyProfile.jsx

import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user?.email) {
      console.log("Fetching user info for:", user.email);
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        console.log("User info fetched:", res.data);
        setUserInfo(res.data);
      });
    }
  }, [user, axiosSecure]);


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md text-center">
      <img
        src={user?.photoURL}
        alt="User"
        className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-purple-300"
      />
      <h2 className="text-xl font-bold mb-2">{user?.displayName}</h2>
      <p className="text-gray-600"><span className="font-bold">Email :</span>{user?.email}</p>

      {userInfo?.role && userInfo.role !== "user" && (
        <p className="text-purple-600 font-semibold mt-2 capitalize">
          Role: {userInfo.role}
        </p>
      )}

      <p className="text-sm mt-4 text-gray-600">
       <span className="font-bold "> Joined:</span> {userInfo?.createdAt?.split("T")[0] || "N/A"}
      </p>
    </div>
  );
};

export default MyProfile;
