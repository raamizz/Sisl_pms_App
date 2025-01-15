import React, { createContext, useContext,useState } from 'react';
import { calculateStats } from '../utils/helpers';
import { useVessel } from './vesselContext';


const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { selectedVessel } = useVessel();
  const [activeTab, setActiveTab] = useState("overdue");

  const stats = calculateStats(selectedVessel.tasks);
  const filteredTasks = selectedVessel.tasks.filter((task) =>
    activeTab === "overdue"
      ? task.status === "Overdue"
      : task.status === "Planned"
  );

  return (
    <TaskContext.Provider value={{ 
      activeTab, 
      setActiveTab, 
      stats, 
      filteredTasks 
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

