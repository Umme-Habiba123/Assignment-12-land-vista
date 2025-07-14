import { NavLink, Outlet } from 'react-router'; // ← ভুল ছিল 'react' থেকে import করছিলে
import { FaUser, FaHeart, FaStar, FaHouseUser } from 'react-icons/fa';

const UserDashboard = () => {
  return (
    <div className="lg:flex">
      {/* Sidebar */}
      <div className="lg:w-1/4">
        <h2 className="text-xl font-bold text-purple-700 mb-4 ml-4">User Dashboard</h2>
        <ul className="menu space-y-2 px-4">
          <li>
            <NavLink
              to="/dashboard/user/my-profile"
              className={({ isActive }) =>
                isActive ? "text-purple-700 font-bold" : ""
              }
            >
              <FaUser /> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/user/wishlist"
              className={({ isActive }) =>
                isActive ? "text-purple-700 font-bold" : ""
              }
            >
              <FaHeart /> Wishlist
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/user/property-bought"
              className={({ isActive }) =>
                isActive ? "text-purple-700 font-bold" : ""
              }
            >
              <FaHouseUser /> Property Bought
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/user/my-reviews"
              className={({ isActive }) =>
                isActive ? "text-purple-700 font-bold" : ""
              }
            >
              <FaStar /> My Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="lg:w-3/4 p-4">
        <Outlet /> {/* এখানে MyProfile বা অন্যান্য পেজ রেন্ডার হবে */}
      </div>
    </div>
  );
};

export default UserDashboard;
