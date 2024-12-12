import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChevronLeft, ChevronRight, AlertTriangle, SlidersHorizontal, Info } from 'lucide-react';
import { triggerHapticFeedback } from '../utils/hapticFeedback.js';

// Helper function to calculate days overdue
const calculateDaysOverdue = (lastCompletionDate, interval, currentDate = new Date()) => {
  if (!lastCompletionDate) return 999;
  
  const intervalMap = {
    '1 Week': 7,
    '1 Month': 30,
    '3 Months': 90,
    '60 Months': 1800
  };

  const lastDate = new Date(lastCompletionDate);
  const daysOverdue = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));
  const intervalDays = intervalMap[interval] || 30;
  
  return Math.max(0, daysOverdue - intervalDays);
};

// Priority score calculation
const calculatePriorityScore = (task) => {
  // 1. Criticality Score (0-40 points)
  const criticalityScore = task.type === 'critical' ? 40 : 0;

  // 2. Overdue Duration Score (0-30 points)
  const daysOverdue = calculateDaysOverdue(task.lastCompletionDate, task.interval);
  const overdueDurationScore = Math.min(30, (daysOverdue / 30) * 30);

  // 3. Competency Level Score (0-15 points)
  const competencyScores = {
    'C/E': 15,
    '2/E': 12,
    'E/O': 10,
    '3/O': 8
  };
  const competencyScore = competencyScores[task.minimumCompetency] || 5;

  // 4. Interval Urgency Score (0-15 points)
  const intervalScores = {
    '1 Week': 15,
    '1 Month': 12,
    '3 Months': 8,
    '60 Months': 5
  };
  const intervalScore = intervalScores[task.interval] || 5;

  const totalScore = criticalityScore + overdueDurationScore + competencyScore + intervalScore;

  return {
    total: totalScore,
    breakdown: {
      criticality: criticalityScore,
      overdueDuration: overdueDurationScore,
      competency: competencyScore,
      interval: intervalScore
    },
    daysOverdue
  };
};

// Filter Button Component
const FilterButton = ({ active, onClick, children }) => (
  <button
    onClick={() => {
      triggerHapticFeedback(50);
      onClick();
    }}
    className={`px-3 py-1 rounded-full text-sm ${
      active
        ? 'bg-blue-600 text-white'
        : 'bg-gray-100 text-gray-600'
    }`}
  >
    {children}
  </button>
);

// Icon Button Component
const IconButton = ({ icon: Icon, onClick, label }) => (
  <button 
    onClick={() => {
      triggerHapticFeedback(50);
      onClick();
    }}
    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
  </button>
);

