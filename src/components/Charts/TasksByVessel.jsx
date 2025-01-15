import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

function TasksByVessel({ data }) {
  const vesselCounts = data.vessels.reduce((acc, vessel) => {
    const criticalTasks = vessel.tasks.filter(task => task.type.toLowerCase() === 'critical').length;
    const nonCriticalTasks = vessel.tasks.length - criticalTasks;
    // const criticalDue;
    acc.push({
      name: vessel.name,
      critical: criticalTasks,
      nonCritical: nonCriticalTasks,
    });
    return acc;
  }, []);

  // Custom label renderer to position labels properly
  const renderCustomLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;

    return (
      <text
        x={x + width / 2}
        y={y + height / 2}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    );
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={vesselCounts}
          margin={{
            top: 20,
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
          <Bar dataKey="critical" fill="#ff4d4d" name="Critical Tasks">
            <LabelList dataKey="critical" position="center" content={renderCustomLabel} />
          </Bar>
          <Bar dataKey="nonCritical" fill="#82ca9d" name="Non-Critical Tasks">
            <LabelList dataKey="nonCritical" position="center" content={renderCustomLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TasksByVessel;