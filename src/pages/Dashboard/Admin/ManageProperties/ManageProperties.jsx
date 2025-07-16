// pages/Dashboard/Admin/ManageProperties.jsx
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();

  const { data: properties = [], refetch, isLoading } = useQuery({
    queryKey: ["manage-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties"); // সব properties
      return res.data;
    },
  });

  const handleVerify = async (id) => {
    try {
      await axiosSecure.patch(`/admin/verify-property/${id}`);
      Swal.fire("Success", "Property Verified!", "success");
      refetch();
    } catch (err) {
       console.log(err)
      Swal.fire("Error", "Verification Failed", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/admin/reject-property/${id}`);
      Swal.fire("Rejected", "Property Rejected!", "info");
      refetch();
    } catch (err) {
      console.log(err)
      Swal.fire("Error", "Rejection Failed", "error");
    }
  };

  if (isLoading) return <p className="text-center mt-10 text-xl">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Properties</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Agent Name</th>
              <th className="border px-4 py-2">Agent Email</th>
              <th className="border px-4 py-2">Price Range</th>
              <th className="border px-4 py-2">Action</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id}>
                <td className="border px-4 py-2">{property.title}</td>
                <td className="border px-4 py-2">{property.location}</td>
                <td className="border px-4 py-2">{property.agentName}</td>
                <td className="border px-4 py-2">{property.agentEmail}</td>
                <td className="border px-4 py-2">৳{property.minPrice} - ৳{property.maxPrice}</td>
                <td className="border px-4 py-2">
                  {property.verificationStatus === "pending" ? (
                    <>
                      <button
                        onClick={() => handleVerify(property._id)}
                        className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => handleReject(property._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="italic text-gray-500">Already {property.verificationStatus}</span>
                  )}
                </td>
                <td className="border px-4 py-2 capitalize font-semibold text-purple-700">
                  {property.verificationStatus}
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
