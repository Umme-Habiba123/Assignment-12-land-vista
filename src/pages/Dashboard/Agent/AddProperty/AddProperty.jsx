import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import axios from 'axios';

const AddProperty = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [imageURL, setImageURL] = useState(null);
  const { register, handleSubmit } = useForm();

    const handleImageUpload = async (e) => {
  const image = e.target.files[0];

  const formData = new FormData();
  formData.append('image', image);

  const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_Key}`;

  try {
    const res = await axios.post(imageUploadUrl, formData);
    if (res.data.success) {
      setImageURL(res.data.data.url);
      Swal.fire("Uploaded!", "Image uploaded successfully.", "success");
    }
  } catch (err) {
    console.error("Image upload failed", err);
    Swal.fire("Failed", "Image upload failed!", "error");
  }
};


  const onSubmit = async (data) => {
    const propertyData = {
      title: data.title,
      location: data.location,
      image: imageURL,
      agentName: user.displayName,
      agentEmail: user.email,
      minPrice: parseFloat(data.minPrice),
      maxPrice: parseFloat(data.maxPrice),
      createdAt: new Date(),
      verificationStatus: 'pending'
    };

    try {
      const res = await axiosSecure.post('/addProperties', propertyData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success", // ✅ "success", "error", "info", etc.
          title: "Added!",
          text: "Property added successfully"
        });

      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error', 'Something went wrong!', 'error');
    }
  };




  return (
    <div className="min-h-screen bg-gray-200 flex">

      {/* Form area */}
      <main className="flex-1 bg-white p-10 shadow-sm">
        <h2 className="text-3xl font-bold mb-6 sansita-font">Add New Property</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block font-semibold mb-1">Property Title</label>
              <input
                type="text"
                {...register('title', { required: true })}
                className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:outline-none  focus:border-purple-200"
                placeholder="Ex: Luxury Villa"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block font-semibold mb-1">Property Location</label>
              <input
                type="text"
                {...register('location', { required: true })}
                className="w-full rounded px-4 py-2 focus:outline-none focus:border-purple-200 border-2 border-gray-300"
                placeholder="Ex: Dhanmondi, Dhaka"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block font-semibold mb-1">Property Image</label>
              <input
                type="file"
                {...register('image', { required: true })}
                  onChange={handleImageUpload}
                className="w-full file-input file-input-bordered border-2 border-gray-300 focus:outline-none focus:border-purple-200"
                accept="image/*"
              />
            </div>

            {/* Agent Name */}
            <div>
              <label className="block font-semibold mb-1">Agent Name</label>
              <input
                type="text"
                value={user?.displayName || ''}
                readOnly
                className="w-full rounded px-4 py-2 bg-gray-100 border-2 border-gray-300 focus:outline-none focus:border-purple-200"
              />
            </div>

            {/* Agent Email */}
            <div>
              <label className="block font-semibold mb-1">Agent Email</label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="w-full rounded px-4 py-2 bg-gray-100 border-2 border-gray-300 focus:outline-none focus:border-purple-200"
              />
            </div>

            {/* Price Range */}
            <div className="grid grid-cols-2 gap-4 col-span-2">
              <div>
                <label className="block font-semibold mb-1">Min Price</label>
                <input
                  type="number"
                  {...register('minPrice', { required: true })}
                  className="w-full rounded px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-purple-200"
                  placeholder="Ex: 150000"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Max Price</label>
                <input
                  type="number"
                  {...register('maxPrice', { required: true })}
                  className="w-full rounded px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-purple-200"
                  placeholder="Ex: 350000"
                />
              </div>
            </div>
          </div>

          <button className="px-6 py-3 bg-[#2D283E] text-white rounded hover:bg-[#9c9b9e] hover:text-black font-bold cursor-pointer">
            Add Property
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddProperty;
