import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const BrainChallenge: React.FC = () => {
  return (
    <Card className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 bg-gray-50 dark:bg-[#0f1419] rounded-xl text-[#1d3557] dark:text-[#e2e8f0]">
          {/* Icône Éclair */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">Défi Cerveau du Jour</p>
      </div>

      <h3 className="text-xl font-bold text-[#1d3557] dark:text-[#e2e8f0] mb-2">Apprendre 5 termes de code</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
        Explore les concepts suivants : polymorphisme, idempotence, récursion, mémoisation et closure (fermeture). Explique chacun d'eux avec tes propres mots.
      </p>

      {/* Barre de progression linéaire */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
          <div className="bg-[#2a9d8f] h-full w-[60%] rounded-full" />
        </div>
        <span className="text-xs font-bold text-gray-400">3 / 5</span>
      </div>

      <Button variant="primary">Continuer le Défi</Button>
    </Card>
  );
};