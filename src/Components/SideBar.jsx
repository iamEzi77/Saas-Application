import { Children, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, Wrench, ShieldCheck, Users, Factory, Cog, Truck, FileText, ChevronDown } from 'lucide-react';
import './SideBar.css';

const menuItems = [
  { 
    name: "Equipment", 
    path: "/equipment", 
    icon: Package,
    children: [
      { name: "View", path: "/equipment/view" },
      { name: "Categories", path: "/equipment/categories" },
    ]
  },
  { name: "Preventive Maintenance", path: "/maintenance", icon: Wrench 
    // ,Children[

    // ]
  },
  { name: "Safety", path: "/safety", icon: ShieldCheck },
  { name: "Team Members", path: "/team", icon: Users },
  { name: "Production", path: "/production", icon: Factory },
  { name: "Parts", path: "/parts", icon: Cog },
  { name: "Suppliers", path: "/suppliers", icon: Truck },
  { name: "Document Management", path: "/documents", icon: FileText },
];

function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <nav className="sidebar">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.children ? (
              <>
                <div className="flex items-center justify-between menu-btn">
                  <Link to={item.path} className="flex items-center">
                    <item.icon className="icon" />
                    <span>{item.name}</span>
                  </Link>
                  <button onClick={() => toggleMenu(index)}>
                    <ChevronDown
                      className={`w-4 h-4 ml-2 transition-transform ${openMenu === index ? "rotate-180" : ""}`}
                    />
                  </button>
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
    </nav>
  );
}

export default Sidebar;
