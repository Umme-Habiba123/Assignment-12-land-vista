import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5000", 
});

const LatestReviews = () => {
  const { data: reviews = [], isLoading, isError, error } = useQuery({
    queryKey: ["latest-reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews/latest");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Loading latest reviews...</div>;
  }

  if (isError) {
    console.error("Error loading latest reviews:", error);
    return <div className="text-center py-10 text-red-500">Failed to load reviews.</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Section title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2D283E]">Latest User Reviews</h2>
        <p className="text-[#802BB1] mt-2">What our clients are saying</p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.reviewerImage || "https://i.ibb.co/qMcrs81z/myself1.jpg"}
                alt={review.userName || "Reviewer"}
                className="w-14 h-14 rounded-full object-cover"
                onError={(e) => (e.target.src = "https://i.ibb.co/qMcrs81z/myself1.jpg")}
              />
              <div>
                <h4 className="font-semibold text-[#2D283E]">{review.userName || "Anonymous"}</h4>
                <p className="text-sm text-[#564F6F] italic">{review.propertyTitle || "No Title"}</p>
              </div>
            </div>
            <p className="text-[#4C495D] text-sm">{review.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestReviews;