// Priority Bar Indicator Component
const PriorityBars = ({ score }) => {
  let filledBars = 0;
  if (score >= 80) filledBars = 3;
  else if (score >= 50) filledBars = 2;
  else filledBars = 1;

  return (
    <div className="flex gap-1">
      {[...Array(3)].map((_, i) => (
        <div 
          key={i}
          className={`w-1 h-3 rounded ${
            i < filledBars ? 'bg-red-500' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
};

// Risk Badge Component
const RiskBadge = ({ ratio }) => {
  let color = 'bg-yellow-100 text-yellow-800';
  let text = 'Low Risk';
  
  if (ratio >= 70) {
    color = 'bg-red-100 text-red-800';
    text = 'High Risk';
  } else if (ratio >= 30) {
    color = 'bg-orange-100 text-orange-800';
    text = 'Medium Risk';
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {ratio >= 70 && <AlertTriangle className="w-3 h-3 mr-1" />}
      {text}
    </span>
  );
};

// Priority Explanation Modal
const PriorityExplanation = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg max-w-lg w-full p-6 space-y-4">
      <h3 className="text-lg font-semibold">Priority Calculation Method</h3>
      
      <div className="space-y-3 text-sm">
        <p className="font-medium">Total Priority Score (100 points) consists of:</p>
        
        <div className="space-y-2">
          <h4 className="font-medium text-red-600">1. Criticality (40 points)</h4>
          <p>Critical equipment tasks receive maximum points due to their direct impact on vessel safety and operations.</p>
          
          <h4 className="font-medium text-orange-600">2. Overdue Duration (30 points)</h4>
          <p>Scaled based on days overdue relative to maintenance interval. Longer overdue periods indicate higher risk.</p>
          
          <h4 className="font-medium text-blue-600">3. Required Competency (15 points)</h4>
          <p>Tasks requiring higher competency levels (e.g., Chief Engineer) often involve more critical systems.</p>
          
          <h4 className="font-medium text-green-600">4. Maintenance Interval (15 points)</h4>
          <p>More frequent maintenance requirements indicate systems needing regular attention.</p>
        </div>

        <div className="pt-2">
          <p className="font-medium">Justification:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Aligns with maritime safety regulations (ISM Code Chapter 10)</li>
            <li>Prioritizes safety-critical equipment maintenance</li>
            <li>Considers both time-based risk escalation and system importance</li>
            <li>Reflects industry standard maintenance practices</li>
          </ul>
        </div>
      </div>

      <button 
        onClick={() => {
          triggerHapticFeedback(50);
          onClose();
        }}
        className="w-full mt-4 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  </div>
);

// Custom Legend Component
const CustomLegend = ({ payload, pieData }) => (
  <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm">
    {payload.map((entry, index) => (
      <div key={`legend-${index}`} className="flex items-center">
        <div 
          className="w-3 h-3 rounded-full mr-2"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-gray-600">
          {entry.value}: {pieData.find(item => item.name === entry.value)?.value || 0}
        </span>
      </div>
    ))}
  </div>
);

// Main Component
const MaintenanceAnalytics = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [riskFilter, setRiskFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [taskCountFilter, setTaskCountFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showPriorityInfo, setShowPriorityInfo] = useState(false);

  // Process components with priority calculation
  const componentAnalysis = data.vessels[0].tasks.reduce((acc, task) => {
    if (task.actualStatus === 'Overdue') {
      if (!acc[task.component]) {
        acc[task.component] = {
          count: 0,
          criticalCount: 0,
          departments: new Set(),
          tasks: [],
          highestPriority: 0,
          totalPriority: 0
        };
      }
      
      const priorityDetails = calculatePriorityScore(task);
      acc[task.component].count += 1;
      if (task.type === 'critical') acc[task.component].criticalCount += 1;
      acc[task.component].departments.add(task.department);
      acc[task.component].tasks.push({...task, priorityDetails});
      acc[task.component].highestPriority = Math.max(acc[task.component].highestPriority, priorityDetails.total);
      acc[task.component].totalPriority += priorityDetails.total;
    }
    return acc;
  }, {});

  const componentsArray = Object.entries(componentAnalysis)
    .map(([name, stats]) => {
      const criticalRatio = (stats.criticalCount / stats.count) * 100;
      return {
        name,
        count: stats.count,
        criticalCount: stats.criticalCount,
        departments: Array.from(stats.departments).join(', '),
        criticalRatio,
        priorityScore: stats.highestPriority,
        priorityLevel: stats.highestPriority >= 80 ? 'high' : 
                      stats.highestPriority >= 50 ? 'medium' : 'low',
        riskLevel: criticalRatio >= 70 ? 'high' : 
                   criticalRatio >= 30 ? 'medium' : 'low'
      };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);

  // Handle component click
  const handleComponentClick = (component) => {
    triggerHapticFeedback(30);
    // Add your component click handling logic here
  };

  // Filter components
  const getTaskCountRange = (count) => {
    if (count <= 5) return '1-5';
    if (count <= 10) return '5-10';
    return '10+';
  };

  const filteredComponents = componentsArray.filter(comp => {
    const riskMatch = riskFilter === 'all' || comp.riskLevel === riskFilter;
    const priorityMatch = priorityFilter === 'all' || comp.priorityLevel === priorityFilter;
    const taskCountMatch = taskCountFilter === 'all' || getTaskCountRange(comp.count) === taskCountFilter;
    return riskMatch && priorityMatch && taskCountMatch;
  });

  const totalPages = Math.ceil(filteredComponents.length / itemsPerPage);
  const currentItems = filteredComponents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Prepare pie chart data
  const riskCounts = componentsArray.reduce((acc, comp) => {
    acc[comp.riskLevel] = (acc[comp.riskLevel] || 0) + 1;
    return acc;
  }, {});

  const pieData = [
    { name: 'High Risk', value: riskCounts.high || 0, color: '#dc2626' },
    { name: 'Medium Risk', value: riskCounts.medium || 0, color: '#f97316' },
    { name: 'Low Risk', value: riskCounts.low || 0, color: '#f59e0b' }
  ];

  return (
    <div className="flex flex-col space-y-4 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Maintenance Tasks</h2>
        
      </div>

      {showPriorityInfo && (
        <PriorityExplanation onClose={() => setShowPriorityInfo(false)} />
      )}

      {/* Risk Distribution Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-medium mb-2">Risk Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="40%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend content={<CustomLegend pieData={pieData} />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 justify-end">
          <IconButton 
            icon={Info} 
            onClick={() => setShowPriorityInfo(true)} 
            label="Priority Info"
          />
          <IconButton 
            icon={SlidersHorizontal} 
            onClick={() => setShowFilters(!showFilters)} 
            label="Filters"
          />
        </div>
      <div className="space-y-4">
        {showFilters && (
          <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Risk Level</label>
              <div className="flex flex-wrap gap-2">
                {['all', 'high', 'medium', 'low'].map((level) => (
                  <FilterButton
                    key={`risk-${level}`}
                    active={riskFilter === level}
                    onClick={() => {
                      setRiskFilter(level);
                      setCurrentPage(1);
                    }}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </FilterButton>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Priority Level</label>
              <div className="flex flex-wrap gap-2">
                {['all', 'high', 'medium', 'low'].map((level) => (
                  <FilterButton
                    key={`priority-${level}`}
                    active={priorityFilter === level}
                    onClick={() => {
                      setPriorityFilter(level);
                      setCurrentPage(1);
                    }}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </FilterButton>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Number of Tasks</label>
              <div className="flex flex-wrap gap-2">
                {['all', '1-5', '5-10', '10+'].map((range) => (
                  <FilterButton
                    key={`tasks-${range}`}
                    active={taskCountFilter === range}
                    onClick={() => {
                      setTaskCountFilter(range);
                      setCurrentPage(1);
                    }}
                  >
                    {range}
                  </FilterButton>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {(riskFilter !== 'all' || priorityFilter !== 'all' || taskCountFilter !== 'all') && (
          <div className="flex flex-wrap gap-2">
            {riskFilter !== 'all' && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                Risk: {riskFilter}
              </span>
            )}
            {priorityFilter !== 'all' && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                Priority: {priorityFilter}
              </span>
            )}
            {taskCountFilter !== 'all' && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                Tasks: {taskCountFilter}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Component Cards */}
      <div className="space-y-3">
        
        {currentItems.map((component, idx) => (
          <div 
            key={idx} 
            className="bg-white rounded-lg shadow p-4 active:bg-gray-50"
            onClick={() => handleComponentClick(component)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{component.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <PriorityBars score={component.priorityScore} />
                  <span className="text-xs text-gray-500">
                    Priority: {component.priorityLevel}
                  </span>
                </div>
              </div>
              <RiskBadge ratio={component.criticalRatio} />
            </div>
            <div className="space-y-1 text-sm mt-3">
              <div className="text-gray-600 font-medium">
                {component.count} tasks ({component.criticalCount} critical)
              </div>
              <div className="text-gray-500">
                {component.departments}
              </div>
            </div>
          </div>
        ))}

        {filteredComponents.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
            No components match the selected filters
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-lg shadow p-2">
          <button
            onClick={() => {
              triggerHapticFeedback(50);
              setCurrentPage(Math.max(1, currentPage - 1));
            }}
            disabled={currentPage === 1}
            className="p-1 rounded disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => {
              triggerHapticFeedback(50);
              setCurrentPage(Math.min(totalPages, currentPage + 1));
            }}
            disabled={currentPage === totalPages}
            className="p-1 rounded disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MaintenanceAnalytics;