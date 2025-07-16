import React, { useCallback, useEffect, useState } from "react";

import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const OfferedProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOffers = useCallback(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    setLoading(true);
    axiosSecure
      .get(`/agent/requested-offers/${user.email}`)
      .then((res) => {
        setOffers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching offers:", err);
        Swal.fire("Error", "Failed to load offers", "error");
      })
      .finally(() => setLoading(false));
  }, [axiosSecure, user?.email]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  const acceptOffer = async (id) => {
    try {
      await axiosSecure.patch(`/agent/accept-offer/${id}`);
      Swal.fire("Success", "Offer accepted", "success");
      fetchOffers();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Could not accept offer", "error");
    }
  };

  const rejectOffer = async (id) => {
    try {
      await axiosSecure.patch(`/agent/reject-offer/${id}`);
      Swal.fire("Success", "Offer rejected", "success");
      fetchOffers();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Could not reject offer", "error");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading offers...</p>;
  }

  if (!offers.length) {
    return <p className="text-center mt-10">No offers found.</p>;
  }

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">Requested Offers</h2>
      <table className="table-auto w-full border border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2 text-left">Title</th>
            <th className="border p-2 text-left">Location</th>
            <th className="border p-2 text-left">Buyer Email</th>
            <th className="border p-2 text-left">Buyer Name</th>
            <th className="border p-2 text-left">Offered Price</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map(
            ({
              _id,
              title,
              location,
              buyerEmail,
              buyerName,
              offerAmount,
              status,
            }) => (
              <tr key={_id} className="hover:bg-gray-100">
                <td className="border p-2">{title}</td>
                <td className="border p-2">{location}</td>
                <td className="border p-2">{buyerEmail}</td>
                <td className="border p-2">{buyerName}</td>
                <td className="border p-2">৳{offerAmount}</td>
                <td className="border p-2 font-semibold capitalize">
                  {status}
                </td>
                <td className="border p-2">
                  {status === "pending" ? (
                    <>
                      <button
                        onClick={() => acceptOffer(_id)}
                        className="bg-green-600 text-white px-3 py-1 mr-2 rounded hover:bg-green-700 transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => rejectOffer(_id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="italic text-gray-600">{status}</span>
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OfferedProperties;
