import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';

interface ProductivityWidgetProps {
  productivityRatio?: number;
  focusMinutes?: number;
}

export const ProductivityWidget: React.FC<ProductivityWidgetProps> = ({ 
  productivityRatio = 70,
  focusMinutes = 0 
}) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full border border-gray-100/80 dark:border-gray-800/50 p-0 overflow-hidden">
      {/* On place le clic et l'effet hover sur cette div pour éviter l'erreur TypeScript */}
      <div 
        className="p-4 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-between gap-4"
        onClick={() => navigate('/focus-control')}
      >
        {/* Partie gauche : Icône et Titre */}
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase">Productivité</h4>
            <p className="text-sm font-bold text-[#1d3557] dark:text-[#e2e8f0]">Gérer mes routines</p>
          </div>
        </div>

        {/* Partie droite : Stats rapides */}
        <div className="flex items-center gap-3 text-right">
          <div className="border-r border-gray-100 dark:border-gray-800 pr-3">
            <span className="block text-xs font-black text-[#2a9d8f]">{productivityRatio}%</span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">Ratio</span>
          </div>
          <div>
            <span className="block text-xs font-black text-gray-500 dark:text-gray-300">
              {focusMinutes > 0 ? `${focusMinutes}m` : "Éteint"}
            </span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">Focus</span>
          </div>
        </div>
      </div>
    </Card>
  );
};