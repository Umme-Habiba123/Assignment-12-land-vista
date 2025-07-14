import { NavLink, Outlet } from 'react-router'; // ← ভুল ছিল 'react' থেকে import করছিলে
import { FaUser, FaHeart, FaStar, FaHouseUser } from 'react-icons/fa';

const UserDashboard = () => {
  return (
    <div className="lg:flex">
     
      {/* Main Content */}
      <div className="lg:w-3/4 p-4">
        <Outlet /> {/* এখানে MyProfile বা অন্যান্য পেজ রেন্ডার হবে */}
      </div>
    </div>
  );
};

export default UserDashboard;
