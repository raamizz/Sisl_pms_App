
import React, { createContext, useContext, useState } from 'react';
import { maintenanceData } from '../data/maintenanceData';


const VesselContext = createContext();

export const VesselProvider = ({ children }) => {
  const [selectedVessel, setSelectedVessel] = useState(maintenanceData.vessels[0] || {});
  const vessels = maintenanceData.vessels || [];

  return (
    <VesselContext.Provider value={{ 
      selectedVessel, 
      setSelectedVessel,
      vessels,
      maintenanceData 
    }}>
      {children}
    </VesselContext.Provider>
  );
};

export const useVessel = () => {
  const context = useContext(VesselContext);
  if (!context) {
    throw new Error('useVessel must be used within a VesselProvider');
  }
  return context;
};


