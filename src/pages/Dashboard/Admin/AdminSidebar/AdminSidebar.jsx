import { NavLink } from "react-router";
import { FaUserShield, FaHome, FaUsersCog, FaStar, FaBullhorn } from "react-icons/fa";
import VistaLand from "../../../Shared/ProjectLogo/VistaLand";

const AdminSidebar = () => {
  return (
   <div>
   
     <div className="flex mt-5">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 min-h-screen">
        <h2 className="text-2xl font-bold mb-6 sansita-font ">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/dashboard/admin"
              end  // <== এইটা যোগ করলে শুধুমাত্র পুরো মিলে active হবে
              className={({ isActive }) =>
                isActive ? "font-bold text-purple-600 flex items-center gap-2" : "flex items-center gap-2"
              }
            >
              <FaUserShield />
              Admin Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/manage-properties"
              className={({ isActive }) =>
                isActive ? "font-bold text-purple-600 flex items-center gap-2" : "flex items-center gap-2"
              }
            >
              <FaHome />
              Manage Properties
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/manage-users"
              className={({ isActive }) =>
                isActive ? "font-bold text-purple-600 flex items-center gap-2" : "flex items-center gap-2"
              }
            >
              <FaUsersCog />
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/manage-reviews"
              className={({ isActive }) =>
                isActive ? "font-bold text-purple-600 flex items-center gap-2" : "flex items-center gap-2"
              }
            >
              <FaStar />
              Manage Reviews
            </NavLink>
          </li>

           <li>
              <NavLink
                to="/dashboard/admin/advertise-property"
                className={({ isActive }) =>
                  isActive ? "font-bold text-purple-600 flex items-center gap-2" : "flex items-center gap-2"
                }
              >
                <FaBullhorn />
                Advertise Property
              </NavLink>
            </li>

        </ul>
      </aside>

      {/* Main Content */}
    </div>
   </div>
  );
};

export default AdminSidebar;
