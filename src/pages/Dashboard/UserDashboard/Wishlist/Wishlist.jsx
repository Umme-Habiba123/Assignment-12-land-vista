import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Wishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Wishlist Fetch
  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Role Fetch
  const { data: roleData, isLoading: isRoleLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`);
      return res.data?.role;
    },
    enabled: !!user?.email,
  });

  if (isLoading || isRoleLoading) {
    return (
      <p className="text-center mt-10 text-2xl text-green-600">
        Loading wishlist...
      </p>
    );
  }

  const removeFromWishlist = async (id) => {
    try {
      await axiosSecure.delete(`/wishlist/${id}`);
      queryClient.invalidateQueries(["wishlist"]);
      Swal.fire("Removed!", "Property removed from wishlist.", "success");
    } catch (err) {
      console.error("Failed to remove", err);
      Swal.fire("Error", "Failed to remove item", "error");
    }
  };

  const handleMakeOffer = (property) => {
    if (roleData !== "user") {
      return Swal.fire("Access Denied", "Only users can make an offer.", "error");
    }
    navigate(`/make-offer/${property.propertyId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {wishlist.length === 0 ? (
        <p className="text-center col-span-3 text-lg text-gray-500">
          Wishlist is empty.
        </p>
      ) : (
        wishlist.map((property) => (
          <div
            key={property._id}
            className="border border-purple-300 rounded-xl p-4 shadow-xl hover:shadow-purple-300"
          >
            <img
              src={property.image}
              alt={property.title}
              className="h-48 w-full object-cover rounded"
            />
            <h2 className="text-xl font-bold mt-2">{property.title}</h2>
            <p className="text-gray-600">{property.location}</p>
            <div className="flex items-center gap-2 mt-2">
              <img
                src={property.agentImage}
                alt="Agent"
                className="w-10 h-10 rounded-full"
              />
              <span>{property.agentName}</span>
            </div>
            <p className="text-sm">
              Verified: {property.verified ? "✅" : "❌"}
            </p>
            <p className="text-sm">
              Price: ৳{property.minPrice} - ৳{property.maxPrice}
            </p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleMakeOffer(property)}
                className="text-white px-3 py-1 rounded bg-[#4C495D] hover:bg-[#D1D7E0] hover:text-black border border-black"
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
        ))
      )}
    </div>
  );
};

export default Wishlist;
