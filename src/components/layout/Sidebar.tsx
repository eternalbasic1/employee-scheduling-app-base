import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const navItems = [
    { id: "dashboard", name: "Dashboard", path: "/dashboard" },
    { id: "scheduling", name: "Scheduling", path: "/scheduling" },
    { id: "forecasting", name: "Forecasting", path: "/forecasting" },
    { id: "manage-events", name: "Manage Events", path: "/manage-events" },
    { id: "employees", name: "Employees", path: "/employees" },
    { id: "attendance", name: "Attendance", path: "/attendance" },
    {
      id: "schedule-adherence",
      name: "Schedule Adherence",
      path: "/schedule-adherence",
    },
    { id: "reports", name: "Reports", path: "/reports" },
    { id: "admin-console", name: "Admin Console", path: "/admin-console" },
  ];

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    console.log("Logging out...");
  };

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <nav className="px-2 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white mr-3">
            A
          </div>
          <div>
            <div className="font-medium">Admin User</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-700 hover:text-gray-900"
        >
          <span className="mr-2">Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
