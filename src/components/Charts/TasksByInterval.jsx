import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import { ChevronDown } from 'lucide-react';
import { triggerHapticFeedback } from '../../utils/haptics';

// Helper function for interval mapping
const getIntervalOrder = (interval) => {
  const orderMap = {
    '1 Week': 1,
    '1 Month': 2,
    '3 Months': 3,
    '60 Months': 4
  };
  return orderMap[interval] || 0;
};

// Custom Select Component
const Select = ({ label, value, onChange, options }) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => {
            triggerHapticFeedback(50);
            onChange(e.target.value);
          }}
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

function TasksByInterval({ data }) {
  const [intervalFilter, setIntervalFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Process and group tasks
  const processedTasks = data.vessels[0].tasks.reduce((acc, task) => {
    if (!acc[task.interval]) {
      acc[task.interval] = {
        overdue: 0,
        planned: 0,
        total: 0,
        tasks: []
      };
    }

    acc[task.interval].total += 1;
    if (task.actualStatus === 'Overdue') {
      acc[task.interval].overdue += 1;
    } else {
      acc[task.interval].planned += 1;
    }
    acc[task.interval].tasks.push(task);

    return acc;
  }, {});

  // Prepare scatter plot data
  const scatterData = Object.entries(processedTasks)
    .filter(([interval]) => intervalFilter === 'all' || interval === intervalFilter)
    .map(([interval, stats]) => {
      const intervalOrder = getIntervalOrder(interval);
      return {
        x: intervalOrder,
        y: statusFilter === 'all' ? stats.total : 
           statusFilter === 'Overdue' ? stats.overdue : stats.planned,
        z: stats.total, // Used for point size
        interval,
        stats
      };
    });

  const intervalOptions = [
    { value: 'all', label: 'All Intervals' },
    { value: '1 Week', label: '1 Week' },
    { value: '1 Month', label: '1 Month' },
    { value: '3 Months', label: '3 Months' },
    { value: '60 Months', label: '60 Months' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Overdue', label: 'Overdue' },
    { value: 'Planned', label: 'Planned' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow border border-gray-200">
          <p className="font-medium text-sm">{data.interval}</p>
          <div className="text-sm text-gray-600 mt-1">
            <p>Total Tasks: {data.stats.total}</p>
            <p>Overdue: {data.stats.overdue}</p>
            <p>Planned: {data.stats.planned}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomXAxisTick = ({ x, y, payload }) => {
    const intervals = ['', '1 Week', '1 Month', '3 Months', '60 Months'];
    return (
      <g transform={`translate(${x},${y})`}>
        <text 
          x={0} 
          y={0} 
          dy={16} 
          textAnchor="middle" 
          fill="#666" 
          fontSize={12}
        >
          {intervals[payload.value]}
        </text>
      </g>
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Interval"
            value={intervalFilter}
            onChange={setIntervalFilter}
            options={intervalOptions}
          />
          <Select
            label="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={statusOptions}
          />
        </div>
      </div>

      {/* Scatter Plot */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-medium mb-4">Task Distribution by Interval</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="interval" 
                tick={<CustomXAxisTick />}
                domain={[0, 5]}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="tasks"
                label={{ 
                  value: 'Number of Tasks', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
              />
              <ZAxis type="number" dataKey="z" range={[50, 400]} />
              <Tooltip content={<CustomTooltip />} />
              <Scatter 
                data={scatterData} 
                fill="#3b82f6"
                fillOpacity={0.6}
                onClick={(data) => {
                  triggerHapticFeedback(30);
                  // Add any click handling here
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {Object.entries(processedTasks)
          .filter(([interval]) => intervalFilter === 'all' || interval === intervalFilter)
          .map(([interval, { tasks }]) => (
            <div key={interval} className="bg-white rounded-lg shadow p-4">
              <h4 className="font-medium text-gray-900 mb-2">{interval}</h4>
              <div className="space-y-2">
                {tasks
                  .filter(task => statusFilter === 'all' || task.actualStatus === statusFilter)
                  .map((task, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg"
                      onClick={() => triggerHapticFeedback(30)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{task.title}</p>
                          <p className="text-sm text-gray-500 mt-1">{task.component}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          task.actualStatus === 'Overdue' 
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {task.actualStatus}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Job Date: {new Date(task.jobDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>

      {scatterData.length === 0 && (
        <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
          No tasks match the selected filters
        </div>
      )}
    </div>
  );
}

export default TasksByInterval;