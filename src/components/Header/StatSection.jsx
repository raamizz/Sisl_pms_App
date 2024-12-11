import React from 'react';

const StatSection = ({ data, title, dotColor, type }) => {
  const getTextColor = (type, variant) => {
    if (type === 'postponed') return 'text-gray-600';
    return variant === 'overdue' ? 'text-red-600' : 'text-amber-600';
  };

  const getNumbers = () => {
    switch (type) {
      case 'critical':
        return { first: data.critical.overdue, second: data.critical.due };
      case 'non-critical':
        return { first: data.nonCritical.overdue, second: data.nonCritical.due };
      case 'postponed':
        return { first: data.postponed.regular, second: data.postponed.drydock };
      default:
        return { first: 0, second: 0 };
    }
  };

  const numbers = getNumbers();

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></div>
        <span className="font-medium text-gray-800 text-xs sm:text-sm truncate">{title}</span>
      </div>
      <div className="flex gap-2 sm:gap-3 items-end">
        <div>
          <div className={`text-[10px] sm:text-xs mb-0.5 ${getTextColor(type, 'overdue')}`}>
            {type === 'postponed' ? 'REG' : 'OVER'}
          </div>
          <div className={`text-base sm:text-lg font-bold ${getTextColor(type, 'overdue')}`}>
            {numbers.first}
          </div>
        </div>
        <div>
          <div className={`text-[10px] sm:text-xs mb-0.5 ${getTextColor(type, 'due')}`}>
            {type === 'postponed' ? 'DRY' : 'DUE'}
          </div>
          <div className={`text-base sm:text-lg font-bold ${getTextColor(type, 'due')}`}>
            {numbers.second}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatSection;