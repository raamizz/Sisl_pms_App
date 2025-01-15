// src/providers/AppProvider.jsx
import React from 'react';
import { VesselProvider } from '../context/vesselContext';
import { TaskProvider } from '../context/taskContext';

export const AppProvider = ({ children }) => {
  return (
    <VesselProvider>
      <TaskProvider>
        {children}
      </TaskProvider>
    </VesselProvider>
  );
};