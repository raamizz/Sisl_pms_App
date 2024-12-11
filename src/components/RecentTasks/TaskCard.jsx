import React, { useState } from 'react';
import { ChevronRight, ChevronDown,Clock } from "lucide-react";
import { triggerHapticFeedback } from '../../utils/haptics'; 
import TaskDetails from './TaskDetails';

const TaskCard = ({ task }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
    triggerHapticFeedback(20);
  };

  return (
    <div 
      className={`
        bg-white rounded-lg shadow-sm 
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'shadow-md scale-[1.01]' : 'scale-100'}
        hover:bg-gray-50
        active:scale-[0.99] 
      `}
    >
      <div 
        className="p-3 cursor-pointer select-none touch-manipulation"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`
                w-1.5 h-1.5 rounded-full 
                transition-transform duration-300
                ${isExpanded ? 'scale-[1.2]' : 'scale-100'}
                ${task.department === 'DECK' ? 'bg-blue-500' : 'bg-red-500'}
              `} />
              <span className="text-xs text-gray-500">{task.id}</span>
              <span className="text-xs text-gray-400 truncate">{task.component}</span>
            </div>
            <h3 className="font-medium text-sm text-gray-800 truncate">
              {task.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{task.interval}</span>
              <span className="text-blue-600 font-medium">
                {task.department}
              </span>
            </div>
          </div>
          <div className="transition-transform duration-300">
            {isExpanded ? 
              <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" /> :
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            }
          </div>
        </div>
      </div>

      {isExpanded && <TaskDetails task={task} />}
    </div>
  );
};

export default TaskCard;
