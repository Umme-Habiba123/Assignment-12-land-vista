import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const SoldProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: soldProperties = [], isLoading } = useQuery({
    queryKey: ['sold-properties', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/sold-properties?agentEmail=${user.email}`);
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">🗂️ My Sold Properties</h2>
      {soldProperties.length === 0 ? (
        <p className="text-center text-gray-500">No sold properties yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-200 rounded-lg  p-5 ">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Property Title</th>
                <th>Location</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Sold Price (৳)</th>
              </tr>
            </thead>
            <tbody>
              {soldProperties.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td>{item.propertyTitle}</td>
                  <td>{item.propertyLocation}</td>
                  <td>{item.buyerName}</td>
                  <td>{item.buyerEmail}</td>
                  <td>৳{item.soldPrice.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SoldProperties;
