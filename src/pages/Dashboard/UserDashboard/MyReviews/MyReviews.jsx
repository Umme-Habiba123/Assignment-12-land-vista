import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ['my-reviews', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user.email}`);
      return res.data;
    }
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This review will be permanently deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/reviews/${id}`);
      Swal.fire("Deleted!", "Your review has been deleted.", "success");
      refetch();
    }
  };

  return (
    <div className="space-y-4 p-4">
      {reviews.map(review => (
        <div key={review._id} className="border p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold">{review.propertyTitle}</h3>
          <p className="text-sm text-gray-600">Agent: {review.agentName}</p>
          <p className="text-sm text-gray-500">Time: {new Date(review.reviewTime).toLocaleString()}</p>
          <p className="mt-2">{review.description}</p>
          <button
            onClick={() => handleDelete(review._id)}
            className="btn btn-sm btn-error mt-3"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyReviews;
