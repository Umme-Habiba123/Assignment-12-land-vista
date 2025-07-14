import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxios from '../../../hooks/useAxios';
import VistaLand from '../../Shared/ProjectLogo/VistaLand';

const Registration = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
    const [profilePic, setProfilePic] = useState('');
    const axiosInstance = useAxios();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(async () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'Welcome to VistaLand!',
                    timer: 2000,
                    showConfirmButton: false
                });
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    role: 'user',
                    isFirstLogin: true,
                    createdAt: new Date().toISOString()
                };
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                };

                updateUserProfile(userProfile)
                    .then(async () => {
                        await axiosInstance.post('/users', userInfo);
                        navigate(from);
                    }).catch(console.error);
            })
            .catch(console.error);
    };

  const handleRegister = () => {
  signInWithGoogle()
    .then(async (result) => {
      const user = result.user;

      const userInfo = {
        name: user.displayName, // এখানে `user.name` নয়, `user.displayName` দিতে হবে
        email: user.email,
         photo: user.photoURL,
        role: 'user',
        isFirstLogin: true,
        createdAt: new Date().toISOString()
      };

      try {
        await axiosInstance.post('/users', userInfo); // Save user in DB

        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Welcome to VistaLand!',
          timer: 2000,
          showConfirmButton: false
        });

        navigate(from);
      } catch (err) {
        console.error("Failed to save Google user:", err);
      }
    })
    .catch((error) => {
      console.error("Google Sign-in failed:", error);
    }); 
};


    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const imageUploadUrl = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_upload_Key}`;
        const res = await axios.post(imageUploadUrl, formData);
        setProfilePic(res.data.data.url);
    };

    return (
        <div className="min-h-screen px-4 py-10 bg-gray-100">
            {/* Logo */}
            <div className="max-w-4xl mx-auto mb-8">
                <VistaLand />
            </div>

            {/* Registration Card */}
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sansita-font">
                    Create An Account
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Name</label>
                        <input {...register('name', { required: true })} type="text" className="input input-bordered w-full" placeholder="Your Name" />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Profile Picture</label>
                        <input onChange={handleImageUpload} type="file" className="file-input file-input-bordered w-full cursor-pointer" />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input {...register('email', { required: true })} type="email" className="input input-bordered w-full" placeholder="Email" />
                        {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Password</label>
                        <input
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'At least 6 characters' },
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                                    message: 'Must include capital & special char'
                                }
                            })}
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="Create a password"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Confirm Password</label>
                        <input
                            {...register('confirmPassword', {
                                required: 'Please confirm password',
                                validate: (value) => value === watch('password') || 'Passwords do not match'
                            })}
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    <button className="btn w-full bg-[#5c5a6a] text-white hover:bg-[#2D283E] border-none font-semibold">
                        Register
                    </button>

                    <p className="text-center mt-2">
                        Already have an account?
                        <Link to="/login" className="ml-1 text-blue-600 hover:underline">Login</Link>
                    </p>

                    <div className="divider">OR</div>

                    <button
                        onClick={handleRegister}
                        type="button"
                        className="btn w-full bg-white text-black border-gray-300 hover:bg-gray-200 flex items-center justify-center gap-2"
                    >
                        <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" /><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" /><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" /><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" /></g></svg>
                        Continue with Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Registration;
