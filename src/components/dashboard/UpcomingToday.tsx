import React, { useState } from 'react';

interface Task {
  id: number;
  time: string;
  title: string;
  completed: boolean;
}

export const UpcomingToday: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  
  // La liste est directement gérée ici, de manière totalement autonome
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, time: "09:00", title: "Méditation matinale", completed: true },
    { id: 2, time: "11:30", title: "Lire 10 pages", completed: false },
    { id: 3, time: "18:00", title: "Séance de sport (30 min)", completed: false },
    { id: 4, time: "20:00", title: "Écrire dans le journal", completed: false },
    { id: 5, time: "22:30", title: "Rétrospective de la journée", completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const sortedTasks = [...tasks].sort((a, b) => a.time.localeCompare(b.time));
  const visibleTasks = showAll ? sortedTasks : sortedTasks.slice(0, 3);

  return (
    <div className="w-full px-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-[#1d3557] dark:text-[#e2e8f0]">À venir aujourd'hui</h3>
        {tasks.length > 3 && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowAll(!showAll);
            }} 
            className="text-sm font-semibold text-[#2a9d8f] hover:underline cursor-pointer"
          >
            {showAll ? "Réduire" : "Voir tout"}
          </button>
        )}
      </div>

      <div className="flex flex-col gap-1">
        {visibleTasks.map((task) => (
          <div 
            key={task.id} 
            onClick={() => toggleTask(task.id)}
            className={`flex items-center justify-between py-3.5 border-b border-gray-100 dark:border-gray-700/50 last:border-0 cursor-pointer transition-all hover:bg-gray-50/5 dark:hover:bg-white/5 rounded-xl px-2 -mx-2 ${
              task.completed ? 'opacity-40' : 'opacity-100'
            }`}
          >
            <div className="flex items-center gap-6">
              <span className="text-xs font-semibold text-gray-400 tabular-nums">{task.time}</span>
              <span className={`text-sm font-semibold ${task.completed ? 'text-gray-400 line-through' : 'text-[#1d3557] dark:text-[#e2e8f0]'}`}>
                {task.title}
              </span>
            </div>
            {task.completed && (
              <span className="text-[#2a9d8f]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};