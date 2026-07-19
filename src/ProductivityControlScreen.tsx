import React, { useState, useEffect } from 'react';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';

// Interfaces pour la gestion du typage
interface IvyTask {
  id: string;
  text: string;
  completed: boolean;
  friction: number; // 1 à 5
}

interface TimeBox {
  hour: string;
  theme: string;
}

interface SubTask {
  id: string;
  text: string;
  completed: boolean;
}

interface DraftIdea {
  id: string;
  text: string;
  createdAt: number; // timestamp
}

export default function ProductivityControlScreen() {
  // --- 1. INDICE DE PRODUCTIVITÉ RÉEL & SUIVI GLOBAL ---
  const [plannedCount, setPlannedCount] = useState(10);
  const [completedCount, setCompletedCount] = useState(7);
  const productivityRatio = plannedCount > 0 ? Math.round((completedCount / plannedCount) * 100) : 0;

  // --- 2. MÉTHODE IVY LEE & CALCULATEUR DE FRICTION ---
  const [ivyTasks, setIvyTasks] = useState<IvyTask[]>([
    { id: '1', text: 'Finir le design de la base de données', completed: false, friction: 4 },
    { id: '2', text: 'Refactoriser le composant d\'authentification', completed: true, friction: 5 },
    { id: '3', text: 'Écrire la documentation API', completed: false, friction: 2 },
  ]);
  const [newIvyText, setNewIvyText] = useState('');
  const [newFriction, setNewFriction] = useState(3);

  const handleAddIvyTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (ivyTasks.length >= 6) {
      alert("La méthode Ivy Lee limite strictement à 6 tâches majeures ! Finis-en d'abord une.");
      return;
    }
    if (!newIvyText.trim()) return;

    const newTask: IvyTask = {
      id: Date.now().toString(),
      text: newIvyText,
      completed: false,
      friction: newFriction,
    };
    // On trie automatiquement par friction décroissante (les plus dures en premier)
    const updated = [...ivyTasks, newTask].sort((a, b) => b.friction - a.friction);
    setIvyTasks(updated);
    setNewIvyText('');
    setPlannedCount(prev => prev + 1);
  };

  const toggleIvyTask = (id: string) => {
    setIvyTasks(ivyTasks.map(t => {
      if (t.id === id) {
        const nextState = !t.completed;
        setCompletedCount(prev => nextState ? prev + 1 : prev - 1);
        return { ...t, completed: nextState };
      }
      return t;
    }));
  };

  // --- 3. TIME-BOXING VISUEL (Grille de 1h) ---
  const [timeBoxes, setTimeBoxes] = useState<TimeBox[]>([
    { hour: "08:00 - 09:00", theme: "Focus Code 💻" },
    { hour: "11:00 - 12:00", theme: "Sport & Cardio 🏃‍♂️" },
    { hour: "14:00 - 15:00", theme: "Lecture technique 📚" },
  ]);
  const [selectedHour, setSelectedHour] = useState("09:00 - 10:00");
  const [selectedTheme, setSelectedTheme] = useState("Focus Code 💻");

  const handleAddTimeBox = () => {
    if (timeBoxes.some(b => b.hour === selectedHour)) {
      alert("Ce créneau horaire est déjà bloqué !");
      return;
    }
    setTimeBoxes([...timeBoxes, { hour: selectedHour, theme: selectedTheme }].sort((a, b) => a.hour.localeCompare(b.hour)));
  };

  // --- 4. NETTOYAGE DE FIN DE JOURNÉE (Checklist 18h) ---
  const [cleanupChecks, setCleanupChecks] = useState([
    { id: '1', text: 'Fermer les onglets de navigateur inutiles 🌐', checked: false },
    { id: '2', text: 'Ranger physiquement le bureau 🧹', checked: false },
    { id: '3', text: 'Vider la corbeille (physique et numérique) 🗑️', checked: false },
  ]);

  const toggleCleanup = (id: string) => {
    setCleanupChecks(cleanupChecks.map(c => c.id === id ? { ...c, checked: !c.checked } : c));
  };

  // --- 5. DÉCOUPEUR DE PROJETS EN 5 ÉTAPES ---
  const [projectGoal, setProjectGoal] = useState('');
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);

  const handleSplitProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectGoal.trim()) return;

    // Découpage automatique simulé en 5 étapes universelles de moins de 15 minutes
    const steps: SubTask[] = [
      { id: 's1', text: `Étape 1 : Lister par écrit l'architecture minimale pour "${projectGoal}"`, completed: false },
      { id: 's2', text: `Étape 2 : Configurer l'environnement ou créer le fichier initial`, completed: false },
      { id: 's3', text: `Étape 3 : Coder/Maquetter le squelette brut (V1 ultra simplifiée)`, completed: false },
      { id: 's4', text: `Étape 4 : Tester le premier flux et corriger l'erreur majeure`, completed: false },
      { id: 's5', text: `Étape 5 : Préparer la liste des prochaines fonctionnalités`, completed: false },
    ];
    setSubTasks(steps);
    setPlannedCount(prev => prev + 5);
  };

  const toggleSubTask = (id: string) => {
    setSubTasks(subTasks.map(s => {
      if (s.id === id) {
        const nextState = !s.completed;
        setCompletedCount(prev => nextState ? prev + 1 : prev - 1);
        return { ...s, completed: nextState };
      }
      return s;
    }));
  };

  // --- 6. SUIVI DES TÂCHES RÉCURRENTES (Hebdomadaires) ---
  const [routines, setRoutines] = useState([
    { id: '1', day: 'Dimanche', title: 'Faire les comptes 🧾', done: false },
    { id: '2', day: 'Vendredi', title: 'Sauvegarder le code (Git Push) 💾', done: true },
    { id: '3', day: 'Lundi', title: 'Planifier la semaine 📅', done: false },
  ]);

  const toggleRoutine = (id: string) => {
    setRoutines(routines.map(r => r.id === id ? { ...r, done: !r.done } : r));
  };

  // --- 7. MODE "BROUILLON" POUR LES IDÉES (Cache pendant 48h) ---
  const [drafts, setDrafts] = useState<DraftIdea[]>([
    { id: 'd1', text: 'Créer un SaaS de gestion de potager connecté', createdAt: Date.now() - 172800000 }, // Créé il y a 48h
    { id: 'd2', text: 'Refaire mon portfolio en 3D avec Three.js', createdAt: Date.now() - 3600000 }, // Créé il y a 1h
  ]);
  const [newDraft, setNewDraft] = useState('');

  const handleAddDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDraft.trim()) return;
    const item: DraftIdea = {
      id: Date.now().toString(),
      text: newDraft,
      createdAt: Date.now(),
    };
    setDrafts([item, ...drafts]);
    setNewDraft('');
  };

  const isUnlocked = (createdAt: number) => {
    const fortyEightHours = 48 * 60 * 60 * 1000;
    return Date.now() - createdAt >= fortyEightHours;
  };

  // --- 8. COMPTEUR DE NON-INTERRUPTION (Focus Timer) ---
  const [focusMinutes, setFocusMinutes] = useState(0);
  const [isFocusing, setIsFocusing] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isFocusing) {
      interval = setInterval(() => {
        setFocusMinutes(prev => prev + 1);
      }, 60000); // Incrémente toutes les minutes
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isFocusing]);

  // --- 9. BILAN DE FIN DE SEMAINE (Dimanche soir) ---
  const [bilanAnswers, setBilanAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [bilanSubmitted, setBilanSubmitted] = useState(false);

  const handleBilanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBilanSubmitted(true);
    alert("📝 Bilan de semaine enregistré ! Continue ainsi.");
  };

  return (
    <div className="pt-4 px-4 max-w-md mx-auto space-y-6 pb-20">
      
      {/* En-tête de la page */}
      <div>
        <h1 className="text-3xl font-black text-[#1d3557] dark:text-[#e2e8f0]">Dashboard Productivité</h1>
        <p className="text-sm text-gray-400 mt-1">Gère ta concentration et organise tes journées</p>
      </div>

      {/* 1. INDICE DE PRODUCTIVITÉ RÉEL */}
      <Card className="bg-gradient-to-br from-[#1d3557] to-[#2a9d8f] text-white">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">Indice de Productivité Réel</h3>
            <p className="text-xs opacity-85 mt-1">{completedCount} tâches complétées sur {plannedCount} prévues</p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-black">{productivityRatio}%</span>
            <p className="text-[10px] uppercase tracking-wider opacity-75">Efficacité</p>
          </div>
        </div>
      </Card>

      {/* 2. COMPTEUR DE NON-INTERRUPTION */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">⏱️</span>
            <div>
              <h3 className="text-sm font-bold text-[#1d3557] dark:text-[#e2e8f0]">Travail Ininterrompu</h3>
              <p className="text-[10px] text-gray-400">Temps de code non-interrompu</p>
            </div>
          </div>
          <span className="text-lg font-black text-[#2a9d8f]">{focusMinutes} min</span>
        </div>
        <Button 
          variant={isFocusing ? "secondary" : "primary"} 
          className="w-full !py-2 text-xs font-bold" 
          onClick={() => setIsFocusing(!isFocusing)}
        >
          {isFocusing ? "Mettre en pause le Focus" : "Démarrer une session Focus"}
        </Button>
      </Card>

      {/* 3. MÉTHODE IVY LEE & CALCULATEUR DE FRICTION */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📝</span>
          <div>
            <h3 className="text-base font-bold text-[#1d3557] dark:text-[#e2e8f0]">Ivy Lee (Max 6 tâches)</h3>
            <p className="text-xs text-gray-400">Classées automatiquement par ordre de friction</p>
          </div>
        </div>

        <form onSubmit={handleAddIvyTask} className="space-y-3 mb-4">
          <input 
            type="text" 
            placeholder="Intitulé de la tâche..."
            value={newIvyText}
            onChange={(e) => setNewIvyText(e.target.value)}
            className="w-full p-2.5 bg-gray-50 dark:bg-[#0f1419] border border-gray-100 dark:border-gray-700/50 rounded-xl text-xs font-semibold text-[#1d3557] dark:text-[#e2e8f0] outline-none"
          />
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                Friction de démarrage : <span className="text-[#2a9d8f]">{newFriction}/5</span>
              </label>
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={newFriction}
                onChange={(e) => setNewFriction(Number(e.target.value))}
                className="w-full accent-[#2a9d8f] cursor-pointer h-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg"
              />
            </div>
            <Button type="submit" variant="primary" className="!py-2 !px-4 text-xs font-bold shrink-0">
              Ajouter ({ivyTasks.length}/6)
            </Button>
          </div>
        </form>

        <div className="space-y-2">
          {ivyTasks.map((task) => (
            <div 
              key={task.id} 
              onClick={() => toggleIvyTask(task.id)}
              className={`flex items-center justify-between p-2.5 bg-gray-50/50 dark:bg-[#0f1419]/40 border border-gray-100/50 dark:border-gray-800/30 rounded-xl cursor-pointer ${
                task.completed ? 'opacity-40' : ''
              }`}
            >
              <span className={`text-xs font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-[#1d3557] dark:text-[#e2e8f0]'}`}>
                {task.text}
              </span>
              <span className="text-[10px] font-extrabold bg-red-50 dark:bg-red-950/20 text-red-500 px-2 py-0.5 rounded-full">
                Friction: {task.friction}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* 4. DÉCOUPEUR DE PROJETS */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">✂️</span>
          <div>
            <h3 className="text-base font-bold text-[#1d3557] dark:text-[#e2e8f0]">Découpeur en 5 Étapes</h3>
            <p className="text-xs text-gray-400">Divise un objectif lourd en sessions de &lt;15 min</p>
          </div>
        </div>

        <form onSubmit={handleSplitProject} className="flex gap-2 mb-4">
          <input 
            type="text" 
            placeholder="Ex: Refondre la landing page"
            value={projectGoal}
            onChange={(e) => setProjectGoal(e.target.value)}
            className="flex-1 p-2 bg-gray-50 dark:bg-[#0f1419] border border-gray-100 dark:border-gray-700/50 rounded-xl text-xs font-semibold text-[#1d3557] dark:text-[#e2e8f0] outline-none"
          />
          <Button type="submit" variant="primary" className="text-xs font-bold">Découper</Button>
        </form>

        {subTasks.length > 0 && (
          <div className="space-y-2 bg-gray-50/40 dark:bg-gray-800/10 p-3 rounded-2xl border border-gray-100 dark:border-gray-800/50">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Plan d'Action Immédiat :</p>
            {subTasks.map((step) => (
              <div 
                key={step.id} 
                onClick={() => toggleSubTask(step.id)}
                className="flex items-center gap-2.5 cursor-pointer py-1"
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                  step.completed ? 'bg-[#2a9d8f] border-[#2a9d8f]' : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {step.completed && <span className="text-white text-[10px]">✓</span>}
                </div>
                <span className={`text-xs ${step.completed ? 'line-through text-gray-400' : 'text-[#1d3557] dark:text-[#e2e8f0] font-medium'}`}>
                  {step.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* 5. TIME-BOXING VISUEL */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📅</span>
          <div>
            <h3 className="text-base font-bold text-[#1d3557] dark:text-[#e2e8f0]">Time-Boxing Visuel</h3>
            <p className="text-xs text-gray-400">Verrouille tes heures thématiques</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <select 
            value={selectedHour}
            onChange={(e) => setSelectedHour(e.target.value)}
            className="p-2 bg-gray-50 dark:bg-[#0f1419] border border-gray-100 dark:border-gray-700/50 rounded-xl text-xs font-bold text-[#1d3557] dark:text-[#e2e8f0]"
          >
            <option value="08:00 - 09:00">08:00 - 09:00</option>
            <option value="09:00 - 10:00">09:00 - 10:00</option>
            <option value="10:00 - 11:00">10:00 - 11:00</option>
            <option value="11:00 - 12:00">11:00 - 12:00</option>
            <option value="14:00 - 15:00">14:00 - 15:00</option>
            <option value="15:00 - 16:00">15:00 - 16:00</option>
          </select>

          <select 
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="p-2 bg-gray-50 dark:bg-[#0f1419] border border-gray-100 dark:border-gray-700/50 rounded-xl text-xs font-bold text-[#1d3557] dark:text-[#e2e8f0]"
          >
            <option value="Focus Code 💻">Focus Code 💻</option>
            <option value="Sport & Cardio 🏃‍♂️">Sport & Cardio 🏃‍♂️</option>
            <option value="Lecture technique 📚">Lecture technique 📚</option>
            <option value="Gestion administrative 🧾">Gestion administrative 🧾</option>
          </select>
        </div>
        <Button onClick={handleAddTimeBox} variant="primary" className="w-full !py-2 text-xs font-bold mb-4">
          Bloquer le créneau
        </Button>

        <div className="space-y-1.5 border-l-2 border-[#2a9d8f] pl-3">
          {timeBoxes.map((box, i) => (
            <div key={i} className="flex justify-between items-center text-xs py-1">
              <span className="font-bold text-gray-400">{box.hour}</span>
              <span className="font-semibold text-[#1d3557] dark:text-[#e2e8f0]">{box.theme}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 6. MODE "BROUILLON" POUR LES IDÉES (Anti-Éparpillement 48h) */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">⏳</span>
          <div>
            <h3 className="text-base font-bold text-[#1d3557] dark:text-[#e2e8f0]">Brouillon Idées (Anti-Dispersion)</h3>
            <p className="text-xs text-gray-400">Garde tes nouvelles idées sous clé pendant 48 heures</p>
          </div>
        </div>

        <form onSubmit={handleAddDraft} className="flex gap-2 mb-4">
          <input 
            type="text" 
            placeholder="Nouvelle idée géniale..."
            value={newDraft}
            onChange={(e) => setNewDraft(e.target.value)}
            className="flex-1 p-2 bg-gray-50 dark:bg-[#0f1419] border border-gray-100 dark:border-gray-700/50 rounded-xl text-xs font-semibold text-[#1d3557] dark:text-[#e2e8f0] outline-none"
          />
          <Button type="submit" variant="primary" className="text-xs font-bold">Incuber</Button>
        </form>

        <div className="space-y-2">
          {drafts.map((draft) => {
            const open = isUnlocked(draft.createdAt);
            return (
              <div 
                key={draft.id} 
                className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                  open 
                    ? 'bg-emerald-50/20 dark:bg-emerald-950/10 border-emerald-500/20 text-emerald-600' 
                    : 'bg-gray-50 dark:bg-[#0f1419]/40 border-gray-100 dark:border-gray-800/50 text-gray-400'
                }`}
              >
                <div className="flex-1 pr-2">
                  <p className="font-semibold">{open ? draft.text : "🔒 Idée en période de décantation (Masquée)"}</p>
                  <p className="text-[9px] mt-0.5">
                    {open ? "✅ Prête à être traitée !" : "Révélée dans moins de 48 heures"}
                  </p>
                </div>
                {open && (
                  <button 
                    onClick={() => {
                      setIvyTasks([...ivyTasks, { id: Date.now().toString(), text: draft.text, completed: false, friction: 3 }]);
                      setDrafts(drafts.filter(d => d.id !== draft.id));
                    }}
                    className="text-[10px] font-black bg-emerald-500 text-white px-2 py-1 rounded-lg hover:bg-emerald-600"
                  >
                    Activer
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* 7. SUIVI DES TÂCHES RÉCURRENTES */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🔄</span>
          <div>
            <h3 className="text-base font-bold text-[#1d3557] dark:text-[#e2e8f0]">Routines Hebdomadaires</h3>
            <p className="text-xs text-gray-400">Automatise tes habitudes cruciales</p>
          </div>
        </div>

        <div className="space-y-2">
          {routines.map((r) => (
            <div 
              key={r.id}
              onClick={() => toggleRoutine(r.id)}
              className="flex items-center justify-between p-2.5 bg-gray-50/50 dark:bg-gray-800/10 rounded-xl cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-200/50 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                  {r.day}
                </span>
                <span className={`text-xs font-semibold ${r.done ? 'line-through text-gray-400' : 'text-[#1d3557] dark:text-[#e2e8f0]'}`}>
                  {r.title}
                </span>
              </div>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                r.done ? 'bg-[#2a9d8f] border-[#2a9d8f]' : 'border-gray-300'
              }`}>
                {r.done && <span className="text-white text-[10px]">✓</span>}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 8. NETTOYAGE DE FIN DE JOURNÉE (18h) */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🧹</span>
          <div>
            <h3 className="text-base font-bold text-[#1d3557] dark:text-[#e2e8f0]">Nettoyage de Fin de Journée (18:00)</h3>
            <p className="text-xs text-gray-400">Ferme ton espace de travail proprement</p>
          </div>
        </div>

        <div className="space-y-2">
          {cleanupChecks.map((check) => (
            <div 
              key={check.id}
              onClick={() => toggleCleanup(check.id)}
              className="flex items-center justify-between p-2.5 bg-[#e2e8f0]/10 dark:bg-gray-800/10 rounded-xl cursor-pointer"
            >
              <span className={`text-xs font-medium ${check.checked ? 'line-through text-gray-400 opacity-60' : 'text-[#1d3557] dark:text-[#e2e8f0]'}`}>
                {check.text}
              </span>
              <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                check.checked ? 'bg-[#2a9d8f] border-[#2a9d8f]' : 'border-gray-300'
              }`}>
                {check.checked && <span className="text-white text-[10px]">✓</span>}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 9. BILAN DE FIN DE SEMAINE */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">📊</span>
          <div>
            <h3 className="text-base font-bold text-[#1d3557] dark:text-[#e2e8f0]">Bilan de Fin de Semaine</h3>
            <p className="text-xs text-gray-400">Dimanche soir - Prise de recul</p>
          </div>
        </div>

        {bilanSubmitted ? (
          <div className="bg-[#2a9d8f]/10 p-4 rounded-xl border border-[#2a9d8f]/30 text-center text-xs text-[#2a9d8f] font-bold">
            🎉 Bravo ! Bilan complété avec succès pour cette semaine.
          </div>
        ) : (
          <form onSubmit={handleBilanSubmit} className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                1. Qu'est-ce qui a très bien fonctionné cette semaine ?
              </label>
              <textarea 
                rows={2} 
                required
                value={bilanAnswers.q1}
                onChange={(e) => setBilanAnswers({ ...bilanAnswers, q1: e.target.value })}
                className="w-full p-2 bg-gray-50 dark:bg-[#0f1419] border border-gray-100 dark:border-gray-700/50 rounded-xl text-xs font-medium text-[#1d3557] dark:text-[#e2e8f0] outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                2. Quels ont été mes plus grands bloqueurs ou distractions ?
              </label>
              <textarea 
                rows={2} 
                required
                value={bilanAnswers.q2}
                onChange={(e) => setBilanAnswers({ ...bilanAnswers, q2: e.target.value })}
                className="w-full p-2 bg-gray-50 dark:bg-[#0f1419] border border-gray-100 dark:border-gray-700/50 rounded-xl text-xs font-medium text-[#1d3557] dark:text-[#e2e8f0] outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                3. Quelle micro-action concrète vais-je mettre en place demain ?
              </label>
              <textarea 
                rows={2} 
                required
                value={bilanAnswers.q3}
                onChange={(e) => setBilanAnswers({ ...bilanAnswers, q3: e.target.value })}
                className="w-full p-2 bg-gray-50 dark:bg-[#0f1419] border border-gray-100 dark:border-gray-700/50 rounded-xl text-xs font-medium text-[#1d3557] dark:text-[#e2e8f0] outline-none"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full !py-2 text-xs font-bold">
              Enregistrer le Bilan
            </Button>
          </form>
        )}
      </Card>

    </div>
  );
}