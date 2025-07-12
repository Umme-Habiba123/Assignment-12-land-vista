// components/DashboardDropdown.jsx

import React from 'react';
import { MdDashboard } from "react-icons/md";
import { FaUserTie, FaUserShield, FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router"; // ✅ correct import

const DashboardDropdown = () => {
    return (
        <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="m-1 flex items-center gap-1 cursor-pointer">
                <MdDashboard />
                Dashboard <IoIosArrowDown size={20}/>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-[#868589] font-bold text-white rounded-box z-10 w-52 p-2 shadow">
                <li>
                    <NavLink to="/dashboard/agent" className="flex items-center gap-2">
                        <FaUserTie /> Agent
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/admin" className="flex items-center gap-2">
                        <FaUserShield /> Admin
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/user" className="flex items-center gap-2">
                        <FaUser /> User
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default DashboardDropdown;
