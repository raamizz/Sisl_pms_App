import React from 'react';
import TaskCard from './TaskCard'; 
const RecentTask = ({ activeTab, setActiveTab, filteredTasks }) => {
  return (
    <>
      <div className="mt-6 px-3">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-semibold text-gray-800">Recent Tasks</h2>
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            {['overdue', 'due'].map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1 text-xs capitalize rounded-md ${
                  activeTab === tab
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 pb-20">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecentTask;
