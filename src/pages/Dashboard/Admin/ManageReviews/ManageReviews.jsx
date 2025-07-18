// pages/admin/ManageReviews.jsx
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/reviews/${id}`);
        Swal.fire("Deleted!", "Review deleted successfully.", "success");
        refetch();
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Failed to delete review.", "error");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <div key={review._id} className="border rounded-lg p-4 shadow">
          <div className="flex items-center gap-3 mb-2">
            <img src={review.reviewerImage} className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-semibold">{review.reviewerName}</p>
              <p className="text-sm text-gray-500">{review.reviewerEmail}</p>
            </div>
          </div>
          <h4 className="font-medium text-gray-700">{review.propertyTitle}</h4>
          <p className="text-sm mt-2">{review.review}</p>
          <button
            className="btn btn-sm btn-error mt-3"
            onClick={() => handleDelete(review._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageReviews;
