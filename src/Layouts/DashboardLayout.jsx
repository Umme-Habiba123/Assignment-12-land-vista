import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router';
import UserSidebar from '../pages/Dashboard/UserDashboard/UserSidebar/UserSidebar';
import AgentSidebar from '../pages/Dashboard/Agent/AgentSidebar/AgentSidebar';
import AdminSidebar from '../pages/Dashboard/Admin/AdminSidebar/AdminSidebar';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Footer from '../pages/Shared/Footer/Footer';
import { FaBars } from 'react-icons/fa';

const DashboardLayout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setRole(res.data?.role || '');
        setLoading(false);
      }
    };
    fetchRole();
  }, [user?.email, axiosSecure]);

  if (loading) return <div>Loading...</div>;
  if (!role) return <div>Unauthorized access</div>;

  if (window.location.pathname === "/dashboard") {
    if (role === 'user') return <Navigate to="/dashboard/user" replace />;
    if (role === 'agent') return <Navigate to="/dashboard/agent" replace />;
    if (role === 'admin') return <Navigate to="/dashboard/admin" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Drawer */}
      <div className="drawer lg:drawer-open flex-1">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

        {/* Content */}
        <div className="drawer-content flex flex-col p-4">
          {/* Mobile drawer toggle button */}
          <div className="lg:hidden mb-4">
            <label htmlFor="dashboard-drawer" className="btn btn-outline btn-sm flex items-center gap-2 border-gray-400">
              <FaBars /> Menu
            </label>
          </div>
          <Outlet />
        </div>

        {/* Sidebar */}
        <div className="drawer-side ">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="lg:ml-50 menu bg-base-200 text-black min-h-full w-64 p-4 ">
            {role === 'user' && <UserSidebar />}
            {role === 'agent' && <AgentSidebar />}
            {role === 'admin' && <AdminSidebar />}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;


// Agent email : tahiya@gmail.com
// agent Pass : 123456A@

// admin email : nahiyarahman@gmail.com
// agent Pass : 123456A@
