import { NavLink, Outlet } from "react-router";

const AdminSidebar = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <NavLink to="/dashboard/admin" className={({ isActive }) => isActive ? 'font-bold text-purple-600' : ''}>
              Admin Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/manage-properties" className={({ isActive }) => isActive ? 'font-bold text-purple-600' : ''}>
              Manage Properties
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/manage-users" className={({ isActive }) => isActive ? 'font-bold text-purple-600' : ''}>
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/manage-reviews" className={({ isActive }) => isActive ? 'font-bold text-purple-600' : ''}>
              Manage Reviews
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
    
    </div>
  );
};

export default AdminSidebar;
