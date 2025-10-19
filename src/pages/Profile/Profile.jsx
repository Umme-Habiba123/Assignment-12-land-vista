import React, { useState } from 'react';

import userPhoto from '../../assets/user.png';
import useAuth from '../../hooks/useAuth';

const Profile = () => {
  const { user, updateUserProfile } = useAuth(); 
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    updateUserProfile({ displayName, photoURL })
      .then(() => {
        setSuccess('Profile Updated Successfully!');
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex justify-center items-start py-12">
      <div className="bg-white shadow-lg rounded-2xl w-11/12 md:w-3/4 lg:w-2/3 p-8 flex flex-col md:flex-row gap-8">
        {/* Left Side - Photo */}
        <div className="flex flex-col items-center gap-4 md:w-1/3">
          <img
            src={photoURL || userPhoto}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-purple-300"
          />
          <p className="text-lg font-semibold">{user?.displayName || 'Your Name'}</p>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>

        {/* Right Side - Info Form */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
          {success && (
            <p className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">{success}</p>
          )}
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Photo URL</label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Image URL"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white font-semibold py-2 rounded hover:bg-purple-700 transition-colors"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
