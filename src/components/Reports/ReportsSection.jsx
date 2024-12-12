import React, { useState } from "react";
import { ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
import OverdueByDept from "../Charts/OverdueByDept";
import TasksByStatus from "../Charts/TasksByStatus";
import TasksByInterval from "../Charts/TasksByInterval";
import TasksByDepartment from "../Charts/TasksByDepartment";
// import TopOverdueComponens
import OverdueByCompetency from "../Charts/OverdueByCompetency";
import TaskStatusTimeline from "../Charts/TaskStatusTimeline";
import AvgOverdueByDepartment from "../Charts/AvgOverdueByDepartment";
import TasksByVessel from "../Charts/TasksByVessel";
import { triggerHapticFeedback } from "../../utils/haptics";

const ReportsSection = ({ data }) => {
  const [currentReportIndex, setCurrentReportIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const reports = [
    {
      title: "Component Task Status",
      description: "See which parts need immediate attention",
      // component: <TopOverdueComponents data={data} />,
    },
    {
      title: "Overdue Tasks by Department",
      description: "See which departments have tasks that need attention",
      component: <OverdueByDept data={data} />,
    },
    {
      title: "Tasks by Status",
      description: "View all tasks and their current status",
      component: <TasksByStatus data={data} />,
    },
    {
      title: "Tasks by Department",
      description: "See how work is distributed across departments",
      component: <TasksByDepartment data={data} />,
    },
    {
      title: "Tasks by Interval",
      description: "View tasks based on their schedule",
      component: <TasksByInterval data={data} />,
    },
    {
      title: "Overdue Tasks by Minimum Competency",
      description: "View tasks based on required skill levels",
      component: <OverdueByCompetency data={data} />,
    },
    {
      title: "Task Status Timeline",
      description: "See how tasks progress over time",
      component: <TaskStatusTimeline data={data} />,
    },
    {
      title: "Average Overdue Days by Department",
      description: "Check how long tasks are overdue in each department",
      component: <AvgOverdueByDepartment data={data} />,
    },
    {
      title: "Task Counts by Vessel",
      description: "View tasks for each vessel",
      component: <TasksByVessel data={data} />,
    },
  ];

  const handleReportChange = (index) => {
    triggerHapticFeedback();
    setCurrentReportIndex(index);
    setIsDropdownOpen(false);
  };

  const navigateReport = (direction) => {
    triggerHapticFeedback();
    if (direction === "next") {
      setCurrentReportIndex((prev) =>
        prev === reports.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentReportIndex((prev) =>
        prev === 0 ? reports.length - 1 : prev - 1
      );
    }
  };

  const toggleDropdown = () => {
    triggerHapticFeedback();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="mt-8 px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Reports Dashboard
        </h2>

        {/* Dropdown Menu */}
        <div className="relative mb-4">
          <button
            onClick={toggleDropdown}
            className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-blue-300 flex justify-between items-center bg-white"
          >
            <div>
              <div className="font-semibold text-lg">
                {reports[currentReportIndex].title}
              </div>
              <div className="text-gray-600">
                {reports[currentReportIndex].description}
              </div>
            </div>
            <ChevronDown
              className={`w-6 h-6 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg max-h-[60vh] overflow-y-auto">
              {reports.map((report, index) => (
                <button
                  key={index}
                  onClick={() => handleReportChange(index)}
                  className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                    currentReportIndex === index ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="font-semibold text-lg">{report.title}</div>
                  <div className="text-gray-600">{report.description}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="flex justify-between mb-4">
          <button
            onClick={() => navigateReport("prev")}
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous Report
          </button>
          <button
            onClick={() => navigateReport("next")}
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Next Report
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div>{reports[currentReportIndex].component}</div>
      </div>
      <div className="text-center text-gray-600 mb-4">
        {/* <p className="text-lg">
          Select a report from the menu above or use navigation buttons to move
          between reports
        </p> */}
      </div>
    </div>
  );
};

export default ReportsSection;
