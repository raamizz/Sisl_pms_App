import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Navigation from "./components/Header/Navigation";
import StatusCard from "./components/Header/StatusCard";
import RecentTask from "./components/RecentTasks/RecentTask";
// import ReportsSection from './components/ReportsSection';
import { calculateStats } from "./utils/helpers";
import { maintenanceData } from "./data/maintenanceData";
import "./index.css";
import "./App.css";

const App = () => {
  const [selectedVessel, setSelectedVessel] = useState(
    maintenanceData.vessels[0]
  );
  const [activeTab, setActiveTab] = useState("overdue");
  const stats = calculateStats(selectedVessel.tasks);
  const filteredTasks = selectedVessel.tasks.filter((task) =>
    activeTab === "overdue"
      ? task.status === "Overdue"
      : task.status === "Planned"
  );

  return (
    <Router>
      <Header
        selectedVessel={selectedVessel}
        vessels={maintenanceData.vessels}
        onVesselChange={setSelectedVessel}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <StatusCard stats={stats} />
              <RecentTask
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                filteredTasks={filteredTasks}
              />
            </>
          }
        />
        {/* <Route path="/reports" element={<ReportsSection data={maintenanceData} />} /> */}
      </Routes>
      <Navigation />
    </Router>
  );
};

export default App;
