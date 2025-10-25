import { NavLink } from "react-router";
import userPhoto from "../../../assets/user.png";
import { AiFillHome } from "react-icons/ai";
import { FaBuilding, FaPhone } from "react-icons/fa";
import { GiEgyptianProfile } from "react-icons/gi";
import { CiLollipop } from "react-icons/ci";
import VistaLand from "../ProjectLogo/VistaLand";
import DashboardDropdown from "../../../Components/DashboardDropdown/DashboardDropdown";
import ThemeToggle from "../../../Components/ThemeToggle/ThemeToggle";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { logOutUser, user } = useAuth();

  const handleSignOut = () => {
    logOutUser()
      .then(() => console.log("sign out"))
      .catch((error) => console.log(error));
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className="flex items-center gap-1">
          <AiFillHome /> Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/profile" className="flex items-center gap-1">
          <GiEgyptianProfile size={22} /> Profile
        </NavLink>
      </li>

      <li>
        <NavLink to="/all-properties" className="flex items-center gap-1">
          <FaBuilding /> All Properties
        </NavLink>
      </li>

      <li>
        <NavLink to="/propertyListings" className="flex items-center gap-1">
          <CiLollipop size={22} /> Property Listings
        </NavLink>
      </li>

      {user && (
        <>
          <DashboardDropdown />
          <li>
            <NavLink to="/contact" className="flex items-center gap-1">
              <FaPhone /> Contact
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-gray-300 w-full shadow-md sticky top-0 z-50">
      <div className="navbar w-[95%] md:w-10/12 mx-auto px-3 md:px-2 py-4 md:py-6 flex justify-between items-center">
        {/* Left: Logo & Dropdown */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="sansita-font dropdown-content menu menu-sm mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-sm text-gray-600 z-[100]"
            >
              {links}
            </ul>
          </div>
          <VistaLand />
        </div>

        {/* Center: Nav Links (hidden on mobile) */}
        <div className="navbar-center hidden lg:flex dancing-script-font">
          <ul className="menu sansita-font menu-horizontal gap-5 px-1 text-lg">
            {links}
          </ul>
        </div>

        {/* Right: User Info + Buttons */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-end">
          {/* User avatar */}
          <div className="relative group w-9 h-9 sm:w-10 sm:h-10">
            <img
              className="w-full h-full rounded-full object-cover border border-purple-300"
              src={user?.photoURL || userPhoto}
              alt="User"
            />
            {user?.displayName && (
              <p className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                {user.displayName}
              </p>
            )}
          </div>

          {/* User email (hidden on very small screens) */}
          {user && (
            <p className="hidden md:block text-xs text-gray-600 truncate max-w-[140px]">
              {user.email}
            </p>
          )}

          {/* Auth Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <button
                onClick={handleSignOut}
                className="btn btn-outline btn-sm border-2 border-white bg-[#564F6F] text-white hover:bg-[#D1D7E0] font-bold hover:text-[#802BB1] px-3 sm:px-4"
              >
                LOG OUT
              </button>
            ) : (
              <>
                <NavLink to="/login">
                  <button className="btn btn-outline border-2 border-white btn-sm bg-[#564F6F] font-bold text-white hover:bg-[#D1D7E0] hover:text-[#802BB1] px-3 sm:px-4">
                    LOG IN
                  </button>
                </NavLink>
                <NavLink to="/registration">
                  <button className="btn btn-outline border-2 border-white btn-sm bg-[#564F6F] text-white hover:bg-[#D1D7E0] hover:text-[#802BB1] font-bold px-3 sm:px-4">
                    REGISTRATION
                  </button>
                </NavLink>
              </>
            )}
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
