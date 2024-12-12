import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ClipboardList, Calendar, BarChart3 } from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
  
  const navItems = [
    { icon: ClipboardList, label: "Tasks", path: '/' },
    { icon: Calendar, label: "Schedule", path: '/schedule' },
    { icon: BarChart3, label: "Reports", path: '/reports' }
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 flex justify-around p-1">
      {navItems.map(({ icon: Icon, label, path }) => (
        <button
          key={label}
          onClick={() => navigate(path)} 
          className={`flex flex-col items-center py-1.5 flex-1 text-gray-400 hover:text-blue-600`}
        >
          <Icon className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default Navigation;
