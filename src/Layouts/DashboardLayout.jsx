import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router';
import UserSidebar from '../pages/Dashboard/UserDashboard/UserSidebar/UserSidebar';
import AgentSidebar from '../pages/Dashboard/Agent/AgentSidebar/AgentSidebar';
import AdminSidebar from '../pages/Dashboard/Admin/AdminSidebar/AdminSidebar';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Footer from '../pages/Shared/Footer/Footer';

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

  if (loading) {
    return <div>Loading...</div>;
  }

  // যদি রোল পাওয়া না যায়, লগইন ইউজারকে Unauthorized দেখানো যেতে পারে বা অন্যথায় হ্যান্ডেল
  if (!role) {
    return <div>Unauthorized access</div>;
  }

  // এখানে রোল অনুযায়ী Redirect করুন
  if (window.location.pathname === "/dashboard") {
    if (role === 'user') {
      return <Navigate to="/dashboard/user" replace />;
    } else if (role === 'agent') {
      return <Navigate to="/dashboard/agent" replace />;
    } else if (role === 'admin') {
      return <Navigate to="/dashboard/admin" replace />;
    }
  }

  return (
   <div>

     <Navbar></Navbar>
    <div>

       <div className="w-10/12 mx-auto">
     
      {/* লোগো ও সাইডবার একই রকম */}
      {/* Drawer ... */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Small screen navbar */}
          {/* Navbar code here */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {role === 'user' && <UserSidebar />}
            {role === 'agent' && <AgentSidebar />}
            {role === 'admin' && <AdminSidebar />}
          </ul>
        </div>
      </div>
    </div>
    </div>


    <Footer></Footer>
   </div>
  );
};


export default DashboardLayout;
