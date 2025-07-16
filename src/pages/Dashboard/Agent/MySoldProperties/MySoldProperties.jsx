import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
;

const MySoldProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [soldProperties, setSoldProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/agent/sold-properties/${user.email}`)
      .then(res => {
        setSoldProperties(res.data);
      })
      .catch(err => {
        console.error("Error fetching sold properties", err);
      })
      .finally(() => setLoading(false));
  }, [user, axiosSecure]);

  if (loading) return <p>Loading sold properties...</p>;
  if (!soldProperties.length) return <p>No sold properties found.</p>;

  return (
    <table className="table-auto w-full border border-collapse">
      <thead>
        <tr>
          <th className="border p-2">Title</th>
          <th className="border p-2">Location</th>
          <th className="border p-2">Buyer Email</th>
          <th className="border p-2">Buyer Name</th>
          <th className="border p-2">Sold Price</th>
        </tr>
      </thead>
      <tbody>
        {soldProperties.map(({ _id, title, location, buyerEmail, buyerName, offerAmount }) => (
          <tr key={_id}>
            <td className="border p-2">{title}</td>
            <td className="border p-2">{location}</td>
            <td className="border p-2">{buyerEmail}</td>
            <td className="border p-2">{buyerName}</td>
            <td className="border p-2">৳{offerAmount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MySoldProperties;
