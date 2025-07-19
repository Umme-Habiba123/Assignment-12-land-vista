import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const PropertyDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const navigate = useNavigate();

  // Load property details
  const { data: property, isLoading } = useQuery({
    queryKey: ["property-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      return res.data;
    },
  });

  // Load reviews for this property ONLY
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?propertyId=${id}`);
      return res.data;
    },
  });

  // Separate current user's review and other users' reviews
  const userReview = reviews.find((review) => review.userEmail === user.email);
  const otherReviews = reviews.filter((review) => review.userEmail !== user.email);

  // Wishlist mutation
  const wishlistMutation = useMutation({
    mutationFn: async () => {
      const wishlistData = {
        propertyId: id,
        userEmail: user.email,
        addedAt: new Date(),
      };
      await axiosSecure.post("/wishlist", wishlistData);
    },
    onSuccess: () => {
      Swal.fire("Added!", "Property added to wishlist", "success");
    },
    onError: (error) => {
      if (error?.response?.status === 409) {
        Swal.fire("Already Added", "This property is already in your wishlist", "info");
      } else {
        Swal.fire("Error!", "Failed to add to wishlist", "error");
      }
    },
  });

  // Review mutation to post new review
  const reviewMutation = useMutation({
    mutationFn: async () => {
      const reviewData = {
        propertyId: id,
        userEmail: user.email,
        userName: user.displayName,
        propertyTitle: property.title,
        review: reviewText,
        reviewedAt: new Date(),
      };
      await axiosSecure.post("/reviews", reviewData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", id]);
      Swal.fire("Thank you!", "Your review has been added", "success");
      setShowModal(false);
      setReviewText("");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to submit review", "error");
    },
  });

  if (isLoading)
    return <p className="text-center text-green-600 mt-10">Loading property details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="btn px-5 mb-5 sansita-font text-lg flex items-center gap-2"
      >
        <FaArrowLeftLong /> Back to Previous
      </button>

      <img
        src={property.image}
        alt={property.title}
        style={{ width: "100%", height: "500px", objectFit: "cover", borderRadius: "8px" }}
      />

      <h2 className="text-3xl font-bold">{property.title}</h2>
      <p className="text-gray-600">{property.description}</p>
      <p className="text-lg">
        <strong>Price Range:</strong> ৳{property.minPrice} - ৳{property.maxPrice}
      </p>
      <p>
        <strong>Agent:</strong> {property.agentName}
      </p>
      <button
        onClick={() => wishlistMutation.mutate()}
        className="bg-[#564F6F] text-white px-4 py-2 rounded hover:bg-[#D1D7E0] hover:text-black"
      >
        Add to Wishlist
      </button>

      {/* Reviews Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>

        {/* User's own review */}
        {userReview ? (
          <div className="border border-blue-400 bg-blue-50 p-4 rounded mb-6">
            <h4 className="text-lg font-semibold text-blue-700 mb-1">Your Review</h4>
            <p className="text-gray-800">{userReview.review}</p>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(userReview.reviewedAt).toLocaleString("en-GB")}
            </p>
          </div>
        ) : (
          // If user hasn't reviewed yet, show Add Review button
          <button
            onClick={() => setShowModal(true)}
            className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add a Review
          </button>
        )}

        {/* Other users' reviews */}
        {otherReviews.length === 0 ? (
          <p className="text-gray-600 italic">No other reviews yet.</p>
        ) : (
          <ul className="space-y-3">
            {otherReviews.map((review) => (
              <li key={review._id} className="border border-gray-300 p-3 rounded">
                <p className="font-semibold">{review.userName}</p>
                <p className="text-gray-700">{review.review}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.reviewedAt).toLocaleString("en-GB")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4 sansita-font">Write a Review</h3>
            <textarea
              className="w-full text-lg border-2 border-gray-300 focus:outline-none focus:border-purple-300 p-2 rounded"
              rows={4}
              placeholder="Write your thoughts..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => reviewMutation.mutate()}
                className="px-4 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                disabled={!reviewText.trim()}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
