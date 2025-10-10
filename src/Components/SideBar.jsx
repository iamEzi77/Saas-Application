import { Link, useLocation } from 'react-router-dom';
import { menuItems } from './menuItems';
import { ChevronDown } from 'lucide-react';
import './SideBar.css';
import { useState } from 'react';
import AccountSettings from "../page/Account Settings/AccountSetting"

function Sidebar({ sidebarContent, setSidebarContent }) {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();
  
 if (!sidebarContent) return null;

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };
  return (
    <nav className="sidebar w-64 bg-white shadow-lg p-4">
      {sidebarContent === 'menu' && (
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.children ? (
                <>
                  <div
                    onClick={() => toggleMenu(index)}
                    className="flex items-center cursor-pointer"
                  >
                    <Link to={item.path}>
                      <item.icon className="icon" />
                      <span>{item.name}</span>
                    </Link>
                    <ChevronDown
                      className={`w-4 h-4 ml-2 transition-transform ${
                        openMenu === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {openMenu === index && (
                    <ul className="submenu">
                      {item.children.map((child, i) => (
                        <li key={i}>
                          <Link
                            to={child.path}
                            className={location.pathname === child.path ? "active" : ""}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link to={item.path} className="menu-btn">
                  <item.icon className="icon" />
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}

      {sidebarContent === 'settings' && (
        <div>
          <AccountSettings/>
          <button
            className="mt-4 text-blue-500 underline"
            onClick={() => setSidebarContent('menu')}
          >
            Back to Menu
          </button>
        </div>
      )}
    </nav>
  );
}

export default Sidebar;
