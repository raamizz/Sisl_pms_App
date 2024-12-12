import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function OverdueByDept({ data }) {
  // Count overdue tasks by department and criticalitys
  const countByDept = data.vessels[0].tasks.reduce((acc, task) => {
    if (task.actualStatus === 'Overdue') {
      acc[task.department] = acc[task.department] || { critical: 0, nonCritical: 0 };
      if (task.type === 'critical') {
        acc[task.department].critical++;
      } else {
        acc[task.department].nonCritical++;
      }
    }
    return acc;
  }, {});

  const chartData = Object.entries(countByDept).map(([name, value]) => ({
    name,
    critical: value.critical,
    nonCritical: value.nonCritical,
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="critical" fill="#ff4d4f" name="Critical" stackId="a" />
          <Bar dataKey="nonCritical" fill="#1890ff" name="Non-Critical" stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OverdueByDept;