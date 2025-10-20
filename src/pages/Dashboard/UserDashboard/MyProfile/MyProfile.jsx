import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxios";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userInfo, setUserInfo] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
  });
  

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setUserInfo(res.data);
        setFormData({
          name: res.data?.name || "",
          photoURL: res.data?.photoURL || "",
        });
      });
    }
  }, [user, axiosSecure]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(`/users/${user.email}`, {
       name: formData.name,
        photoURL: formData.photoURL,
      });
      if (res.data.modifiedCount > 0) {
        window.location.reload(); 
      }
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  console.log("createdAt:", userInfo?.createdAt);
  console.log("userInfo:", userInfo);



  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md text-center relative">
      <button
        onClick={() => setIsEditModalOpen(true)}
        className="absolute top-4 right-4 text-purple-600 hover:text-purple-800"
        title="Edit Profile"
      >
        <Pencil />
      </button>

      <img
        src={userInfo?.photoURL || "https://i.ibb.co/y0qFqkt/default-user.png"}
        alt="User"
        className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-purple-300"
      />

      <h2 className="text-xl font-bold mb-2">
        {userInfo?.name || "Unknown User"}
      </h2>

      <p className="text-gray-600">
        <span className="font-bold">Email:</span> {user?.email}
      </p>

      <p className="text-purple-600 font-semibold mt-2 capitalize">
        Role: {userInfo?.role ? (userInfo.role === "user" ? "User" : userInfo.role) : "User"}
      </p>


      {userInfo?.role && userInfo.role !== "user" && (
        <p className="text-purple-600 font-semibold mt-2 capitalize">
          Role: {userInfo.role}
        </p>
      )}

      <p className="text-sm mt-4 text-gray-600">
        <span className="font-bold">Joined:</span>{" "}
        {userInfo?.createdAt?.split("T")[0] || "N/A"}
        
      </p>
      

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold text-purple-700 mb-4 text-center">
              Edit Profile
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded focus:outline-purple-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Photo URL</label>
                <input
                  type="text"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded focus:outline-purple-500"
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

export default MyProfile;
