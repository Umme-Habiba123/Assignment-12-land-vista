// components/Sidebar/AgentSidebar.jsx
import { NavLink } from "react-router"; // fixed import
import {
  FaUserCircle,
  FaPlusCircle,
  FaClipboardList,
  FaCheckCircle,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import VistaLand from "../../../Shared/ProjectLogo/VistaLand";

const AgentSidebar = () => {
  const menuItems = [
    { path: "/dashboard/agent/profile", icon: <FaUserCircle />, label: "Profile" },
    { path: "/dashboard/agent/addProperty", icon: <FaPlusCircle />, label: "Add Property" },
    { path: "/dashboard/agent/my-properties", icon: <FaClipboardList />, label: "My Properties" },
    { path: "/dashboard/agent/sold-properties", icon: <FaCheckCircle />, label: "Sold Properties" },
    { path: "/dashboard/agent/offered-properties", icon: <FaEnvelopeOpenText />, label: "Offered Properties" },
  ];

  return (
    <div className="flex flex-col h-full bg-base-200 text-black">
      {/* Logo and Title */}
      <div className="flex flex-col items-center lg:items-start p-4">
   
        <h2 className="text-xl lg:text-2xl font-bold text-purple-700 mt-4 mb-6 text-center lg:text-left">
          Agent Dashboard
        </h2>
      </div>

      {/* Menu */}
      <ul className="flex-1 flex flex-col gap-2 px-2 lg:px-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-lg transition-colors duration-200
                 ${isActive ? "bg-purple-200 font-semibold" : "hover:bg-purple-100"}`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {/* Show label on small screens too */}
              <span className="text-black">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Optional Footer */}
      <div className="p-4 hidden lg:block">
        <p className="text-xs text-gray-500 text-center lg:text-left">
          &copy; 2025 VistaLand
        </p>
      </div>
    </div>
  );
};

export default AgentSidebar;
