// DashboardLayout.jsx
import { Link, Outlet } from 'react-router';
import { RiHomeOfficeLine } from 'react-icons/ri';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import UserSidebar from '../pages/Dashboard/UserDashboard/UserSidebar/UserSidebar';
import AgentSidebar from '../pages/Dashboard/Agent/AgentSidebar/AgentSidebar';
import AdminSidebar from '../pages/Dashboard/Admin/AdminSidebar/AdminSidebar';

const DashboardLayout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState('');

  // ✅ Load user role
  useEffect(() => {
    const fetchRole = async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setRole(res.data?.role || '');
      }
    };
    fetchRole();
  }, [user?.email, axiosSecure]);

  return (
    <div className="w-10/12 mx-auto">
      {/* Logo */}
      <div className="py-4">
        <Link to="/" className="flex items-center gap-1 text-xl lg:text-4xl font-bold">
          <RiHomeOfficeLine size={50} />
          <span className='text-[#504b60] mt-3'>
            Land<span className='text-[#802BB1]'>Vista</span>
          </span>
        </Link>
      </div>

      {/* Drawer */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Small screen navbar */}
          <div className="navbar bg-base-300 w-full lg:hidden">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <div className="mx-2 flex-1 px-2">Dashboard</div>
          </div>

          {/* Page Content */}
          <Outlet />
        </div>

        {/* Sidebar */}
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
  );
};

export default DashboardLayout;
