import React from 'react';

interface Task {
  time: string;
  title: string;
  completed: boolean;
}

const tasks: Task[] = [
  { time: "09:00", title: "Morning meditation", completed: true },
  { time: "11:30", title: "Read 10 pages", completed: false },
  { time: "18:00", title: "30 min workout", completed: false },
];

export const UpcomingToday: React.FC = () => {
  return (
    <div className="w-full px-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-[#1d3557] dark:text-[#e2e8f0]">Upcoming Today</h3>
        <button className="text-sm font-semibold text-[#2a9d8f] hover:underline">See all</button>
      </div>

      <div className="flex flex-col gap-1">
        {tasks.map((task, idx) => (
          <div key={idx} className="flex items-center justify-between py-3.5 border-b border-gray-100 dark:border-gray-700/50 last:border-0">
            <div className="flex items-center gap-6">
              <span className="text-xs font-medium text-gray-400">{task.time}</span>
              <span className={`text-sm font-semibold ${task.completed ? 'text-gray-400 line-through' : 'text-[#1d3557] dark:text-[#e2e8f0]'}`}>
                {task.title}
              </span>
            </div>
            {task.completed && (
              <span className="text-[#2a9d8f]">
                {/* Icône Check */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};