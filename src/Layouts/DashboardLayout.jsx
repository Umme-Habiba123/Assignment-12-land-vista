import { Link, Outlet } from 'react-router';
import AgentDashboard from '../pages/Dashboard/Agent/AgentDashboard';
import DashboardDropdown from '../Components/DashboardDropdown/DashboardDropdown';
import VistaLand from '../pages/Shared/ProjectLogo/VistaLand';
import { RiHomeOfficeLine } from 'react-icons/ri';
// import Sidebar from '../components/Sidebar'; // optional if you have sidebar

const DashboardLayout = () => {
  return (
    <div className=" w-10/12 mx-auto">

      <div className=''>
        <Link to="/" className="flex items-center gap-1 text-xl lg:text-4xl font-bold">
          <RiHomeOfficeLine size={50} />
          <span className='text-[#504b60] mt-3'>Land<span className='text-[#802BB1]'>Vista</span></span>
        </Link>
      </div>

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
          {/* Page content here */}

          {/* Navbar */}
          <div className="navbar bg-base-300 w-full lg:hidden ">
            <div className="flex-none ">
              <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
            <div className="hidden flex-none lg:hidden">

            </div>
          </div>
          {/* Page content here */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side ">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <AgentDashboard></AgentDashboard>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default DashboardLayout;
