// components/Sidebar/UserSidebar.jsx
import { NavLink } from 'react-router'; 
import { FaUser, FaHeart, FaStar, FaHouseUser } from 'react-icons/fa';
import VistaLand from '../../../Shared/ProjectLogo/VistaLand';

const UserSidebar = () => {
  return (
   <div>
   


       <h2 className="text-xl font-bold text-purple-700 mb-4">User Dashboard</h2>
      <li>
        <NavLink to="/dashboard/user/my-profile">
          <FaUser /> My Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/user/wishlist">
          <FaHeart /> Wishlist
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/user/property-bought">
          <FaHouseUser /> Property Bought
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/user/my-reviews">
          <FaStar /> My Reviews
        </NavLink>
      </li>
   </div>
  );
};

export default UserSidebar;
