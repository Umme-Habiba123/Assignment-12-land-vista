import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaUserTie, FaUserShield, FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router"; 
import useRole from "../../hooks/useRole";
import { Helmet } from "react-helmet";


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
      <Helmet>
        <title>Dashboard | LandVista</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <div tabIndex={0} role="button" className="mt-2 flex items-center gap-1 cursor-pointer font-semibold ">
       
        Dashboard <IoIosArrowDown size={15} />
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
          <li className="text-black">No dashboard available</li>
        )}
      </ul>
    </div>
  );
};

export default DashboardDropdown;
