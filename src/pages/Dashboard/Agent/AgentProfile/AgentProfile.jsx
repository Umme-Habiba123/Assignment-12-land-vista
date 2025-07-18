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
    <div className="min-h-[80vh] flex justify-center items-center bg-gradient-to-br  px-4 py-10 ">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-8 transition-all duration-300 hover:shadow-purple-300 ">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
          Agent Profile <ShieldCheck className="inline-block text-green-600 ml-2" />
        </h2>

        <div className="flex flex-col items-center gap-6 text-center">
          <img
            src={user.photoURL || "https://i.ibb.co/y0qFqkt/default-user.png"}
            alt="Agent"
            className="w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-purple-400 shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">{user.displayName}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-purple-600 font-medium mt-2">Role: {role}</p>
            {userInfo?.createdAt && (
              <p className="text-sm text-gray-500 mt-1">
                Joined: {moment(userInfo.createdAt).format("MMMM D, YYYY")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
