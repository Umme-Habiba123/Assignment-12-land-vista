import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


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
      <p className="text-center mt-10 text-2xl text-blue-600">
        Loading sales...
      </p>
    );

  // Decide how many properties to show
  const displayedSales = showAll ? sales : sales.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Helmet>
        <title>Hot Sales | LandVista</title>
      </Helmet>

      <h2 className="text-2xl font-bold mb-6 text-red-600">
        🔥 Hot Sales
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedSales.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No sales available now.
          </p>
        ) : (
          displayedSales.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
            >
              <img
                src={property.image}
                alt={property.title}
                className="h-48 w-full object-cover rounded-lg"
              />
              <h3 className="text-lg font-bold mt-3">{property.title}</h3>
              <p className="text-sm text-gray-600">{property.location}</p>

              <p className="text-red-600 font-bold mt-1">
                Sale Price: ৳{property.salePrice}
              </p>
              <p className="text-gray-500 line-through">
                Original: ৳{property.originalPrice}
              </p>

              <button
                onClick={() => navigate(`/property-details/${property._id}`)}
                className="mt-4 btn btn-sm btn-outline btn-primary w-full"
              >
                See Details
              </button>
            </div>
          ))
        )}
      </div>

      {/* See More / Show Less Button */}
      {sales.length > 3 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn btn-primary"
          >
            {showAll ? "Show Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SalesSection;
