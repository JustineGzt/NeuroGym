import React, { useState } from 'react';
// Les chemins reculent d'un dossier (..) pour sortir de 'dashboard', puis vont dans 'ui'
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface BlockedApp {
  id: string;
  name: string;
  duration: number;
  bypassIfTasksDone: boolean;
  active: boolean;
}

export const FocusBlocker: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState('Instagram');
  const [hours, setHours] = useState(2);
  const [bypassTasks, setBypassTasks] = useState(false);
  const [activeBlocks, setActiveBlocks] = useState<BlockedApp[]>([]);

  const morningTasksCompleted = true; // Simulé à "vrai" pour l'instant

  const handleCreateBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (bypassTasks && morningTasksCompleted) {
      alert(`🎉 Vos tâches du matin sont déjà finies ! ${selectedApp} ne sera pas bloqué.`);
      return;
    }

    const newBlock: BlockedApp = {
      id: Date.now().toString(),
      name: selectedApp,
      duration: hours,
      bypassIfTasksDone: bypassTasks,
      active: true,
    };

    setActiveBlocks([newBlock, ...activeBlocks]);
    alert(`🔒 ${selectedApp} est maintenant bloqué pour ${hours}h !`);
  };

  const handleRemoveBlock = (id: string) => {
    setActiveBlocks(activeBlocks.filter(block => block.id !== id));
  };

  return (
    <Card className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-orange-50 dark:bg-orange-950/20 rounded-xl text-orange-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#1d3557] dark:text-[#e2e8f0]">Contrôle des Distractions</h3>
          <p className="text-xs text-gray-400">Bloque tes réseaux pour rester focus</p>
        </div>
      </div>

      <form onSubmit={handleCreateBlock} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Réseau Social</label>
          <select 
            value={selectedApp}
            onChange={(e) => setSelectedApp(e.target.value)}
            className="w-full p-3 bg-gray-50 dark:bg-[#0f1419] border border-gray-100 dark:border-gray-700/50 rounded-xl text-sm font-semibold text-[#1d3557] dark:text-[#e2e8f0] outline-none focus:border-[#2a9d8f]"
          >
            <option value="Instagram">📷 Instagram</option>
            <option value="TikTok">🎵 TikTok</option>
            <option value="YouTube">📺 YouTube</option>
            <option value="Twitter / X">🐦 Twitter / X</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Durée du blocage</label>
          <select 
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full p-3 bg-gray-50 dark:bg-[#0f1419] border border-gray-100 dark:border-gray-700/50 rounded-xl text-sm font-semibold text-[#1d3557] dark:text-[#e2e8f0] outline-none focus:border-[#2a9d8f]"
          >
            <option value="1">1 heure</option>
            <option value="2">2 heures</option>
            <option value="4">4 heures</option>
            <option value="8">8 heures</option>
          </select>
        </div>

        <div className="flex items-start gap-3 p-3 bg-[#2a9d8f]/5 dark:bg-[#2a9d8f]/10 rounded-xl border border-[#2a9d8f]/20">
          <input 
            type="checkbox" 
            id="bypass"
            checked={bypassTasks}
            onChange={(e) => setBypassTasks(e.target.checked)}
            className="mt-1 accent-[#2a9d8f] cursor-pointer h-4 w-4 rounded"
          />
          <label htmlFor="bypass" className="text-xs font-medium text-gray-600 dark:text-gray-300 cursor-pointer leading-tight">
            <strong className="text-[#1d3557] dark:text-[#e2e8f0] block mb-0.5">Option "Liberté Matinale"</strong>
            Débloquer automatiquement si toutes mes tâches du mabtin sont complétées.
          </label>
        </div>

        <Button type="submit" variant="primary" className="w-full !py-3 !rounded-xl text-sm font-bold">
          Activer le blocage
        </Button>
      </form>

      {activeBlocks.length > 0 && (
        <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700/50">
          <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-3">Blocages Actifs</p>
          <div className="space-y-2">
            {activeBlocks.map((block) => (
              <div key={block.id} className="flex items-center justify-between p-3 bg-red-50/50 dark:bg-red-950/10 border border-red-100/50 dark:border-red-950/30 rounded-xl">
                <div>
                  <p className="text-sm font-bold text-[#1d3557] dark:text-[#e2e8f0]">{block.name}</p>
                  <p className="text-[11px] text-gray-400 font-medium">
                    Bloqué pour {block.duration}h {block.bypassIfTasksDone && "• Sauf si matinée validée"}
                  </p>
                </div>
                <button 
                  onClick={() => handleRemoveBlock(block.id)}
                  className="text-xs font-bold text-red-500 hover:underline"
                >
                  Annuler
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};