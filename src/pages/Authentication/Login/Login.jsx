import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';
import VistaLand from '../../Shared/ProjectLogo/VistaLand';
import { IoEyeOutline } from 'react-icons/io5';
import { LuEyeClosed } from 'react-icons/lu';

const Login = () => {
  const { signInWithGoogle, signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosIntance = useAxios();
      const [showPassword, setShowPassword] = useState(false)

      const toggleShow = () => {
        setShowPassword((prev) => !prev)
    }

  const from = location.state?.from || '/';
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    signIn(data.email, data.password)
      .then(async (result) => {
        const loggedUser = result.user;

        const userInfo = {
          email: loggedUser.email,
          role: 'user',
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString()
        };

        const res = await axiosIntance.post('/users', userInfo);
        console.log('user update info', res.data);

        navigate(from);
      })
  };

  const handleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;

        const token = await user.getIdToken()
        localStorage.setItem('token', token)

        const userInfo = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: 'user',
          isFirstLogin: true,
          createdAt: new Date().toISOString()
        };

        try {
          await axiosIntance.get(`/users/${encodeURIComponent(user.email)}`);
          console.log(" Google user already exists");
        } catch (err) {
          if (err.response?.status === 404) {
            try {
              await axiosIntance.post('/users', userInfo);
              console.log("New Google user saved");
            } catch (postErr) {
              console.error("Failed to save new user:", postErr);
            }
          } else {
            console.error(" Error checking user:", err);
          }
        }

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: `Welcome, ${user.displayName}!`,
          timer: 2000,
          showConfirmButton: false
        });

        navigate(from);
      })
      .catch((error) => {
        console.error(" Google Sign-in failed:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-400 flex flex-col items-center justify-center px-4">
      {/* Project Logo */}
      <div className="mb-6 ">
        <VistaLand />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

            {/* Email */}
            <div>
              <label className="label">Email</label>
              <input
                {...register('email', { required: true })}
                type="email"
                className="input w-full border px-3 py-2 rounded-md"
                placeholder="Email"
              />
            </div>

            {/* Password */}
            <div className='relative'>
              <label className="label">Password</label>
              <input
                {...register('password', {
                  required: true,
                  minLength: 6,
                  maxLength: 20
                })}
                 type={showPassword ? 'text' : 'password'}
                className="input w-full border px-3 py-2 rounded-md"
                placeholder="Password"
              />


              <button type='button absolute'
                className='absolute  lg:mt-1 right-4 cursor-pointer absolute'
                onClick={toggleShow}>

                {showPassword ? <IoEyeOutline size={23} /> : <LuEyeClosed size={23} />}
              </button>
              {errors.password?.type === 'required' && (
                <p className="text-red-500 text-sm mt-1">Password is required</p>
              )}
              {errors.password?.type === 'minLength' && (
                <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>
              )}
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <a className="text-sm text-blue-600 hover:underline cursor-pointer">Forgot password?</a>
            </div>

            {/* Login Button */}
            <button
              className="btn w-full bg-[#CAEB66] text-black mt-4 hover:bg-amber-600 font-semibold text-lg"
            >
              Login
            </button>

            {/* Register Link */}
            <p className="text-center mt-2 text-sm">
              Don't have an account?
              <Link state={from} to={'/registration'}>
                <button className="btn btn-link text-blue-600">Register</button>
              </Link>
            </p>
          </fieldset>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleSignIn}
            className="btn w-full bg-white text-black border border-gray-300 hover:bg-gray-200"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="mr-2"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
              </g>
            </svg>
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
