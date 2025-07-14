import { NavLink, Outlet } from "react-router";
import AdminSidebar from "./AdminSidebar/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
     <AdminSidebar></AdminSidebar>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
