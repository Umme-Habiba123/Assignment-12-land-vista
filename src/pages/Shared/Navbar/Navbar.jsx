import { NavLink } from 'react-router';
import userPhoto from '../../../assets/user.png';
import { AiFillHome } from "react-icons/ai";
import useAuth from '../../../hooks/useAuth';
import { FaBuilding } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import VistaLand from '../ProjectLogo/VistaLand';
// import { MdDashboard } from "react-icons/md";
import { FaUserTie, FaUserShield, FaUser, } from "react-icons/fa";
import { IoIosArrowDown } from 'react-icons/io';
import DashboardLayout from '../../../Layouts/DashboardLayout';
import DashboardDropdown from '../../../Components/DashboardDropdown/DashboardDropdown';


const Navbar = () => {
  const { logOutUser, user } = useAuth();

  const handleSignOut = () => {
    logOutUser()
      .then(() => {
        console.log('sign out');
      }).catch(error => {
        console.log(error);
      });
  };

  const links = <>
    <li>
      <NavLink to="/" className="flex items-center gap-1">
        <AiFillHome /> Home
      </NavLink>
    </li>


    <li>
      <NavLink to="/all-properties" className="flex items-center gap-1">
        <FaBuilding /> All Properties
      </NavLink>
    </li>


    {
      user && <>
      <DashboardDropdown></DashboardDropdown>
       
      </>
    }


  </>

  return (
    <div className='bg-[#D1D7E0] w-full shadow-md'>
      <Navbar></Navbar>
      <div className="navbar w-10/12 mx-auto px-2 py-8 flex justify-between items-center">

        <div className="flex items-center gap-2">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="sansita-font dropdown-content menu menu-sm mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-sm text-gray-600">
              {links}
            </ul>
          </div>
          <VistaLand></VistaLand>
        </div>
        <div className="navbar-center hidden lg:flex dancing-script-font">
          <ul className="menu sansita-font menu-horizontal gap-4 px-1 text-lg">

            {links}

          </ul>
        </div>
        {/* User -------*/}
        <div className="flex items-center gap-4 ">

          <div className='relative group w-10 h-10'>
            <img
              className='w-10 h-10 rounded-full object-cover border border-purple-300'
              src={user?.photoURL || userPhoto}
              alt="User"
            />
            {
              user?.displayName &&
              <div>
                <p className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-gray-200 text-gra  text-xs font-semibold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">{user.displayName}</p>
              </div>
            }


          </div>

          <>
            <p className="hidden sm:block text-xs text-gray-500">{user?.email}</p>

          </>

          <div className="flex items-center gap-4">
            {
              user ? (

                <>
                  <button
                    onClick={handleSignOut}
                    className="btn btn-outline btn-sm border-2 border-white bg-[#564F6F] text-white hover:bg-[#D1D7E0] font-bold
               hover:text-[#802BB1] p-4 "
                  >
                    LOG OUT
                  </button>

                </>
              ) : (
                <>
                  <NavLink to="/login">
                    <button className="btn btn-outline border-2 border-white btn-sm bg-[#564F6F] font-bold text-white hover:bg-[#D1D7E0] hover:text-[#802BB1] p-4">
                      LOG IN
                    </button>
                  </NavLink>
                  <NavLink to="/registration">
                    <button className="btn btn-outline border-2 btn-sm bg-[#564F6F] text-white border-white hover:bg-[#D1D7E0] hover:text-[#802BB1] font-bold p-4">
                      REGISTRATION
                    </button>
                  </NavLink>
                </>
              )
            }
          </div>


        </div>
      </div>
    </div>
  );
};

export default Navbar;
