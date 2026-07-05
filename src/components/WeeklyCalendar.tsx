import React from 'react';

export const WeeklyCalendar: React.FC = () => {
  const today = new Date();
  
  // 1. Trouver le lundi de la semaine en cours
  const currentDayOfWeek = today.getDay(); // 0 = Dimanche, 1 = Lundi, etc.
  const distanceToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + distanceToMonday);

  // 2. Générer dynamiquement les 7 jours de la semaine
  const daysShortNames = ["L", "M", "M", "J", "V", "S", "D"];
  
  const days = Array.from({ length: 7 }, (_, idx) => {
    const currentIteratedDate = new Date(monday);
    currentIteratedDate.setDate(monday.getDate() + idx);

    // Vérifie si ce jour correspond à aujourd'hui (Même jour, mois, année)
    const isCurrent = currentIteratedDate.toDateString() === today.toDateString();

    // Simulation de complétion pour l'exemple :
    // On considère complété si c'est un jour passé dans la semaine (avant aujourd'hui)
    const isCompleted = currentIteratedDate < today && !isCurrent;

    return {
      name: daysShortNames[idx],
      date: currentIteratedDate.getDate(),
      current: isCurrent,
      completed: isCompleted, // À remplacer plus tard par tes vraies données de validation
    };
  });

  // 3. Calcul dynamique du progrès de la semaine
  const completedCount = days.filter(d => d.completed || d.current).length; // Jours cochés ou en cours
  const progressPercentage = Math.round((completedCount / 7) * 100);

  // 4. Formater la plage de dates du titre (ex: "22–28 juin")
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  
  const optionsMonth = { month: 'long' } as const;
  const startMonth = monday.toLocaleDateString('fr-FR', optionsMonth);
  const endMonth = sunday.toLocaleDateString('fr-FR', optionsMonth);
  
  // Gère le cas où la semaine chevauche deux mois différents
  const dateRangeString = startMonth === endMonth
    ? `${monday.getDate()}–${sunday.getDate()} ${startMonth}`
    : `${monday.getDate()} ${startMonth} – ${sunday.getDate()} ${endMonth}`;

  return (
    <div className="w-full bg-white dark:bg-[#1a2332] rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50 mb-6 transition-colors">
      <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-4">
        Cette semaine — {dateRangeString}
      </p>
      
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
      
      {/* Barre de Progression Dynamique */}
      <div className="mt-5">
        <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
          <span>Progression Hebdomadaire</span>
          <span className="text-[#2a9d8f]">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-[#2a9d8f] h-full rounded-full transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};