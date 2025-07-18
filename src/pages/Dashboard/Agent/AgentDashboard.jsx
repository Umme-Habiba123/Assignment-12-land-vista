import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import moment from "moment";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


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
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-3xl font-extrabold text-center mb-8 flex items-center justify-center gap-3 text-purple-700">
        Agent Profile <ShieldCheck className="inline-block text-green-500" size={32} />
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
        <img
          src={user.photoURL || "https://i.ibb.co/y0qFqkt/default-user.png"}
          alt="Agent"
          className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-8 border-purple-300 shadow-lg"
        />

        <div className="text-center md:text-left space-y-4 flex-1">
          <h3 className="text-2xl font-semibold text-gray-900">{user.displayName}</h3>
          <p className="text-gray-600 text-lg">{user.email}</p>
          <p className="text-purple-600 font-semibold text-lg">Role: {role}</p>
          {userInfo?.createdAt && (
            <p className="text-sm text-gray-500 italic">
              Joined on <time dateTime={userInfo.createdAt}>{moment(userInfo.createdAt).format("MMMM Do, YYYY")}</time>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
