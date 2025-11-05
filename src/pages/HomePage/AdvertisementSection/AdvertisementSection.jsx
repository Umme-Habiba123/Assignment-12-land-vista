import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaUserTie, FaArrowRight } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxios";

const AdvertisementSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data: advertisedProperties = [], isLoading, error } = useQuery({
    queryKey: ["advertised-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties?isAdvertised=true&status=verified");
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center mt-10 text-gray-600">Loading advertised properties...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Failed to load advertisements.</p>;

  if (advertisedProperties.length === 0)
    return <p className="text-center mt-10 text-gray-500">No advertised properties currently.</p>;

  return (
    <section className="max-w-7xl mx-auto p-6 lg:my-30">
      <h2 className="text-5xl lg:mb-10 font-bold mb-6 text-center text-black sansita-font">
        Featured <span className="text-red-500">Properties</span>
      </h2>

      <div className="flex space-x-6 overflow-x-auto pb-4">
        {advertisedProperties.slice(0, 4).map((property) => (
          <motion.div
            key={property._id}
            className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md border border-gray-200 cursor-pointer flex overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => (window.location.href = `/property-details/${property._id}`)}
          >
            {/* Property Image */}
            <img
              src={property.image}
              alt={property.title}
              className="w-32 h-32 object-cover rounded-l-lg"
              loading="lazy"
            />

            {/* Property Info */}
            <div className="p-4 flex flex-col justify-between flex-1">
              <h3 className="text-lg font-bold text-black">{property.title}</h3>

              <div className="flex items-center text-red-500 font-semibold mt-1">
                <FaMoneyBillWave className="mr-1" />
                ৳{property.minPrice.toLocaleString()} - ৳{property.maxPrice.toLocaleString()}
              </div>

              <div className="flex items-center text-black mt-1">
                <FaUserTie className="mr-1 text-red-500" />
                {property.agentName}
              </div>

              <button
                className="mt-3 inline-flex items-center text-sm font-medium text-red-500 hover:text-black transition"
              >
                See Details <FaArrowRight className="ml-1" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AdvertisementSection;
