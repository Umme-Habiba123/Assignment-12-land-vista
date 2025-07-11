import { NavLink } from "react-router";
import {
  FaUserCircle, FaPlusCircle, FaClipboardList,
  FaCheckCircle, FaEnvelopeOpenText
} from "react-icons/fa";

const AgentDashboardLinks = () => {
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-2 p-2 rounded hover:bg-gray-300 font-medium ${isActive ? 'bg-gray-300' : ''}`;

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Agent Dashboard</h2>
      <ul className="space-y-2">
        <li><NavLink to="/dashboard/agent" className={linkStyle} end><FaUserCircle /> Profile</NavLink></li>
        <li><NavLink to="/dashboard/agent/addProperty" className={linkStyle}><FaPlusCircle /> Add Property</NavLink></li>
        <li><NavLink to="/dashboard/agent/my-properties" className={linkStyle}><FaClipboardList /> My Properties</NavLink></li>
        <li><NavLink to="/dashboard/agent/sold-properties" className={linkStyle}><FaCheckCircle /> Sold Properties</NavLink></li>
        <li><NavLink to="/dashboard/agent/offered-properties" className={linkStyle}><FaEnvelopeOpenText /> Offered Properties</NavLink></li>
      </ul>
    </div>
  );
};

export default AgentDashboardLinks;
