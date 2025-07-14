import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Get all properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["manage-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties");
      return res.data;
    },
  });

  // Verify mutation
  const verifyMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/properties/verify/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["manage-properties"]);
      Swal.fire("Verified!", "Property has been verified.", "success");
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/properties/reject/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["manage-properties"]);
      Swal.fire("Rejected", "Property has been rejected.", "info");
    },
  });

  // Confirm before verifying
  const handleVerify = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to verify this property?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, verify",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      verifyMutation.mutate(id);
    }
  };

  // Confirm before rejecting
  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this property?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      rejectMutation.mutate(id);
    }
  };

  if (isLoading)
    return <div className="text-center py-10 text-red-600 text-2xl">Loading...</div>;

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Properties</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Agent Name</th>
              <th className="p-2 border">Agent Email</th>
              <th className="p-2 border">Price Range</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id} className="text-center">
                <td className="p-2 border">{property.title}</td>
                <td className="p-2 border">{property.location}</td>
                <td className="p-2 border">{property.agentName}</td>
                <td className="p-2 border">{property.agentEmail}</td>
                <td className="p-2 border">
                  ৳{property.minPrice} - ৳{property.maxPrice}
                </td>
                <td className="p-2 border font-medium text-green-600">
                  {property.verificationStatus === "verified"
                    ? "Verified"
                    : property.verificationStatus === "rejected"
                    ? "Rejected"
                    : "Pending"}
                </td>
                <td className="p-2 border">
                  {property.verificationStatus === "pending" ? (
                    <div className="flex flex-col md:flex-row gap-2 justify-center">
                      <button
                        onClick={() => handleVerify(property._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => handleReject(property._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500">✔ {property.verificationStatus}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProperties;
