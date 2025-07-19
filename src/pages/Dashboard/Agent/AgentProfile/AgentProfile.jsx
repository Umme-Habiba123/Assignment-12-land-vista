import { useEffect, useState } from "react";
import { ShieldCheck, Pencil } from "lucide-react";
import moment from "moment";
import useAxiosSecure from "../../../../hooks/useAxios";
import useAuth from "../../../../hooks/useAuth";



const AgentProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
  });

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
        setFormData({
          displayName: res.data?.displayName || "",
          photoURL: res.data?.photoURL || "",
        });
      }
    };

    fetchRole();
    fetchUserInfo();
  }, [user, axiosSecure]);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(`/users/${user.email}`, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });
      if (res.data.modifiedCount > 0) {
        setUserInfo((prev) => ({
          ...prev,
          displayName: formData.displayName,
          photoURL: formData.photoURL,
        }));
        setIsEditModalOpen(false);
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (!role || role === "user") {
    return (
      <p className="text-center text-red-500 mt-10 text-xl">
        This page is for Agents only 🔒
      </p>
    );
  }

  return (
    <div className="min-h-[80vh] flex justify-center items-center px-4 py-10 bg-gradient-to-br  to-white">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-8 relative">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
          Agent Profile <ShieldCheck className="inline-block text-green-600 ml-2" />
        </h2>

        <button
          onClick={handleEditClick}
          className="absolute top-5 right-5 bg-purple-100 hover:bg-purple-200 p-2 rounded-full text-purple-700"
        >
          <Pencil size={20} />
        </button>

        <div className="flex flex-col items-center gap-6 text-center">
          <img
            src={userInfo?.photoURL || "https://i.ibb.co/y0qFqkt/default-user.png"}
            alt="Agent"
            className="w-36 h-36 rounded-full object-cover border-4 border-purple-400 shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              {userInfo?.displayName}
            </h3>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-purple-600 font-medium mt-2">Role: {role}</p>
            {userInfo?.createdAt && (
              <p className="text-sm text-gray-500 mt-1">
                Joined: {moment(userInfo.createdAt).format("MMMM D, YYYY")}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold text-purple-700 mb-4 text-center">
              Edit Profile
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded border-gray-300 focus:outline-purple-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Photo URL</label>
                <input
                  type="text"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 border-gray-300 rounded focus:outline-purple-400"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentProfile;
