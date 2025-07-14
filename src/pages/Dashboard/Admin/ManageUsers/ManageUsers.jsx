import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 🔹 Load users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // 🔸 Handle user role changes
  const updateRole = async (id, role) => {
    try {
      const res = await axiosSecure.patch(`/users/role/${id}`, { role });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", `User role updated to ${role}`, "success");
        queryClient.invalidateQueries(["users"]);
      } else {
        Swal.fire("Info", "Role update was not necessary", "info");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  // 🔸 Delete user
  const handleDelete = async (id, email) => {
    Swal.fire({
      title: "Delete this user?",
      text: "This will remove the user from DB & Firebase!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/users/${id}?email=${email}`);
          if (res.data.success) {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            queryClient.invalidateQueries(["users"]);
          } else {
            Swal.fire("Error", "Failed to delete user", "error");
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Failed to delete user", "error");
        }
      }
    });
  };

  if (isLoading) return <p>Loading users...</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="table w-full">
        <thead className="font-bold">
          <tr>
            <th>#</th>
            <th>Name & Email</th>
            <th>Role</th>
            <th>Actions</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id}>
              <td>{idx + 1}</td>
              <td>
                <div>
                  <p>{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </td>
              <td>
                {user.role === "fraud" ? (
                  <span className="text-red-600 font-bold">Fraud</span>
                ) : (
                  user.role || "user"
                )}
              </td>
              <td className="space-x-2">
                {user.role !== "admin" && user.role !== "fraud" && (
                  <>
                    <button
                      onClick={() => updateRole(user._id, "admin")}
                      className="btn btn-sm"
                    >
                      Make Admin
                    </button>
                    <button
                      onClick={() => updateRole(user._id, "agent")}
                      className="btn btn-sm btn-info"
                    >
                      Make Agent
                    </button>
                  </>
                )}
                {user.role === "agent" && (
                  <button
                    onClick={() => updateRole(user._id, "fraud")}
                    className="btn btn-sm btn-error"
                  >
                    Mark as Fraud
                  </button>
                )}
              </td>
              <td>
                <button
                  onClick={() => handleDelete(user._id, user.email)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
