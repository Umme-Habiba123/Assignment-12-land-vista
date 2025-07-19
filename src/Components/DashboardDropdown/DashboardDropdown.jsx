import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaUserTie, FaUserShield, FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router"; // react-router-dom হওয়া উচিত
import useRole from "../../hooks/useRole";


const DashboardDropdown = () => {
  const [role, loading] = useRole();

  if (loading) return null;

  const menuItems = {
    agent: {
      path: "/dashboard/agent",
      icon: <FaUserTie />,
      label: "Agent",
    },
    admin: {
      path: "/dashboard/admin",
      icon: <FaUserShield />,
      label: "Admin",
    },
    user: {
      path: "/dashboard/user",
      icon: <FaUser />,
      label: "User",
    },
  };

  const menu = menuItems[role];

  return (
    <div className="dropdown dropdown-bottom sansita-font">
      <div tabIndex={0} role="button" className="m-1 flex items-center gap-1 cursor-pointer">
        <MdDashboard />
        Dashboard <IoIosArrowDown size={20} />
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-[#d3d0d7] font-bold text-black rounded-box z-10 w-52 p-2 shadow">
        {menu ? (
          <li>
            <NavLink
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "text-purple-500" : ""}`
              }
            >
              {menu.icon} {menu.label}
            </NavLink>
          </li>
        ) : (
          <li className="text-gray-300">No dashboard available</li>
        )}
      </ul>
    </div>
  );
};

export default DashboardDropdown;
