import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const MySoldProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [soldProperties, setSoldProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/sold-properties?agentEmail=${user.email}`)
        .then((res) => {
          setSoldProperties(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching sold properties:", err);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  if (loading) {
    return <p className="text-center mt-10">Loading sold properties...</p>;
  }

  if (soldProperties.length === 0) {
    return <p className="text-center mt-10">No sold properties found.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Sold Properties</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Property Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Buyer Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Buyer Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Sold Price (৳)</th>
            </tr>
          </thead>
          <tbody>
            {soldProperties.map((property) => (
              <tr key={property._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{property.title}</td>
                <td className="border border-gray-300 px-4 py-2">{property.location}</td>
                <td className="border border-gray-300 px-4 py-2">{property.buyerEmail}</td>
                <td className="border border-gray-300 px-4 py-2">{property.buyerName}</td>
                <td className="border border-gray-300 px-4 py-2">{property.soldPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySoldProperties;
