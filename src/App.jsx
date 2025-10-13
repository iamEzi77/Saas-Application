import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import DashBoard from './page/Dashboard';
import Navbar from './Components/Navbar';
import Sidebar from "./Components/SideBar";
import EquipmentView from './page/Equipment/EquipmentView';
import EquipmentDetail from './page/Equipment/EquipmentDetails';
import EquipmentCategories from './page/Equipment/EquipmentCategories';
import Maintenace from "./page/PreventiveMaintenance/Maintenance-Requests";
import PreventiveMaintenance from "./page/PreventiveMaintenance/PreventiveMaintenance";
import Safety from './page/safety/Safety'; 
import UserManagement from "./page/Team Management/UserManagment/UserManagment"
import TeamManagement from "./page/Team Management/TeamManagment";
import Training from "./page/Team Management/Training";
import AreaOperation from "./page/Production/AreaOperation";
import OperationSetup from "./page/Production/OperationSetup";
import PartsViewAll from './page/Parts/ViewAll';
import PartConfiguration from "./page/Parts/Configuration";
import SuppliersViewAll from './page/suppliers/View';
import DocumentViewAll from "./page/Documentation/ViewDocumentation";
import DocumentConfiguration from "./page/Documentation/DocumentConfiguration";
import UserSetting from './page/Account Settings/UserSetting/UserSetting';
import PlansBilling from './page/Account Settings/PlanAndBilling/plansBilling';
import CompanySetting from './page/Account Settings/CompanySetting/CompanySetting';
import UserNotificationSettings from './page/Account Settings/UserNotificationSettings/UserNotificationSettings';
import UserDetail from './page/Team Management/UserManagment/UserDetails';

export default function App() {
  const [sidebarContent, setSidebarContent] = useState('menu'); 

  return (
    <Router>
      <Navbar setSidebarContent={setSidebarContent} sidebarContent={sidebarContent} />
      <div className="flex">
        <Sidebar sidebarContent={sidebarContent} setSidebarContent={setSidebarContent} className="ml-10" />  
        <div className="flex-1 p-4">
          <Routes>
            <Route path='/' element={<DashBoard />} />
            <Route path="/equipment/view" element={<EquipmentView />} />
            <Route path="/equipment/:id" element={<EquipmentDetail />} />
            <Route path="/equipment/categories" element={<EquipmentCategories />} />
            <Route path="/Maintenance-Requests" element={<Maintenace />} />
            <Route path="/Preventive-Maintenace" element={<PreventiveMaintenance />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/team/user-management" element={<UserManagement />} />
            <Route path="/team/user-management/:id" element={<UserDetail />} />
            <Route path="/team/team-management" element={<TeamManagement />} />
            <Route path="/team/training" element={<Training />} />
            <Route path="/production/area-management" element={<AreaOperation />} />
            <Route path="/production/operation-setup" element={<OperationSetup />} />
            <Route path="/parts/view-all" element={<PartsViewAll />} />
            <Route path="/parts/configurations" element={<PartConfiguration />} />
            <Route path="/suppliers/view-all" element={<SuppliersViewAll />} />
            <Route path="/documents/view-all" element={<DocumentViewAll />} />
            <Route path="/documents/configurations" element={<DocumentConfiguration />} />
            <Route path="/settings/user" element={<UserSetting />} />
            <Route path="/settings/billing" element={<PlansBilling />} />
            <Route path="/settings/company" element={<CompanySetting />} />
            <Route path="/settings/notifications" element={<UserNotificationSettings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
