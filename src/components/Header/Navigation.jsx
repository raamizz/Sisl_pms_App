import React from 'react';
import { ClipboardList, Calendar, BarChart3 } from "lucide-react";

const Navigation = () => {
  const navItems = [
    { icon: ClipboardList, label: "Tasks", active: true },
    { icon: Calendar, label: "Schedule" },
    { icon: BarChart3, label: "Reports" }
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 flex justify-around p-1">
      {navItems.map(({ icon: Icon, label, active }) => (
        <button
          key={label}
          className={`flex flex-col items-center py-1.5 flex-1 ${
            active ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default Navigation;