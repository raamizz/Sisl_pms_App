import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function OverdueByCompetency({ data }) {
  const competencyCounts = data.vessels[0].tasks.reduce((acc, task) => {
    if (task.actualStatus === 'Overdue') {
      acc[task.minimumCompetency] = (acc[task.minimumCompetency] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = Object.entries(competencyCounts).map(([name, value]) => ({
    name,
    value,
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
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OverdueByCompetency;