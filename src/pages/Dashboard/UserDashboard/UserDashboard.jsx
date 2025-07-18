import { NavLink, Outlet } from 'react-router'; 
import { FaUser, FaHeart, FaStar, FaHouseUser } from 'react-icons/fa';

const UserDashboard = () => {
  return (
    <div className="lg:flex">
     
     
      <div className="lg:w-3/4 p-4">
        <Outlet /> 
      </div>
    </div>
  );
};

export default UserDashboard;
