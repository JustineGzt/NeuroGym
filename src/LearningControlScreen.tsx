import { useState } from 'react';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';

interface VocabTerm {
  id: string;
  term: string;
  definition: string;
  learned: boolean;
}

export default function LearningControlScreen() {
  const [currentBook, setCurrentBook] = useState('Clean Code');
  const [pagesRead, setPagesRead] = useState(112);
  const totalPages = 430;
  const bookProgress = Math.round((pagesRead / totalPages) * 100);
  const [streak, setStreak] = useState(14);
  const [dailyMinutes] = useState(25);
  const [sessionActive, setSessionActive] = useState(false);

  const [vocabTerms, setVocabTerms] = useState<VocabTerm[]>([
    { id: '1', term: 'Polymorphism', definition: 'Capacité d\'un objet à prendre plusieurs formes.', learned: true },
    { id: '2', term: 'Recursion', definition: 'Fonction qui s\'appelle elle-même.', learned: true },
    { id: '3', term: 'Closure', definition: 'Fonction qui garde accès à son scope lexical.', learned: false },
    { id: '4', term: 'Memoization', definition: 'Cache des résultats pour éviter les recalculs.', learned: false },
    { id: '5', term: 'Idempotent', definition: 'Opération répétable sans effet secondaire.', learned: false },
  ]);

  const learnedCount = vocabTerms.filter((t) => t.learned).length;

  const toggleTerm = (id: string) => {
    setVocabTerms(vocabTerms.map((t) => (t.id === id ? { ...t, learned: !t.learned } : t)));
  };

  const handleAddPages = () => {
    const input = window.prompt('Combien de pages as-tu lu aujourd\'hui ?', '10');
    if (!input) return;
    const added = Number(input);
    if (Number.isNaN(added) || added <= 0) return;
    setPagesRead((prev) => Math.min(prev + added, totalPages));
    setStreak((prev) => prev + 1);
  };

  return (
    <div className="pt-4 px-4 max-w-md mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-3xl font-black text-[#1d3557] dark:text-[#e2e8f0]">Apprentissage</h1>
        <p className="text-sm text-gray-400 mt-1">Évoluer, mémoriser et rester régulier</p>
      </div>

      <Card className="bg-gradient-to-br from-orange-500 to-[#1d3557] text-white">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-lg font-bold">Série en cours</h3>
            <p className="text-xs opacity-85 mt-1">🔥 {streak} jours consécutifs</p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-black">{dailyMinutes}m</span>
            <p className="text-[10px] uppercase tracking-wider opacity-75">Objectif du jour</p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📖</span>
          <div>
            <h3 className="text-base font-bold text-[#1d3557] dark:text-[#e2e8f0]">Lecture en cours</h3>
            <p className="text-xs text-gray-400">{currentBook}</p>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
            <span>{pagesRead} / {totalPages} pages</span>
            <span className="text-[#2a9d8f]">{bookProgress}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div className="bg-[#2a9d8f] h-full rounded-full transition-all" style={{ width: `${bookProgress}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button type="button" variant="primary" className="!py-2 text-xs font-bold" onClick={handleAddPages}>
            + Pages lues
          </Button>
          <select
            value={currentBook}
            onChange={(e) => setCurrentBook(e.target.value)}
            className="p-2 bg-gray-50 dark:bg-[#0f1419] border border-gray-100 dark:border-gray-700/50 rounded-xl text-xs font-bold text-[#1d3557] dark:text-[#e2e8f0] outline-none"
          >
            <option value="Clean Code">Clean Code</option>
            <option value="Atomic Habits">Atomic Habits</option>
            <option value="Deep Work">Deep Work</option>
          </select>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧠</span>
            <div>
              <h3 className="text-base font-bold text-[#1d3557] dark:text-[#e2e8f0]">Défi vocabulaire</h3>
              <p className="text-xs text-gray-400">{learnedCount} / {vocabTerms.length} termes maîtrisés</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {vocabTerms.map((term) => (
            <div
              key={term.id}
              onClick={() => toggleTerm(term.id)}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                term.learned
                  ? 'bg-[#2a9d8f]/10 border-[#2a9d8f]/30 opacity-70'
                  : 'bg-gray-50 dark:bg-[#0f1419]/40 border-gray-100 dark:border-gray-800/50'
              }`}
            >
              <p className={`text-xs font-bold ${term.learned ? 'line-through text-gray-400' : 'text-[#1d3557] dark:text-[#e2e8f0]'}`}>
                {term.term}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">{term.definition}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div className="bg-orange-500 h-full rounded-full" style={{ width: `${(learnedCount / vocabTerms.length) * 100}%` }} />
          </div>
          <span className="text-xs font-bold text-gray-400">{learnedCount} / {vocabTerms.length}</span>
        </div>

        <Button
          variant={sessionActive ? 'secondary' : 'primary'}
          className="w-full !py-2 text-xs font-bold"
          onClick={() => setSessionActive(!sessionActive)}
        >
          {sessionActive ? 'Pause session d\'apprentissage' : 'Démarrer une session de 25 min'}
        </Button>
      </Card>
    </div>
  );
}
