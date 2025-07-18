import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useRole from "../../../../hooks/useRole";

const AdminProfile = () => {
  const { user } = useAuth();
  const [role, loading] = useRole();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 text-lg text-cyan-400 font-semibold animate-pulse">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-20 p-10 bg-gradient-to-br from-gray-900 via-cyan-900 to-gray-800 rounded-3xl shadow-xl border border-cyan-700">
      <h2 className="text-4xl font-extrabold text-center text-cyan-400 mb-12 tracking-widest font-serif drop-shadow-lg">
        Admin Profile
      </h2>

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
                <span>{new Date(user.metadata.creationTime).toLocaleDateString("en-GB")}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
