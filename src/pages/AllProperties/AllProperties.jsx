import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Helmet } from "react-helmet";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [searchLocation, setSearchLocation] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["all-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties?status=verified");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <p className="text-center mt-10 text-2xl text-black">
        Loading properties...
      </p>
    );

  let filteredProperties = properties.filter((property) =>
    property.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  if (sortOrder === "asc") {
    filteredProperties.sort((a, b) => a.minPrice - b.minPrice);
  } else if (sortOrder === "desc") {
    filteredProperties.sort((a, b) => b.maxPrice - a.maxPrice);
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Helmet>
        <title>AllProperties | LandVista</title>
        <meta name="description" content="All verified properties" />
      </Helmet>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn px-5 mb-5 flex items-center gap-2 text-black hover:text-red-600 border border-gray-300 rounded-lg transition-colors"
      >
        <FaArrowLeftLong /> Back to Previous
      </button>

      {/* Section Heading */}
      <h2 className="text-2xl font-bold mb-6 text-red-600 flex gap-2">
        All Verified Properties
      </h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by location"
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
        className="input input-bordered mb-3 w-full max-w-md mx-auto block text-center text-lg placeholder:text-gray-400 rounded-lg shadow-md"
      />

      {/* Sort Select */}
      <div className="mb-6 max-w-md mx-auto">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered w-full rounded-lg shadow-md"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No properties found.
          </p>
        ) : (
          filteredProperties.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-red-200 transition-shadow duration-300"
            >
              <img
                src={property.image}
                alt={property.title}
                className="h-48 w-full object-cover rounded-lg"
              />
              <h3 className="text-lg font-bold mt-3 text-black">{property.title}</h3>
              <p className="text-sm text-black">{property.location}</p>

              <div className="flex items-center gap-2 mt-2">
                <img
                  src={property.agentImage}
                  alt={property.agentName}
                  className="w-8 h-8 rounded-full border"
                />
                <span className="text-sm text-black">{property.agentName}</span>
              </div>

              <p className="mt-1 text-sm text-red-600 font-medium">
                ✅ {property.verificationStatus}
              </p>

              <p className="text-red-600 font-bold mt-1">
                ৳{property.minPrice} - ৳{property.maxPrice}
              </p>

              <button
                onClick={() => navigate(`/property-details/${property._id}`)}
                className="mt-4 w-full py-2 rounded-lg border-1 border-red-600 text-black font-semibold hover:bg-red-600 hover:text-white transition-colors"
              >
                See Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllProperties;
