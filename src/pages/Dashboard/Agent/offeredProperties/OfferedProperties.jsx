import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

const OfferedProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();


  const {
    data: offers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requested-offers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agent/requested-offers/${user?.email}`);
      return res.data;
    },
  });

 
  const handleAccept = async (offerId) => {
    try {
      const res = await axiosSecure.patch(`/agent/accept-offer/${offerId}`);
      if (res.data.modifiedCount || res.data.message) {
        Swal.fire("Accepted!", "Offer accepted and others rejected.", "success");
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to accept offer", "error");
    }
  };

  // Reject Offer Handler
  const handleReject = async (offerId) => {
    try {
      const res = await axiosSecure.patch(`/agent/reject-offer/${offerId}`);
      if (res.data.modifiedCount || res.data.message) {
        Swal.fire("Rejected!", "Offer rejected successfully.", "success");
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to reject offer", "error");
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Requested / Offered Properties</h2>

      {offers.length === 0 ? (
        <p>No offers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Property Title</th>
                <th>Location</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Offered Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, index) => (
                <tr key={offer._id}>
                  <td>{index + 1}</td>
                  <td>{offer.title}</td>
                  <td>{offer.location}</td>
                  <td>{offer.buyerName}</td>
                  <td>{offer.buyerEmail}</td>
                  <td>৳ {offer.offerAmount}</td>
                  <td>
                    {offer.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAccept(offer._id)}
                          className="btn btn-sm btn-success"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(offer._id)}
                          className="btn btn-sm btn-error"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded text-white text-sm ${
                          offer.status === "accepted"
                            ? "bg-green-600"
                            : "bg-red-500"
                        }`}
                      >
                        {offer.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OfferedProperties;
