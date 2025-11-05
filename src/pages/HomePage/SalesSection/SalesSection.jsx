import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const SalesSection = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  // Fetch all sales properties
  const { data: sales = [], isLoading } = useQuery({
    queryKey: ["sales-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties?sale=true");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <p className="text-center mt-10 text-2xl text-red-600 font-semibold">
        Loading sales...
      </p>
    );

  // Decide how many properties to show
  const displayedSales = showAll ? sales : sales.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-5 py-12 bg-white text-black">
      <Helmet>
        <title>Hot Sales | LandVista</title>
      </Helmet>

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-10"
      >
        <span className="text-red-600">🔥 Hot</span> Sales
      </motion.h2>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedSales.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No sales available now.
          </p>
        ) : (
          displayedSales.map((property, index) => (
            <motion.div
              key={property._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden hover:shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                  src={property.image}
                  alt={property.title}
                  className="h-56 w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-black mb-1 group-hover:text-red-600 transition-colors">
                  {property.title}
                </h3>
                <p className="text-gray-600 text-sm">{property.location}</p>

                <div className="mt-3">
                  <p className="text-red-600 font-bold text-base">
                    Sale Price: ৳{property.salePrice}
                  </p>
                  <p className="text-gray-400 text-sm line-through">
                    Original: ৳{property.originalPrice}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/property-details/${property._id}`)}
                  className="mt-5 w-full py-2 border border-red-600 text-red-600 font-semibold rounded-md hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  See Details
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* See More / Show Less Button */}
      {sales.length > 3 && (
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-black transition-all duration-300"
          >
            {showAll ? "Show Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SalesSection;
