import React, { useState } from 'react';
import { Card } from './ui/Card'; // Il va chercher la Card dans le sous-dossier ui/

interface HabitItemProps {
  icon: string;
  title: string;
  streak: number;
  initialCompleted: boolean;
}

export const HabitItem: React.FC<HabitItemProps> = ({ icon, title, streak, initialCompleted }) => {
  const [completed, setCompleted] = useState(initialCompleted);

  return (
    <Card className={`mb-3 transition-all duration-300 ${completed ? 'bg-[#2a9d8f]/5 border-[#2a9d8f]/20' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Icône de l'habitude */}
          <span className="text-2xl p-2 bg-gray-50 rounded-xl">{icon}</span>
          
          <div>
            {/* Titre de l'habitude (barré si coché) */}
            <h4 className={`font-bold text-base transition-all ${completed ? 'text-gray-400 line-through' : 'text-[#1d3557]'}`}>
              {title}
            </h4>
            {/* Compteur de jours de série (Streak) */}
            <p className="text-xs font-semibold text-orange-400 mt-0.5">🔥 {streak} jours d'affilée</p>
          </div>
        </div>

        {/* Bouton Checkbox circulaire */}
        <button 
          onClick={() => setCompleted(!completed)}
          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
            completed 
              ? 'bg-[#2a9d8f] border-[#2a9d8f] text-white' 
              : 'border-gray-200 hover:border-gray-400'
          }`}
        >
          {completed && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
      </div>
    </Card>
  );
};