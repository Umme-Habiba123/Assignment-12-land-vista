import { Outlet } from "react-router";
import AgentSidebar from "./AgentSidebar/AgentSidebar";



const AgentDashboardLinks = () => {

  return (
    <div>
       
       <div className="lg:flex">
   
      <AgentSidebar></AgentSidebar>
      <div className="lg:w-3/4 p-4">
        <Outlet />
      </div>
    </div>
    </div>
  );
};

export default AgentDashboardLinks;
