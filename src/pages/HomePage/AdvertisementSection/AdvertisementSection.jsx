import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdvertisementSection = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: properties = [] } = useQuery({
    queryKey: ["advertised-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties?isAdvertised=true&status=verified");
      return res.data.slice(0, 4);
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-8 text-center">
        Advertisement Section
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {properties.map((property, index) => (
          <motion.div
            key={property._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(255, 193, 7, 0.6)" }}
            className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 cursor-pointer"
            onClick={() => navigate(`/property-details/${property._id}`)}
          >
            <img
              src={property.image}
              alt={property.title}
              className="h-40 w-full object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-3">{property.title}</h3>
            <p className="text-sm text-gray-600">{property.location}</p>

            <p className="mt-1 text-xs text-green-600 font-medium">
              ✅ {property.verificationStatus}
            </p>

            <p className="text-purple-600 font-bold mt-1">
              ৳{property.minPrice} - ৳{property.maxPrice}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisementSection;
