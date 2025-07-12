// pages/UpdateProperty.jsx
import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth";

const UpdateProperty = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: property = {}, isLoading } = useQuery({
    queryKey: ["singleProperty", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      return await axiosSecure.patch(`/properties/${id}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myProperties"]);
      Swal.fire("Success", "Property updated successfully!", "success");
      navigate("/my-properties");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update property.", "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      image: form.image.value,
      title: form.title.value,
      location: form.location.value,
      minPrice: parseFloat(form.minPrice.value),
      maxPrice: parseFloat(form.maxPrice.value),
    };
    updateMutation.mutate(updated);
  };

  if (isLoading) return <p className="text-green-600 font-bold text-center text-xl">Loading property...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 sansita-font">Update Property</h2>
      <input
        name="image"
        defaultValue={property.image}
        className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none  focus:border-purple-200"
        placeholder="Image URL"
        required
      />
      <input
        name="title"
        defaultValue={property.title}
        className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none  focus:border-purple-200"
        placeholder="Title"
        required
      />
      <input
        name="location"
        defaultValue={property.location}
        className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none  focus:border-purple-200"
        placeholder="Location"
        required
      />
      <input
        value={user.displayName}
        className="w-full mb-2 p-2 border rounded border-gray-300 bg-gray-100 focus:outline-none  focus:border-purple-200"
        readOnly
      />
      <input
        value={user.email}
        className="w-full mb-2 p-2 border rounded border-gray-300 bg-gray-100 focus:outline-none  focus:border-purple-200"
        readOnly
      />
      <input
        name="minPrice"
        type="number"
        defaultValue={property.minPrice}
        className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none  focus:border-purple-200"
        placeholder="Min Price"
        required
      />
      <input
        name="maxPrice"
        type="number"
        defaultValue={property.maxPrice}
        className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none  focus:border-purple-200"
        placeholder="Max Price"
        required
      />
       <button className="p-2 bg-[#2D283E] text-white rounded hover:bg-[#9c9b9e] hover:text-black text-sm font-bold cursor-pointer">
            Update Property
          </button>
    </form>
  );
};

export default UpdateProperty;
