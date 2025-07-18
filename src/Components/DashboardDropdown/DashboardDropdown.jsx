import React from 'react';
import { MdDashboard } from "react-icons/md";
import { FaUserTie, FaUserShield, FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router"; 
// import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';

const DashboardDropdown = () => {
//   const { user } = useAuth();
  const [role, loading] = useRole(); 

  if (loading) return null; 

  return (
    <div className="dropdown dropdown-bottom">
      <div tabIndex={0} role="button" className="m-1 flex items-center gap-1 cursor-pointer">
        <MdDashboard />
        Dashboard <IoIosArrowDown size={20} />
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-[#d3d0d7] font-bold text-white rounded-box z-10 w-52 p-2 shadow">
        {role === 'agent' && (
          <li>
            <NavLink to="/dashboard/agent" className="flex items-center gap-2">
              <FaUserTie /> Agent
            </NavLink>
          </li>
        )}
        {role === 'admin' && (
          <li>
            <NavLink to="/dashboard/admin" className="flex items-center gap-2">
              <FaUserShield /> Admin
            </NavLink>
          </li>
        )}
        {role === 'user' && (
          <li>
            <NavLink to="/dashboard/user" className="flex items-center gap-2">
              <FaUser /> User
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default DashboardDropdown;
