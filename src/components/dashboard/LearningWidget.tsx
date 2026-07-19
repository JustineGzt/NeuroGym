import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';

export const LearningWidget: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className="w-full border border-gray-100/80 dark:border-gray-800/50 p-0 overflow-hidden">
      <div 
        className="p-4 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-between gap-4"
        onClick={() => navigate('/learning-control')}
      >
        {/* Partie gauche : Icône et Titre */}
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 rounded-xl">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase">Apprentissage</h4>
            <p className="text-sm font-bold text-[#1d3557] dark:text-[#e2e8f0]">Évoluer et mémoriser</p>
          </div>
        </div>

        {/* Partie droite : Informations rapides */}
        <div className="text-right">
          <span className="block text-xs font-black text-orange-500">🔥 14 jours</span>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">Régularité</span>
        </div>
      </div>
    </Card>
  );
};