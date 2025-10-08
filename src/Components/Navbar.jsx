// components/Navbar.js
import React from 'react';
import { Settings,Bell,Search , CircleQuestionMark , ArrowLeft} from 'lucide-react';
const Navbar = () => {
  return (

    <>
    <nav className="navbar">
      <div className="navbar-content">
        <h1>Company Name</h1>
        <div className='BackIcon' onClick={() => window.history.back()}>
          <ArrowLeft strokeWidth={1} />
        </div>
        <div className="navbar-user flex items-center gap-4">
            <div>
                <CircleQuestionMark strokeWidth={1} />
            </div>
            <div>
                <Search strokeWidth={1} />
            </div>
            <div>
                <Bell strokeWidth={1} />
            </div>
            <div>
                <Settings strokeWidth={1} />
            </div>
            <img src="#" className='w-10 h-10 rounded-full border-1 border-black' />
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;

