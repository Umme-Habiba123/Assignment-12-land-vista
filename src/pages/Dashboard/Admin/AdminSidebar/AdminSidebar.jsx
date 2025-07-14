import { NavLink, Outlet } from "react-router";

const AdminSidebar = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 min-h-screen">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <ul className="space-y-2">
          <li><NavLink to="/dashboard/admin">Admin Profile</NavLink></li>
          <li><NavLink to="/dashboard/admin/manage-properties">Manage Properties</NavLink></li>
          <li><NavLink to="/dashboard/admin/manage-users">Manage Users</NavLink></li>
          <li><NavLink to="/dashboard/admin/manage-reviews">Manage Reviews</NavLink></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminSidebar;
