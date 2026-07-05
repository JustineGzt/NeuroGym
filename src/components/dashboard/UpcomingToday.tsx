import React, { useState } from 'react';

interface Task {
  time: string;
  title: string;
  completed: boolean;
}

const tasks: Task[] = [
  { time: "09:00", title: "Méditation matinale", completed: true },
  { time: "11:30", title: "Lire 10 pages", completed: false },
  { time: "18:00", title: "Séance de sport (30 min)", completed: false },
  { time: "20:00", title: "Écrire dans le journal", completed: false },
  { time: "22:30", title: "Rétrospective de la journée", completed: false },
];

export const UpcomingToday: React.FC = () => {
  // État pour savoir si on affiche tout ou seulement les 3 premières tâches
  const [showAll, setShowAll] = useState(false);

  // Tri automatique par heure
  const sortedTasks = [...tasks].sort((a, b) => a.time.localeCompare(b.time));

  // Sélection des tâches à afficher (toutes ou seulement les 3 premières)
  const visibleTasks = showAll ? sortedTasks : sortedTasks.slice(0, 3);

  return (
    <div className="w-full px-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-[#1d3557] dark:text-[#e2e8f0]">À venir aujourd'hui</h3>
        
        {/* Le bouton change de texte et bascule l'état au clic */}
        {tasks.length > 3 && (
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-semibold text-[#2a9d8f] hover:underline transition-all"
          >
            {showAll ? "Réduire" : "Voir tout"}
          </button>
        )}
      </div>

      {sortedTasks.length === 0 ? (
        <p className="text-sm text-gray-400 italic py-4 text-center">Plus rien de prévu pour aujourd'hui !</p>
      ) : (
        <div className="flex flex-col gap-1">
          {visibleTasks.map((task, idx) => (
            <div 
              key={idx} 
              className={`flex items-center justify-between py-3.5 border-b border-gray-100 dark:border-gray-700/50 last:border-0 transition-opacity ${
                task.completed ? 'opacity-50' : 'opacity-100'
              }`}
            >
              <div className="flex items-center gap-6">
                <span className="text-xs font-semibold text-gray-400 tabular-nums">{task.time}</span>
                <span className={`text-sm font-semibold ${
                  task.completed ? 'text-gray-400 line-through' : 'text-[#1d3557] dark:text-[#e2e8f0]'
                }`}>
                  {task.title}
                </span>
              </div>
              
              {task.completed && (
                <span className="text-[#2a9d8f]" aria-hidden="true">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};