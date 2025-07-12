// pages/MyProperties.jsx
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyProperties = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // ✅ Load agent's properties
    const { data: properties = [], isLoading } = useQuery({
        queryKey: ["myProperties", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/properties?agentEmail=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // ✅ Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/properties/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["myProperties", user?.email]);
            Swal.fire("Deleted!", "Property has been removed.", "success");
        },
        onError: () => {
            Swal.fire("Error!", "Failed to delete property.", "error");
        },
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) return <p className=" text-green-600 font-bold text-center text-xl">Loading...</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">My Added Properties</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {properties.map((property) => (
                    <div key={property._id} className="border rounded-xl p-4 shadow-md">
                        <img
                            src={property.image}
                            alt={property.title}
                            className="w-full h-48 object-cover rounded mb-2"
                        />
                        <h3 className="text-lg font-bold">{property.title}</h3>
                        <p className="text-sm text-gray-600">{property.location}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <img
                                src={property.agentImage}
                                alt={property.agentName}
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="text-sm">{property.agentName}</span>
                        </div>
                        <p className="mt-2">
                            <strong>Status:</strong>{" "}
                            <span
                                className={`${property.verificationStatus === "verified"
                                    ? "text-green-600"
                                    : property.verificationStatus === "rejected"
                                        ? "text-red-600"
                                        : "text-yellow-600"
                                    }`}
                            >
                                {property.verificationStatus}
                            </span>
                        </p>
                        <p className="mt-1">
                            <strong>Price:</strong> ৳{property.minPrice} - ৳{property.maxPrice}
                        </p>
                        <div className="mt-4 flex justify-between">
                            {property.verificationStatus !== "rejected" && (

                                <Link to={`/dashboard/agent/update-property/${property._id}`}>
                                    <button className="p-2 bg-[#2D283E] text-white rounded hover:bg-[#9c9b9e] text-sm hover:text-black font-bold cursor-pointer">
                                        Update Property
                                    </button>
                                </Link>

                            )}
                            <button
                                onClick={() => handleDelete(property._id)}
                                className="bg-orange-300 text-black font-semibold px-4 py-1 rounded hover:bg-red-600 text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyProperties;
