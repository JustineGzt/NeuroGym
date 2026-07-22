import React, { useState } from 'react';
import { Card } from './Card';

// 1. TYPES & STRUCTURES
type TimeSlot = '08:00' | '10:00' | '12:00' | '14:00' | '16:00' | '18:00' | '20:00';
type Category = 'health' | 'work' | 'learning' | 'personal';
type EnergyLevel = 'low' | 'medium' | 'high';

interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

interface CalendarEvent {
  id: string;
  dateKey: string; // Format "YYYY-MM-DD" ou "RECURRING"
  title: string;
  slot: TimeSlot;
  category: Category;
  energy: EnergyLevel;
  durationMin: number; // 30, 60, 90, 120 min
  completed: boolean;
  isRecurring: boolean; // True = Routine présente chaque jour
  notes?: string;
  subtasks: SubTask[];
}

const CATEGORY_STYLES: Record<Category, { name: string; bg: string; border: string; text: string; dot: string }> = {
  work: { name: 'Travail', bg: 'bg-blue-500/10 dark:bg-blue-950/40', border: 'border-blue-500/30', text: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-500' },
  health: { name: 'Santé', bg: 'bg-emerald-500/10 dark:bg-emerald-950/40', border: 'border-emerald-500/30', text: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
  learning: { name: 'Apprentissage', bg: 'bg-amber-500/10 dark:bg-amber-950/40', border: 'border-amber-500/30', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
  personal: { name: 'Perso', bg: 'bg-purple-500/10 dark:bg-purple-950/40', border: 'border-purple-500/30', text: 'text-purple-600 dark:text-purple-400', dot: 'bg-purple-500' },
};

const ENERGY_ICONS: Record<EnergyLevel, string> = {
  low: '🟢',
  medium: '🟡',
  high: '🔴',
};

const TIME_SLOTS: TimeSlot[] = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

export default function CompleteCalendarScreen() {
  // DATE DU JOUR (Fixée pour la démo, adaptable dynamiquement)
  const todayKey = '2026-07-21';
  const [selectedDateKey, setSelectedDateKey] = useState<string>(todayKey);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  // ÉTATS DE LA MODALE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetSlot, setTargetSlot] = useState<TimeSlot>('08:00');
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState<Category>('work');
  const [eventEnergy, setEventEnergy] = useState<EnergyLevel>('medium');
  const [eventDuration, setEventDuration] = useState<number>(60);
  const [eventIsRecurring, setEventIsRecurring] = useState(false);
  const [eventNotes, setEventNotes] = useState('');
  const [subtaskInput, setSubtaskInput] = useState('');
  const [tempSubtasks, setTempSubtasks] = useState<string[]>([]);

  // BASE DE DONNÉES DES ÉVÉNEMENTS
  const [events, setEvents] = useState<CalendarEvent[]>([
    // Routine quotidienne (apparaît tous les jours)
    { 
      id: 'r1', 
      dateKey: 'RECURRING', 
      title: 'Méditation & Routine Hydratation', 
      slot: '08:00', 
      category: 'health', 
      energy: 'low', 
      durationMin: 30, 
      completed: true, 
      isRecurring: true, 
      subtasks: [] 
    },
    // Événements spécifiques pour aujourd'hui
    { 
      id: 'e1', 
      dateKey: '2026-07-21', 
      title: 'Deep Work Architecture React', 
      slot: '10:00', 
      category: 'work', 
      energy: 'high', 
      durationMin: 90, 
      completed: false, 
      isRecurring: false, 
      notes: 'Finir les composants UI du calendrier',
      subtasks: [
        { id: 'st1', title: 'Corriger les imports', completed: true },
        { id: 'st2', title: 'Ajouter le drag & drop', completed: false }
      ] 
    },
    { 
      id: 'e2', 
      dateKey: '2026-07-21', 
      title: 'Séance de Sport / Musculation', 
      slot: '16:00', 
      category: 'health', 
      energy: 'high', 
      durationMin: 60, 
      completed: false, 
      isRecurring: false, 
      subtasks: [] 
    },
    // Événement pour demain
    { 
      id: 'e3', 
      dateKey: '2026-07-22', 
      title: 'Sprint Review & Mails Clients', 
      slot: '14:00', 
      category: 'work', 
      energy: 'medium', 
      durationMin: 60, 
      completed: false, 
      isRecurring: false, 
      subtasks: [] 
    },
  ]);

  // SEMAINE DYNAMIQUE DE DÉMO
  const weekDays = [
    { label: 'Lun', dateNum: 20, key: '2026-07-20' },
    { label: 'Mar', dateNum: 21, key: '2026-07-21' },
    { label: 'Mer', dateNum: 22, key: '2026-07-22' },
    { label: 'Jeu', dateNum: 23, key: '2026-07-23' },
    { label: 'Ven', dateNum: 24, key: '2026-07-24' },
    { label: 'Sam', dateNum: 25, key: '2026-07-25' },
    { label: 'Dim', dateNum: 26, key: '2026-07-26' },
  ];

  // FILTRAGE : Événements du jour sélectionné + Routines
  const currentDayEvents = events.filter(
    e => e.dateKey === selectedDateKey || e.isRecurring
  );

  // CALCUL DE LA PROGRESSION & CHARGE DU JOUR
  const totalTasks = currentDayEvents.length;
  const completedTasks = currentDayEvents.filter(e => e.completed).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const highEnergyCount = currentDayEvents.filter(e => e.energy === 'high').length;

  // GESTION DES ACTIONS
  const toggleComplete = (id: string) => {
    setEvents(events.map(ev => ev.id === id ? { ...ev, completed: !ev.completed } : ev));
  };

  const toggleSubtask = (eventId: string, subtaskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEvents(events.map(ev => {
      if (ev.id !== eventId) return ev;
      return {
        ...ev,
        subtasks: ev.subtasks.map(st => st.id === subtaskId ? { ...st, completed: !st.completed } : st)
      };
    }));
  };

  const deleteEvent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEvents(events.filter(ev => ev.id !== id));
  };

  // REPORT AU LENDEMAIN (ROLLOVER)
  const rolloverTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = weekDays.findIndex(w => w.key === selectedDateKey);
    const nextDayKey = weekDays[currentIndex + 1]?.key || '2026-07-27';

    setEvents(events.map(ev => ev.id === id ? { ...ev, dateKey: nextDayKey, isRecurring: false } : ev));
  };

  // DRAG & DROP
  const handleDragStart = (id: string) => setDraggedItemId(id);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (slot: TimeSlot) => {
    if (!draggedItemId) return;
    setEvents(events.map(ev => ev.id === draggedItemId ? { ...ev, slot } : ev));
    setDraggedItemId(null);
  };

  // AJOUT DE SOUS-TÂCHES DANS LE FORMULAIRE
  const addTempSubtask = () => {
    if (!subtaskInput.trim()) return;
    setTempSubtasks([...tempSubtasks, subtaskInput.trim()]);
    setSubtaskInput('');
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      dateKey: eventIsRecurring ? 'RECURRING' : selectedDateKey,
      title: eventTitle,
      slot: targetSlot,
      category: eventCategory,
      energy: eventEnergy,
      durationMin: eventDuration,
      completed: false,
      isRecurring: eventIsRecurring,
      notes: eventNotes,
      subtasks: tempSubtasks.map((st, idx) => ({ id: `${idx}`, title: st, completed: false }))
    };

    setEvents([...events, newEvent]);
    setIsModalOpen(false);
    setTempSubtasks([]);
  };

  const openAddModal = (slot: TimeSlot) => {
    setTargetSlot(slot);
    setEventTitle('');
    setEventNotes('');
    setTempSubtasks([]);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-2 space-y-5 pb-24 max-w-md mx-auto">
      {/* EN-TÊTE & BOUTON AUJOURD'HUI */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs font-bold tracking-wider text-[#2a9d8f] uppercase">Planning Temps Réel</p>
          <h1 className="text-3xl font-black text-[#1d3557] dark:text-[#e2e8f0]">Calendrier</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSelectedDateKey(todayKey)}
            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl text-xs font-black hover:bg-gray-200 transition-all"
          >
            Aujourd'hui
          </button>
          <button 
            onClick={() => openAddModal('08:00')}
            className="p-2.5 bg-[#1d3557] dark:bg-[#2a9d8f] text-white rounded-xl font-black shadow-md hover:scale-105 active:scale-95 transition-all text-sm"
          >
            ＋
          </button>
        </div>
      </div>

      {/* STRIP DE SEMAINE AVEC DATES RÉELLES */}
      <div className="flex justify-between gap-1 p-1 bg-gray-100 dark:bg-gray-800/60 rounded-2xl">
        {weekDays.map(item => {
          const isSelected = selectedDateKey === item.key;
          const isToday = item.key === todayKey;

          return (
            <button
              key={item.key}
              onClick={() => setSelectedDateKey(item.key)}
              className={`flex-1 py-2 rounded-xl flex flex-col items-center transition-all ${
                isSelected 
                  ? 'bg-[#2a9d8f] text-white shadow-md font-black scale-[1.02]' 
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
            >
              <span className="text-[9px] uppercase tracking-wider">{item.label}</span>
              <span className="text-xs font-black relative">
                {item.dateNum}
                {isToday && !isSelected && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#2a9d8f] rounded-full" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* BARRE DE PROGRESSION & INDICATEUR D'ÉNERGIE */}
      <Card className="p-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900/40 dark:to-gray-800/20 border border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#1d3557] dark:text-[#e2e8f0]">Progression du jour</span>
            {highEnergyCount >= 2 && (
              <span className="text-[9px] bg-red-500/10 text-red-500 font-bold px-1.5 py-0.5 rounded-full">
                🔴 Énergie haute
              </span>
            )}
          </div>
          <span className="text-xs font-black text-[#2a9d8f]">{progressPercent}% ({completedTasks}/{totalTasks})</span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
          <div className="bg-[#2a9d8f] h-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>
      </Card>

      {/* TIMELINE HORAIRE & CARTES À HAUTEUR DYNAMIQUE */}
      <Card className="p-3 space-y-3">
        {TIME_SLOTS.map(slot => {
          const slotEvents = currentDayEvents.filter(e => e.slot === slot);

          return (
            <div 
              key={slot}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(slot)}
              className="flex gap-3 group border-b border-gray-100 dark:border-gray-800/60 pb-3 last:border-0 last:pb-0"
            >
              {/* Horodateur */}
              <div className="w-12 text-right shrink-0 pt-0.5">
                <span className="text-xs font-black text-gray-400 font-mono">{slot}</span>
              </div>

              {/* Zone de drop */}
              <div className="flex-1 min-h-[48px] rounded-xl p-1 space-y-2 bg-gray-50/40 dark:bg-gray-900/20 border border-transparent hover:border-gray-200 dark:hover:border-gray-800">
                {slotEvents.map(ev => {
                  const catStyle = CATEGORY_STYLES[ev.category];
                  
                  // Calcul de la hauteur dynamique selon la durée
                  const minHeightClass = ev.durationMin >= 90 ? 'min-h-[90px]' : ev.durationMin >= 60 ? 'min-h-[65px]' : 'min-h-[45px]';

                  return (
                    <div
                      key={ev.id}
                      draggable
                      onDragStart={() => handleDragStart(ev.id)}
                      onClick={() => toggleComplete(ev.id)}
                      className={`p-2.5 rounded-xl border ${catStyle.bg} ${catStyle.border} ${minHeightClass} cursor-grab active:cursor-grabbing transition-all shadow-sm flex flex-col justify-between`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={`w-2 h-2 rounded-full shrink-0 ${catStyle.dot}`} />
                            <span className={`text-xs font-bold truncate ${ev.completed ? 'line-through text-gray-400' : 'text-[#1d3557] dark:text-[#e2e8f0]'}`}>
                              {ev.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {/* Bouton Rollover (Reporter au lendemain) */}
                            {!ev.completed && !ev.isRecurring && (
                              <button 
                                onClick={(e) => rolloverTask(ev.id, e)}
                                title="Reporter au lendemain"
                                className="text-[10px] bg-white/60 dark:bg-gray-800/60 hover:bg-gray-100 px-1.5 py-0.5 rounded border text-gray-500 font-bold"
                              >
                                ➔ Demain
                              </button>
                            )}
                            <button 
                              onClick={(e) => deleteEvent(ev.id, e)}
                              className="text-gray-400 hover:text-rose-500 text-xs px-1"
                            >
                              ✕
                            </button>
                          </div>
                        </div>

                        {ev.notes && (
                          <p className="text-[10px] text-gray-400 italic pl-4 mt-1 line-clamp-1">{ev.notes}</p>
                        )}

                        {/* LISTE DES SOUS-TÂCHES */}
                        {ev.subtasks.length > 0 && (
                          <div className="pl-4 mt-2 space-y-1">
                            {ev.subtasks.map(st => (
                              <div 
                                key={st.id} 
                                onClick={(e) => toggleSubtask(ev.id, st.id, e)}
                                className="flex items-center gap-1.5 text-[10px] text-gray-500 cursor-pointer"
                              >
                                <span className={`w-3 h-3 rounded flex items-center justify-center border text-[8px] ${
                                  st.completed ? 'bg-[#2a9d8f] border-[#2a9d8f] text-white' : 'border-gray-300'
                                }`}>
                                  {st.completed && '✓'}
                                </span>
                                <span className={st.completed ? 'line-through text-gray-400' : ''}>{st.title}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* PIED DE LA CARTE */}
                      <div className="flex justify-between items-center pt-2 text-[9px] text-gray-400 border-t border-black/5 dark:border-white/5 mt-2">
                        <div className="flex items-center gap-1.5">
                          <span>{ENERGY_ICONS[ev.energy]}</span>
                          <span>{ev.durationMin} min</span>
                          {ev.isRecurring && <span className="font-extrabold text-[#2a9d8f]">🔄 Routine</span>}
                        </div>
                        <span className={`font-black uppercase ${catStyle.text}`}>{catStyle.name}</span>
                      </div>
                    </div>
                  );
                })}

                {slotEvents.length === 0 && (
                  <button 
                    onClick={() => openAddModal(slot)}
                    className="w-full h-full text-left pl-2 text-[11px] text-gray-300 dark:text-gray-600 hover:text-[#2a9d8f] font-medium transition-colors py-1"
                  >
                    + Cliquer pour planifier à {slot}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </Card>

      {/* MODAL DE SAISIE */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm space-y-3 bg-white dark:bg-[#151c24] border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center border-b pb-2 dark:border-gray-800">
              <h3 className="text-sm font-black text-[#1d3557] dark:text-[#e2e8f0]">
                Ajouter à <span className="text-[#2a9d8f] font-mono">{targetSlot}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Titre de la tâche</label>
                <input 
                  type="text" 
                  placeholder="Ex: Code, Sport, Lecture..."
                  value={eventTitle}
                  onChange={e => setEventTitle(e.target.value)}
                  className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#0f1419] border border-gray-200 dark:border-gray-800 rounded-xl text-xs outline-none"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Catégorie</label>
                  <select 
                    value={eventCategory}
                    onChange={e => setEventCategory(e.target.value as Category)}
                    className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#0f1419] border border-gray-200 dark:border-gray-800 rounded-xl text-xs outline-none"
                  >
                    <option value="work">Travail</option>
                    <option value="health">Santé</option>
                    <option value="learning">Apprentissage</option>
                    <option value="personal">Perso</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Durée</label>
                  <select 
                    value={eventDuration}
                    onChange={e => setEventDuration(Number(e.target.value))}
                    className="w-full mt-1 p-2 bg-gray-50 dark:bg-[#0f1419] border border-gray-200 dark:border-gray-800 rounded-xl text-xs outline-none"
                  >
                    <option value={30}>30 min</option>
                    <option value={60}>1 heure</option>
                    <option value={90}>1h 30min</option>
                    <option value={120}>2 heures</option>
                  </select>
                </div>
              </div>

              {/* SOUS-TÂCHES */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Checklist / Sous-tâches</label>
                <div className="flex gap-1 mt-1">
                  <input 
                    type="text" 
                    placeholder="Étape 1..."
                    value={subtaskInput}
                    onChange={e => setSubtaskInput(e.target.value)}
                    className="flex-1 p-1.5 bg-gray-50 dark:bg-[#0f1419] border border-gray-200 dark:border-gray-800 rounded-lg text-xs outline-none"
                  />
                  <button 
                    type="button" 
                    onClick={addTempSubtask}
                    className="px-3 bg-gray-200 dark:bg-gray-700 text-xs font-bold rounded-lg"
                  >
                    +
                  </button>
                </div>
                {tempSubtasks.length > 0 && (
                  <ul className="mt-2 space-y-1 pl-2 text-[11px] text-gray-500 list-disc">
                    {tempSubtasks.map((st, i) => <li key={i}>{st}</li>)}
                  </ul>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={eventIsRecurring}
                    onChange={e => setEventIsRecurring(e.target.checked)}
                  />
                  Routine quotidienne (🔄)
                </label>

                <button 
                  type="submit" 
                  className="px-4 py-1.5 bg-[#2a9d8f] text-white font-bold rounded-xl text-xs shadow"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}