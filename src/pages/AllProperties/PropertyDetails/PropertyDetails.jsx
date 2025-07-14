import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaArrowLeftLong } from "react-icons/fa6";

const PropertyDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
   const navigate = useNavigate();

  // ✅ Load property details
  const { data: property, isLoading } = useQuery({
    queryKey: ["property-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      return res.data;
    },
  });

  // ✅ Load reviews for this property
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?propertyId=${id}`);
      return res.data;
    },
  });

  // ✅ Wishlist mutation
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
    onError: () => {
      Swal.fire("Error!", "Failed to add to wishlist", "error");
    },
  });

  // ✅ Review mutation
  const reviewMutation = useMutation({
    mutationFn: async () => {
      const reviewData = {
        propertyId: id,
        userEmail: user.email,
        userName: user.displayName,
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

  if (isLoading) return <p className="text-center text-green-600">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
       <button onClick={()=>navigate(-1)} className="btn px-5 mb-5 sansita-font text-lg"><FaArrowLeftLong /> Back to Previous</button>

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
        {reviews.length === 0 ? (
          <p>No reviews yet for this property.</p>
        ) : (
          <ul className="space-y-2">
            {reviews.map((review) => (
              <li key={review._id} className="border border-gray-300 p-2 rounded space-y-1">
                <p className="font-semibold">{review.userName}</p>
                <p className="text-gray-700">{review.review}</p>
                <p className="text-sm text-gray-500">{new Date(review.reviewedAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}

        {/* Add Review Button */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add a Review
        </button>
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4 sansita-font ">Write a Review</h3>
            <textarea
              className="w-full text-lg border-2 border-gray-300 focus:outline-none focus:border-purple-300  p-2 rounded"
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
