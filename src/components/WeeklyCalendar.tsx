import React from 'react';

export const WeeklyCalendar: React.FC = () => {
  const days = [
    { name: "M", date: 23, completed: true },
    { name: "T", date: 24, completed: true },
    { name: "W", date: 25, current: true },
    { name: "T", date: 26 },
    { name: "F", date: 27 },
    { name: "S", date: 28 },
    { name: "S", date: 29 },
  ];

  return (
    <div className="w-full bg-white dark:bg-[#1a2332] rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50 mb-6 transition-colors">
      <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-4">This Week — Jun 23–29</p>
      <div className="flex justify-between items-center">
        {days.map((day, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col items-center justify-center w-11 h-16 rounded-2xl transition-all ${
              day.current 
                ? "bg-[#1d3557] text-white shadow-md font-bold" 
                : day.completed 
                ? "bg-[#2a9d8f]/10 text-[#2a9d8f]" 
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <span className="text-[11px] font-medium opacity-70">{day.name}</span>
            <span className="text-base font-bold mt-1">{day.date}</span>
            {day.completed && !day.current && <span className="w-1 h-1 bg-[#2a9d8f] rounded-full mt-1"></span>}
          </div>
        ))}
      </div>
      <div className="mt-5">
        <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
          <span>Weekly Progress</span>
          <span className="text-[#2a9d8f]">50%</span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
          <div className="bg-[#2a9d8f] h-full w-1/2 rounded-full" />
        </div>
      </div>
    </div>
  );
};