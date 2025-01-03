import React from 'react'
import TasksDashboard from './TasksGraphs'
import TasksByStatus from '../Charts/TasksByStatus'

const Graphs = ({data}) => {
  return (
    <div className=''>
        <TasksDashboard data={data} />
      {/* <TasksByStatus data={data} /> */}
    </div>
  )
}

export default Graphs
