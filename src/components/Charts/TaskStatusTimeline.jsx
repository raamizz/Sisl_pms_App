import React, { useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush } from 'recharts';

const sampleData = [
  {
    name: 'Task 1',
    start: new Date('2024-12-01'),
    end: new Date('2024-12-05'),
    status: 'Completed'
  },
  {
    name: 'Task 2',
    start: new Date('2024-12-05'),
    end: new Date('2024-12-10'),
    status: 'In Progress'
  },
  {
    name: 'Task 3',
    start: new Date('2024-12-10'),
    end: new Date('2024-12-15'),
    status: 'Overdue'
  },
  {
    name: 'Task 4',
    start: new Date('2024-12-15'),
    end: new Date('2024-12-20'),
    status: 'Completed'
  },
];

const TimelineChart = () => {
  const timelineData = useMemo(() => {
    return sampleData.map((task) => {
      const startTime = task.start.getTime();
      const endTime = task.end.getTime();
      return {
        name: task.name,
        start: startTime,
        end: endTime,
        duration: endTime - startTime,
        status: task.status
      };
    }).sort((a, b) => a.start - b.start);
  }, []);

  return (
    <div className="timeline-chart">
      <h2 className="text-xl font-bold mb-4">Task Timeline</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={timelineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="start"
            domain={['auto', 'auto']}
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
            scale="time"
            label={{ value: 'Date', position: 'bottom' }}
          />
          <YAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload?.[0]) {
                const task = payload[0].payload;
                return (
                  <div className="bg-white p-3 border rounded shadow-lg">
                    <p className="font-bold">{task.name}</p>
                    <p><span className="font-semibold">Start:</span> {new Date(task.start).toLocaleDateString()}</p>
                    <p><span className="font-semibold">End:</span> {new Date(task.end).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Status:</span> {task.status}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          {timelineData.map((task, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey="duration"
              data={[{ start: task.start, duration: task.duration }]}
              stroke={task.status === 'Completed' ? '#22c55e' : task.status === 'In Progress' ? '#f59e0b' : '#ef4444'}
              dot={false}
              activeDot={{ r: 8 }}
            />
          ))}
          <Brush />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelineChart;