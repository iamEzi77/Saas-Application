import React from 'react';
import { Settings, Bell, Search, CircleQuestionMark, ArrowLeft } from 'lucide-react';

const Navbar = ({ sidebarContent, setSidebarContent }) => {
  const handleSettingsClick = () => {
    
    setSidebarContent(sidebarContent === 'settings' ? 'menu' : 'settings');
  };

  return (
    <nav className="navbar bg-gray-100 p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h1>Company Name</h1>
        <div className='BackIcon cursor-pointer' onClick={() => window.history.back()}>
          <ArrowLeft strokeWidth={1} />
        </div>
      </div>

      <div className="navbar-user flex items-center gap-4">
        <CircleQuestionMark strokeWidth={1} />
        <Search strokeWidth={1} />
        <Bell strokeWidth={1} />
        <Settings strokeWidth={1} onClick={handleSettingsClick} />
        <img src="#" alt="user" className='w-10 h-10 rounded-full border border-black' />
      </div>
    </nav>
  );
};

export default Navbar;
