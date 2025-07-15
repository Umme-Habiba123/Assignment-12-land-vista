// Wishlist.jsx
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Wishlist = () => {
  const { user, role } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  
  if (isLoading) return <p className="text-center mt-10 text-2xl text-green-600
  ">Loading wishlist...</p>;


  const removeFromWishlist = async (id) => {
    await axiosSecure.delete(`/wishlist/${id}`);
    queryClient.invalidateQueries(["wishlist"]);
    Swal.fire("Removed!", "Property removed from wishlist.", "success");
  };

  const handleMakeOffer = (property) => {
    if (role !== "user") {
      return Swal.fire("Access Denied", "Only users can make an offer.", "error");
    }
    navigate(`/make-offer/${property._id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlist.map((property) => (
        <div key={property._id} className="border rounded-xl p-4 shadow">
          <img src={property.image} alt={property.title} className="h-48 w-full object-cover rounded" />
          <h2 className="text-xl font-bold mt-2">{property.title}</h2>
          <p className="text-gray-600">{property.location}</p>
          <div className="flex items-center gap-2 mt-2">
            <img src={property.agentImage} alt="Agent" className="w-10 h-10 rounded-full" />
            <span>{property.agentName}</span>
          </div>
          <p className="text-sm">Verified: {property.verified ? "✅" : "❌"}</p>
          <p className="text-sm">Price: ৳{property.minPrice} - ৳{property.maxPrice}</p>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => handleMakeOffer(property)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Make an Offer
            </button>
            <button
              onClick={() => removeFromWishlist(property._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
