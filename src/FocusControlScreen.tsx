import React, { useState } from 'react';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';

interface BlockedApp {
  id: string;
  name: string;
  duration: number;
  bypassIfTasksDone: boolean;
  createdAt: string;
}

interface CustomRule {
  id: string;
  title: string;
  isActive: boolean;
}

export default function FocusControlScreen() {
  // --- 1. ÉTATS DU BLOQUEUR DE RÉSEAUX ---
  const [selectedApp, setSelectedApp] = useState('Instagram');
  const [hours, setHours] = useState(2);
  const [bypassTasks, setBypassTasks] = useState(false);
  const [activeBlocks, setActiveBlocks] = useState<BlockedApp[]>([
    { id: '1', name: 'TikTok', duration: 4, bypassIfTasksDone: true, createdAt: '10:30' }
  ]);

  // --- 2. ÉTATS DES CONFIGURATIONS DE DÉFIS & RÈGLES ---
  const [strictMode, setStrictMode] = useState(true);
  const [morningTasksCompleted] = useState(true);

  const [customRules, setCustomRules] = useState<CustomRule[]>([
    { id: '1', title: "Pas d'écran dans le lit après 22h30", isActive: true },
    { id: '2', title: "Bloquer les notifications pendant le travail fouillé", isActive: false },
    { id: '3', title: "Pas de réseaux sociaux avant d'avoir bu 1L d'eau", isActive: true },
  ]);
  const [newRuleTitle, setNewRuleTitle] = useState('');

  // --- 3. LOGIQUE DES ACTIONS ---
  const handleCreateBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (bypassTasks && morningTasksCompleted) {
      alert(`🎉 Liberté Matinale activée ! Vos tâches du matin étant terminées, ${selectedApp} reste accessible.`);
      return;
    }

    const now = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const newBlock: BlockedApp = {
      id: Date.now().toString(),
      name: selectedApp,
      duration: hours,
      bypassIfTasksDone: bypassTasks,
      createdAt: now,
    };

    setActiveBlocks([newBlock, ...activeBlocks]);
    alert(`🔒 ${selectedApp} est verrouillé pour ${hours}h.`);
  };

  const handleRemoveBlock = (id: string) => {
    setActiveBlocks(activeBlocks.filter(block => block.id !== id));
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleTitle.trim()) return;
    const newRule: CustomRule = {
      id: Date.now().toString(),
      title: newRuleTitle,
      isActive: true,
    };
    setCustomRules([...customRules, newRule]);
    setNewRuleTitle('');
  };

  const toggleRule = (id: string) => {
    setCustomRules(customRules.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };

  return (
    <div className="pt-4 px-4 max-w-md mx-auto space-y-6 pb-12">
      
      {/* En-tête Principal */}
      <div>
        <h1 className="text-3xl font-black text-[#1d3557] dark:text-[#e2e8f0]">Centre de Contrôle</h1>
        <p className="text-sm text-gray-400 mt-1">Configure tes limites, défis et règles d'or</p>
      </div>

      {/* SECTION 1 : VUE D'ENSEMBLE & STATS DE FOCUS */}
      <Card className="!p-4 bg-gradient-to-br from-[#1d3557] to-[#2a9d8f] text-white">
        <h4 className="text-xs font-bold tracking-widest uppercase opacity-70">Statut actuel</h4>
        <div className="flex justify-between items-end mt-2">
          <div>
            <p className="text-2xl font-black">Mode Focus Actif</p>
            <p className="text-xs opacity-80 mt-1">
              {morningTasksCompleted ? "✅ Matinée validée (Liberté dispo)" : "⏳ Tâches du matin en cours"}
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black">85%</span>
            <p className="text-[10px] uppercase tracking-wider opacity-70">Score Discipline</p>
          </div>
        </div>
      </Card>

      {/* SECTION 2 : CONFIGURATEUR DE BLOCAGE DE RÉSEAUX */}
      <Card className="w-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-orange-50 dark:bg-orange-950/20 rounded-xl text-orange-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1d3557] dark:text-[#e2e8f0]">Limiter les Réseaux</h3>
            <p className="text-xs text-gray-400">Ajoute une restriction temporaire</p>
          </div>
        </div>

        <form onSubmit={handleCreateBlock} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Application</label>
              <select 
                value={selectedApp}
                onChange={(e) => setSelectedApp(e.target.value)}
                className="w-full p-2.5 bg-gray-50 dark:bg-[#0f1419] border border-gray-100 dark:border-gray-700/50 rounded-xl text-xs font-bold text-[#1d3557] dark:text-[#e2e8f0] outline-none"
              >
                <option value="Instagram">📷 Instagram</option>
                <option value="TikTok">🎵 TikTok</option>
                <option value="YouTube">📺 YouTube</option>
                <option value="Twitter / X">🐦 Twitter / X</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Durée</label>
              <select 
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full p-2.5 bg-gray-50 dark:bg-[#0f1419] border border-gray-100 dark:border-gray-700/50 rounded-xl text-xs font-bold text-[#1d3557] dark:text-[#e2e8f0] outline-none"
              >
                <option value="1">1 heure</option>
                <option value="2">2 heures</option> 
                <option value="4">4 heures</option>
                <option value="8">8 heures</option>
              </select>
            </div>
          </div>

          {/* Option : Liberté Matinale */}
          <div className="flex items-start gap-3 p-3 bg-[#2a9d8f]/5 dark:bg-[#2a9d8f]/10 rounded-xl border border-[#2a9d8f]/20">
            <input 
              type="checkbox" 
              id="bypass"
              checked={bypassTasks}
              onChange={(e) => setBypassTasks(e.target.checked)}
              className="mt-0.5 accent-[#2a9d8f] h-4 w-4 rounded cursor-pointer"
            />
            <label htmlFor="bypass" className="text-xs text-gray-600 dark:text-gray-300 cursor-pointer">
              <strong className="text-[#1d3557] dark:text-[#e2e8f0] block">Option "Liberté Matinale"</strong>
              Ne pas bloquer si toutes mes tâches de la matinée sont terminées.
            </label>
          </div>

          <Button type="submit" variant="primary" className="w-full !py-2.5 !rounded-xl text-xs font-bold">
            Verrouiller l'accès
          </Button>
        </form>

        {/* Historique des blocages en cours */}
        {activeBlocks.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50 space-y-2">
            <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Verrous en cours</p>
            {activeBlocks.map((block) => (
              <div key={block.id} className="flex items-center justify-between p-2.5 bg-red-50/40 dark:bg-red-950/10 border border-red-100/50 dark:border-red-950/30 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-[#1d3557] dark:text-[#e2e8f0]">{block.name}</p>
                  <p className="text-[10px] text-gray-400">
                    Activé à {block.createdAt} pour {block.duration}h {block.bypassIfTasksDone && "• Immunité matin"}
                  </p>
                </div>
                <button onClick={() => handleRemoveBlock(block.id)} className="text-[11px] font-bold text-red-500 hover:underline">
                  Annuler
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* SECTION 3 : OPTIONS & RÈGLES COMPORTEMENTALES */}
      <Card className="w-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded-xl text-purple-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1d3557] dark:text-[#e2e8f0]">Règles d'Or Personnalisées</h3>
            <p className="text-xs text-gray-400">Tes propres lois de discipline</p>
          </div>
        </div>

        {/* Liste des règles */}
        <div className="space-y-2 mb-4">
          {customRules.map((rule) => (
            <div 
              key={rule.id} 
              onClick={() => toggleRule(rule.id)}
              className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-[#0f1419]/60 rounded-xl cursor-pointer hover:bg-gray-100/50 dark:hover:bg-[#0f1419] transition-all"
            >
              <span className={`text-xs font-semibold pr-2 ${rule.isActive ? 'text-[#1d3557] dark:text-[#e2e8f0]' : 'text-gray-400 line-through opacity-50'}`}>
                {rule.isActive ? "🔹" : "🔸"} {rule.title}
              </span>
              <div className={`w-7 h-4 flex items-center rounded-full p-0.5 ${rule.isActive ? 'bg-[#2a9d8f]' : 'bg-gray-300 dark:bg-gray-700'}`}>
                <div className={`bg-white w-3 h-3 rounded-full shadow transform transition-transform ${rule.isActive ? 'translate-x-3' : 'translate-x-0'}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Ajouter une règle */}
        <form onSubmit={handleAddRule} className="flex gap-2">
          <input 
            type="text" 
            placeholder="Ex: Pas d'app avant d'avoir lu..."
            value={newRuleTitle}
            onChange={(e) => setNewRuleTitle(e.target.value)}
            className="flex-1 p-2 bg-gray-50 dark:bg-[#0f1419] border border-gray-100 dark:border-gray-700/50 rounded-xl text-xs font-medium text-[#1d3557] dark:text-[#e2e8f0] outline-none placeholder-gray-400 focus:border-[#2a9d8f]"
          />
          <button type="submit" className="px-3 bg-gray-100 dark:bg-gray-800 text-[#1d3557] dark:text-[#e2e8f0] font-bold text-xs rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            Ajouter
          </button>
        </form>
      </Card>

      {/* SECTION 4 : PARAMÈTRES STRICTS DE SÉCURITÉ */}
      <Card className="w-full !p-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#1d3557] dark:text-[#e2e8f0]">Mode Ultra Strict (Anti-Abandon)</span>
            <span className="text-[10px] text-gray-400 mt-0.5">Empêche de désactiver un blocage avant sa fin</span>
          </div>
          <button 
            onClick={() => setStrictMode(!strictMode)}
            className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${strictMode ? 'bg-red-500' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            <div className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${strictMode ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
        </div>
      </Card>

    </div>
  );
}