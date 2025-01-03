import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#ff4d4f', '#1890ff', '#ffc107'];

function TasksDashboard({ data }) {
  console.log(data, "DATATATATATAT");

  const processChartData = (tasks) => {
    if (!tasks || tasks.length === 0) return []; 
    const statusCounts = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };
  const criticalTasks = data.vessels[0]?.tasks.filter(task => task.type === 'critical');
  const nonCriticalTasks = data.vessels[0]?.tasks.filter(task => task.type === 'noncritical' );
  const postponedTasks = data.vessels[0]?.tasks.filter(task => task.type === 'postponed');

  const charts = [
    { title: 'Critical Tasks', data: processChartData(criticalTasks) },
    { title: 'Non-Critical Tasks', data: processChartData(nonCriticalTasks) },
    { title: 'Postponed Tasks', data: processChartData(postponedTasks) },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50">
      {charts.map((chart, index) => (
        <div
          key={index}
          className="bg-white shadow rounded-lg p-4 flex flex-col items-center"
        >
          <h3 className="text-base font-semibold text-gray-800 mb-3">
            {chart.title}
          </h3>
          <div className="w-full h-40 md:h-60">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chart.data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  innerRadius={30}
                  label
                >
                  {chart.data.map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={COLORS[idx % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TasksDashboard;
