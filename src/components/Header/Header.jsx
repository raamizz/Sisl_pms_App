import React from 'react';
import { Bell, Search, User } from "lucide-react";

const Header = ({ selectedVessel, vessels, onVesselChange }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 pt-safe-top pb-16 px-3">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-white/60 text-[10px]">Welcome back</div>
            <div className="text-white text-sm font-medium">John Carter</div>
          </div>
        </div>
        <div className="flex gap-2">
          {[Search, Bell].map((Icon, index) => (
            <button
              key={index}
              className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      <select 
        className="w-full bg-white/10 text-white border border-white/20 rounded-lg py-1.5 px-2 text-sm focus:outline-none appearance-none"
        style={{ 
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 8px center',
          backgroundSize: '16px'
        }}
        value={selectedVessel.id}
        onChange={(e) => onVesselChange(vessels.find(v => v.id === parseInt(e.target.value)))}
      >
        {vessels.map(vessel => (
          <option key={vessel.id} value={vessel.id}>
            {vessel.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Header;