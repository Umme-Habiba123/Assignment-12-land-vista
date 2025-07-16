import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { BadgeCheck, MapPin, User, DollarSign, CheckCircle, CreditCard } from "lucide-react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PropertyBought = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

 const { data: offers = [], isLoading } = useQuery({
  queryKey: ["user-offers", user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/offers?email=${user?.email}`);
    return res.data;
  },
  enabled: !!user?.email,
});


  if (isLoading) {
    return (
      <p className="text-center mt-10 text-xl text-green-600">Loading properties...</p>
    );
  }

  if (offers.length === 0) {
    return (
      <p className="text-center mt-10 text-lg text-gray-600">
        No properties offered yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {offers.map((item) => (
        <div
          key={item._id}
          className="border border-gray-200 hover:shadow-amber-200 rounded-lg p-4 shadow-lg space-y-3 bg-white"
        >
          {/* Property Image */}
          <img
            src={item.image}
            alt={item.title}
            className="h-40 w-full object-cover rounded-md"
          />

          {/* Property Title */}
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BadgeCheck className="text-purple-500 w-5 h-5" />
            {item.title}
          </h2>

          {/* Location */}
          <p className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            {item.location}
          </p>

          {/* Agent Name */}
          <p className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Agent: <strong>{item.agentName}</strong></span>
          </p>

          {/* Offered Price */}
          <p className="flex items-center gap-2 text-blue-600 font-semibold">
            <DollarSign className="w-4 h-4" />
            Offered: ৳{item.offerAmount}
          </p>

          {/* Status */}
          <p className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-orange-500" />
            Status: <span className="capitalize font-semibold">{item.status}</span>
          </p>

          {/* Conditional Payment Button or Transaction ID */}
          {item.status === "accepted" && (
            <button
              onClick={() => navigate(`/dashboard/user/pay/${item._id}`)}
              className="w-full bg-green-500 text-lg font-bold text-white py-2 rounded hover:bg-green-600 mt-2 flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Pay Now
            </button>
          )}

          {item.status === "bought" && item.transactionId && (
            <p className="text-green-700 font-semibold">
              ✅ Paid <br />
              Txn ID: <span className="text-sm text-black">{item.transactionId}</span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PropertyBought;
