import { NavLink } from 'react-router';
import { FaUser, FaPlus, FaClipboardList, FaCheckCircle, FaEnvelope } from 'react-icons/fa';

const AgentSidebar = () => {
  return (
    <>
      <h2 className="text-xl font-bold text-purple-700 mb-4">Agent Dashboard</h2>
      <li><NavLink to="my-profile"><FaUser /> My Profile</NavLink></li>
      <li><NavLink to="add-property"><FaPlus /> Add Property</NavLink></li>
      <li><NavLink to="my-properties"><FaClipboardList /> My Properties</NavLink></li>
      <li><NavLink to="requested-properties"><FaEnvelope /> Requested/Offered</NavLink></li>
      <li><NavLink to="sold-properties"><FaCheckCircle /> Sold Properties</NavLink></li>
    </>
  );
};

export default AgentSidebar;
