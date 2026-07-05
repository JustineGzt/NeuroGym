import React from 'react';
import { Card } from '../ui/Card';
import { ProgressRing } from '../ui/ProgressRing';

export const GrowthScore: React.FC = () => {
  return (
    <Card className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-1">Score d'Évolution Journalier</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-[#1d3557] dark:text-[#e2e8f0]">73</span>
            <span className="text-gray-400 font-medium">/100</span>
          </div>
          <p className="text-xs font-semibold text-[#2a9d8f] mt-1">↑ 12 pts par rapport à hier</p>
        </div>
        <ProgressRing percentage={73} />
      </div>
      
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 dark:border-gray-700/50 text-center">
        <div>
          <p className="text-lg font-bold text-[#2a9d8f]">4/6</p>
          <p className="text-[10px] font-medium text-gray-400">Habitudes</p>
        </div>
        <div className="border-x border-gray-100 dark:border-gray-700/50">
          <p className="text-lg font-bold text-[#1d3557] dark:text-[#e2e8f0]">2.5h</p>
          <p className="text-[10px] font-medium text-gray-400">Focus</p>
        </div>
        <div>
          <p className="text-lg font-bold text-orange-400">14 j</p>
          <p className="text-[10px] font-medium text-gray-400">Série (Streak)</p>
        </div>
      </div>
    </Card>
  );
};