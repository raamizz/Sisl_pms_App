export const calculateStats = (tasks) => {
    const stats = {
      critical: { overdue: 0, due: 0 },
      nonCritical: { overdue: 0, due: 0 },
      postponed: { regular: 0, drydock: 0 }
    };
  
    tasks.forEach(task => {
      const isCritical = task.cc === 1;
      
      if (task.status === "Overdue") {
        if (isCritical) {
          stats.critical.overdue++;
        } else {
          stats.nonCritical.overdue++;
        }
      } else if (task.jobDate && new Date(task.jobDate) > new Date()) {
        if (isCritical) {
          stats.critical.due++;
        } else {
          stats.nonCritical.due++;
        }
      }
  
      if (task.actualStatus === "Postponed") {
        if (task.type === "drydock") {
          stats.postponed.drydock++;
        } else {
          stats.postponed.regular++;
        }
      }
    });
  
    return stats;
  };
  
  export const formatDate = (dateString) => {
    if (!dateString || dateString === "NULL") return "Not set";
    return new Date(dateString).toLocaleDateString();
  };