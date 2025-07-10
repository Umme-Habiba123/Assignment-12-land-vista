// components/AgentDashboardLinks.jsx
import { NavLink } from "react-router";
import { FaUserCircle, FaPlusCircle, FaClipboardList, FaCheckCircle, FaEnvelopeOpenText } from "react-icons/fa";

const AgentDashboard = () => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Agent Dashboard</h2>
      
      <li>
        <NavLink to="/dashboard/agent/profile" className="flex items-center gap-2">
          <FaUserCircle /> Agent Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/agent/add-property" className="flex items-center gap-2">
          <FaPlusCircle /> Add Property
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/agent/my-properties" className="flex items-center gap-2">
          <FaClipboardList /> My Properties
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/agent/sold-properties" className="flex items-center gap-2">
          <FaCheckCircle /> Sold Properties
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/agent/offered-properties" className="flex items-center gap-2">
          <FaEnvelopeOpenText /> Offered Properties
        </NavLink>
      </li>
    </>
  );
};

export default AgentDashboard;
