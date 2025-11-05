import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PropertyListings = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Fetch all verified properties
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

  // Filter & Search Logic
  let filteredProperties = properties.filter((property) => {
    const search = searchTerm.toLowerCase();
    return (
      property.title.toLowerCase().includes(search) ||
      property.location.toLowerCase().includes(search) ||
      property.agentName.toLowerCase().includes(search)
    );
  });

  // Sort Logic (by average price)
  if (sortOrder === "asc") {
    filteredProperties.sort(
      (a, b) =>
        (a.minPrice + a.maxPrice) / 2 - (b.minPrice + b.maxPrice) / 2
    );
  } else if (sortOrder === "desc") {
    filteredProperties.sort(
      (a, b) =>
        (b.minPrice + b.maxPrice) / 2 - (a.minPrice + a.maxPrice) / 2
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <Helmet>
        <title>Property Listings | LandVista</title>
      </Helmet>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn px-5 mb-5 flex items-center gap-2 text-black hover:text-red-600 border border-gray-300 rounded-lg transition-colors"
      >
        <FaArrowLeftLong /> Back
      </button>

      {/* Section Heading */}
      <h2 className="text-4xl font-bold mb-6 text-red-600 sansita-font">
        All Properties
      </h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by title, location, or agent"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered mb-3 w-full max-w-md mx-auto block text-center text-lg placeholder:text-gray-400 rounded-lg shadow-md"
      />

      {/* Sort */}
      <div className="mb-6 max-w-md mx-auto">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered w-full rounded-lg shadow-md"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No properties found.
          </p>
        ) : (
          filteredProperties.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-red-200 transition-shadow"
            >
              <img
                src={property.image}
                alt={property.title}
                className="h-48 w-full object-cover rounded-lg"
              />

              <h3 className="text-lg font-bold mt-3 text-black">{property.title}</h3>
              <p className="text-sm text-black">{property.location}</p>

              <div className="mt-2 text-sm">
                <p>
                  <span className="font-semibold text-black">Agent:</span>{" "}
                  <span className="text-red-600">{property.agentName}</span>
                </p>
                <p className="text-black">{property.agentEmail}</p>
              </div>

              <p className="text-red-600 font-bold mt-2">
                ৳{property.minPrice.toLocaleString()} - ৳
                {property.maxPrice.toLocaleString()}
              </p>

              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span
                  className={`px-2 py-1 rounded-full font-semibold ${
                    property.verificationStatus === "verified"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {property.verificationStatus}
                </span>
                {property.isAdvertised && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                    Advertised
                  </span>
                )}
              </div>

              <p className="text-[12px] text-black mt-2">
                Added on: {new Date(property.createdAt).toLocaleDateString()}
              </p>

              <button
                onClick={() =>
                  navigate(`/property-details/${property._id}`)
                }
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

export default PropertyListings;
