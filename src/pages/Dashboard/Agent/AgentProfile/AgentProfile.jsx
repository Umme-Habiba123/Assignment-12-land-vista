import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import moment from "moment";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AgentProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/users/role/${user.email}`);
        setRole(res.data?.role);
      }
    };

    const fetchUserInfo = async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setUserInfo(res.data);
      }
    };

    fetchRole();
    fetchUserInfo();
  }, [user, axiosSecure]);

  if (!role || role === "user") {
    return (
      <p className="text-center text-red-500 mt-10 text-xl">
        This page is for Agents only 🔒
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6">
        Agent Profile <ShieldCheck className="inline-block text-green-600 ml-2" />
      </h2>

      <div className="flex flex-col items-center text-center gap-4">
        <img
          src={user.photoURL || "https://i.ibb.co/y0qFqkt/default-user.png"}
          alt="Agent"
          className="w-32 h-32 rounded-full object-cover border-4 border-purple-300"
        />
        <div>
          <h3 className="text-xl font-semibold">{user.displayName}</h3>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-purple-600 font-medium">Role: {role}</p>
          {userInfo?.createdAt && (
            <p className="text-sm text-gray-500">
              Joined: {moment(userInfo.createdAt).format("YYYY-MM-DD")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
