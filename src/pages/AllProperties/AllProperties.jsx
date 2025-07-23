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
      <p className="text-center mt-10 text-2xl text-green-600">
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
        <title>ALlProperties | LandVista</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <button
        onClick={() => navigate(-1)}
        className="btn px-5 mb-5 sansita-font text-lg flex items-center gap-2"
      >
        <FaArrowLeftLong /> Back to Previous
      </button>

      <h2 className="text-2xl font-bold mb-6 text-purple-700 flex gap-2">
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


      <div className="mb-6 max-w-md mx-auto">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered w-full rounded-lg shadow-md"
        >
          <option value="" >Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No properties found.
          </p>
        ) : (
          filteredProperties.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
            >
              <img
                src={property.image}
                alt="Property"
                className="h-48 w-full object-cover rounded-lg"
              />
              <h3 className="text-lg font-bold mt-3">{property.title}</h3>
              <p className="text-sm text-gray-600">{property.location}</p>

              <div className="flex items-center gap-2 mt-2">
                <img
                  src={property.agentImage}
                  alt="Agent"
                  className="w-8 h-8 rounded-full border"
                />
                <span className="text-sm text-gray-700">{property.agentName}</span>
              </div>

              <p className="mt-1 text-xs text-green-600 font-medium">
                ✅ {property.verificationStatus}
              </p>

              <p className="text-purple-600 font-bold mt-1 sansita-font">
                ৳{property.minPrice} - ৳{property.maxPrice}
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
    </div>
  );
};

export default AllProperties;
