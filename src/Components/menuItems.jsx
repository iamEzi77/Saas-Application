import { Package, Wrench, ShieldCheck, Users, Factory, Cog, Truck, FileText } from 'lucide-react';

export const menuItems = [
  { 
    name: "Equipment", 
    icon: Package,
    children: [
      { name: "View", path: "/equipment/view" },
      { name: "Categories", path: "/equipment/categories" },
    ]
  },
  { 
    name: "Preventive Maintenance", 
    icon: Wrench,
    children: [
      {name : "Maintenance Requests", path: "/Maintenance-Requests"},
      { name: "Preventive Maintenance", path: "/Preventive-Maintenace" },
    ]
  },
  { name: "Safety", path: "/safety", icon: ShieldCheck },
  { name: "Team Members", icon: Users,
    children: [
      { name: "User Management", path: "/team/user-management" },
      { name: "Team Management", path: "/team/team-management" },
      { name: "Training", path: "/team/training" },
    ]
  },
  { name: "Production", icon: Factory,
    children: [
      {name : "Area management", path : "/production/area-management"},
      {name : "Operation Setup", path : "/production/operation-setup"},
    ]
  },
  { name: "Parts",  icon: Cog,
    children:[
      {name: "View All", path : "/parts/view-all"},
      {name : "Configurations", path : "/parts/configurations"},
    ]
  },
  { name: "Suppliers", icon: Truck,
    children:[
      {name : "View All", path : "/suppliers/view-all"},
    ]
  },
  { name: "Document Management", icon: FileText,
    children:[
      {name: "View All Documentation", path : "/documents/view-all"},
      {name: "Configurations", path : "/documents/configurations"},
    ]
  },
];
