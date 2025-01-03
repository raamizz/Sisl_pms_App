import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function AvgOverdueByDepartment({ data }) {
  const departmentOverdueDays = data.vessels[0].tasks.reduce((acc, task) => {
    if (task.actualStatus === 'Overdue') {
      const overdueDate = new Date(task.jobDate);
      const currentDate = new Date();
      const overdueDays = Math.ceil((currentDate - overdueDate) / (1000 * 60 * 60 * 24));
      
      if (!acc[task.department]) {
        acc[task.department] = { total: overdueDays, count: 1 };
      } else {
        acc[task.department].total += overdueDays;
        acc[task.department].count += 1;
      }
    }
    return acc;
  }, {});

  const chartData = Object.entries(departmentOverdueDays).map(([name, data]) => ({
    name,
    value: Math.round(data.total / data.count),
  }));

  return (
    <div style={{ width: '100%', height: 300 }} >
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

export default AvgOverdueByDepartment;