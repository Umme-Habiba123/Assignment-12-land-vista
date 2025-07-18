
// pages/Dashboard/Admin/AdvertiseProperty.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AdvertiseProperty = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["verified-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties?status=verified");
      return res.data;
    },
  });

  const advertiseMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/properties/advertise/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["verified-properties"]);
      Swal.fire("Advertised!", "Property has been advertised.", "success");
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="px-4 md:px-10 py-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Advertise Property</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200 text-base">
              <th>Image</th>
              <th>Title</th>
              <th>Price Range</th>
              <th>Agent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id}>
                <td>
                  <img src={property.image} alt="Property" className="h-16 w-24 object-cover rounded" />
                </td>
                <td>{property.title}</td>
                <td>
                  ৳{property.minPrice} - ৳{property.maxPrice}
                </td>
                <td>{property.agentName}</td>
                <td>
                  {property.isAdvertised ? (
                    <span className="text-green-600 font-medium">Advertised</span>
                  ) : (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => advertiseMutation.mutate(property._id)}
                    >
                      Advertise
                    </button>
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

export default AdvertiseProperty;
