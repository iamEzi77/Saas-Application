import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Sidebar from "./Components/SideBar";
import Equipment from "./page/Equipment/Equipment";
import EquipmentView from './page/Equipment/EquipmentView';
import EquipmentCategories from './page/Equipment/EquipmentCategories';
import PreventiveMaintenance from './page/PreventiveMaintenance';
import DashBoard from './page/Dashboard';


export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex ">
        <Sidebar className="ml-10" />  
        <div className="flex-1 p-4">
          <Routes>
            <Route index element={<DashBoard />} />
           <Route path="/equipment" element={<Equipment />} />
            <Route path="/equipment/view" element={<EquipmentView />} />
            <Route path="/equipment/categories" element={<EquipmentCategories />} />
            <Route path="/Maintenance" element={<PreventiveMaintenance />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
