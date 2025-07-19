import React, { useState, useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import { Pencil } from "lucide-react";
import useRole from "../../../../hooks/useRole";
import useAxiosSecure from "../../../../hooks/useAxios";

const AdminProfile = () => {
  const { user } = useAuth();
  const [role, loading] = useRole();
  const axiosSecure = useAxiosSecure();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user?.displayName || "",
        photoURL: user?.photoURL || "",
      });
    }
  }, [user]);

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
        window.location.reload(); // Simple reload to reflect updated info
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 text-lg text-cyan-400 font-semibold animate-pulse">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-20 p-10 bg-gradient-to-br from-gray-900 via-cyan-900 to-gray-800 rounded-3xl shadow-xl border border-cyan-700 relative">
      <h2 className="text-4xl font-extrabold text-center text-cyan-400 mb-12 tracking-widest font-serif drop-shadow-lg">
        Admin Profile
      </h2>

      <button
        onClick={() => setIsEditModalOpen(true)}
        className="absolute top-6 right-6 bg-cyan-800 hover:bg-cyan-700 text-white p-2 rounded-full shadow-md"
        title="Edit Profile"
      >
        <Pencil size={20} />
      </button>

      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-8 border-cyan-600 shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-cyan-400">
          <img
            src={user?.photoURL || "https://i.ibb.co/TmW8s3M/user-placeholder.png"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-2 text-center text-sm text-cyan-300 font-medium rounded-b-full">
            {role === "admin" ? "Administrator" : "User"}
          </div>
        </div>

        <div className="flex-1 text-cyan-200 space-y-6 font-sans">
          <h3 className="text-3xl font-semibold border-b border-cyan-500 pb-3 tracking-wide">
            {user?.displayName || "Unknown User"}
          </h3>

          <div className="space-y-4 text-lg">
            <p>
              <span className="font-semibold text-cyan-400">Email:</span>{" "}
              <span className="break-all">{user?.email || "N/A"}</span>
            </p>

            {role === "admin" && (
              <p>
                <span className="font-semibold text-cyan-400">Role:</span>{" "}
                <span className="text-green-400 font-bold tracking-wide">Admin</span>
              </p>
            )}

            {user?.metadata?.creationTime && (
              <p>
                <span className="font-semibold text-cyan-400">Joined:</span>{" "}
                <span>
                  {new Date(user.metadata.creationTime).toLocaleDateString("en-GB")}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-semibold text-cyan-700 mb-4 text-center">
              Edit Profile
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-cyan-600">Name</label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded focus:outline-cyan-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-cyan-600">Photo URL</label>
                <input
                  type="text"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded focus:outline-cyan-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-cyan-600 text-white hover:bg-cyan-700"
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

export default AdminProfile;
