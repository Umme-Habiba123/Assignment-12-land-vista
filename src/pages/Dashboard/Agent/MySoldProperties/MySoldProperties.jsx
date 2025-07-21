import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MySoldProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: soldProperties = [], isLoading } = useQuery({
    queryKey: ["sold-properties", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/sold-properties?agentEmail=${user.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <p className="text-center mt-10 text-pink-500 text-lg animate-pulse">
        🎀 Loading your sold properties...
      </p>
    );

  // 🧮 Calculate total sold amount
  const totalSoldAmount = soldProperties.reduce(
    (sum, item) => sum + item.soldPrice,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6 sansita-font">
      <h2 className="text-3xl font-bold  mb-4 text-center">
        🏡 My Sold Properties 💖
      </h2>

      {/* 💸 Total Sold Amount Section */}
      <div className="bg-gray-100 border border-gray-200  rounded-xl p-4 mb-6 shadow text-center">
        <h3 className="text-xl font-semibold text-pink-700">
          💰 Total Sold Amount:
          <span className="text-green-600 ml-2">
            ৳{totalSoldAmount.toLocaleString()}
          </span>
        </h3>
      </div>

      {/* 📋 Sold Properties Table */}
      {soldProperties.length === 0 ? (
        <div className="text-center text-gray-400 text-lg">
          😢 No sold properties yet. Keep going, agent! 🌟
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="table w-full border border-pink-200 rounded-lg bg-white text-sm">
            <thead className="bg-purple-100 text-pink-800">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">🏘️ Title</th>
                <th className="py-3 px-4 text-left">📍 Location</th>
                <th className="py-3 px-4 text-left">🧑 Buyer</th>
                <th className="py-3 px-4 text-left">📧 Email</th>
                <th className="py-3 px-4 text-left">💰 Price (৳)</th>
              </tr>
            </thead>
            <tbody>
              {soldProperties.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-pink-50 transition duration-200"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{item.propertyTitle}</td>
                  <td className="py-2 px-4">{item.propertyLocation}</td>
                  <td className="py-2 px-4">{item.buyerName}</td>
                  <td className="py-2 px-4">{item.buyerEmail}</td>
                  <td className="py-2 px-4 font-semibold text-green-600">
                    ৳{item.soldPrice.toLocaleString()}
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

export default MySoldProperties;
