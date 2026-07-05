import { useState } from 'react';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { MoodSelector } from './components/MoodSelector';

export default function JournalScreen() {
  const [text, setText] = useState("");

  // Récupère automatiquement la date du jour au format français (ex: "5 juillet 2026")
  const todayFormatted = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Simulation de données (Idéalement à traduire ou à dynamiser plus tard via une API/Base de données)
  const pastReflections = [
    { date: "24 juin 2026", tag: "Concentré", icon: "🎯", preview: "Aujourd'hui, j'ai enfin compris la récursion..." },
    { date: "23 juin 2026", tag: "Reconnaissant", icon: "🙏", preview: "J'ai raté ma présentation mais j'ai appris..." },
    { date: "22 juin 2026", tag: "Énergique", icon: "⚡", preview: "Les séances de sport matinales transforment mes journées..." },
  ];

  const handleSave = () => {
    if (!text.trim()) return;
    alert("Entrée enregistrée ! (Logique de sauvegarde à ajouter ici)");
    // Ici, tu pourras ajouter la logique pour insérer la nouvelle réflexion dans ta liste
    setText(""); 
  };

  return (
    <div className="pt-2">
      {/* En-tête avec Date Dynamique */}
      <div className="mb-5">
        <p className="text-xs font-bold tracking-wider text-[#2a9d8f] uppercase ">{todayFormatted}</p>
        <h1 className="text-3xl font-black text-[#1d3557] dark:text-[#e2e8f0]">Mon Journal</h1>
      </div>

      {/* Suggestion du jour */}
      <div className="w-full bg-[#1d3557] dark:bg-[#0d1b2a] rounded-3xl p-5 text-white bg-gradient-to-br from-[#1d3557] to-[#24426b] dark:from-[#0d1b2a] dark:to-[#1a2332] mb-5 shadow-sm">
        <p className="text-xs font-bold tracking-wider text-[#2a9d8f] uppercase mb-2">Inspiration du jour</p>
        <p className="text-base font-bold leading-relaxed">"Qu'as-tu appris aujourd'hui qui t'a surpris ?"</p>
      </div>

      {/* Selecteur d'humeur */}
      <MoodSelector />

      {/* Zone de texte de l'entrée */}
      <Card className="mb-6">
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Écris ta réflexion ici... Qu'est-ce qui t'a défié aujourd'hui ? De quoi es-tu fier/fière ?"
          className="w-full min-h-[120px] outline-none text-sm text-[#1d3557] dark:text-[#e2e8f0] bg-transparent placeholder-gray-400 dark:placeholder-gray-500 resize-none font-medium leading-relaxed"
        />
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-50 dark:border-gray-700/50">
          <span className="text-xs font-semibold text-gray-400">
            {text.length} {text.length <= 1 ? 'caractère' : 'caractères'}
          </span>
          <Button 
            variant="primary" 
            onClick={handleSave}
            className="!w-auto !py-2 !px-5 !rounded-xl text-sm"
          >
            Enregistrer
          </Button>
        </div>
      </Card>

      {/* Historique */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-[#1d3557] dark:text-[#e2e8f0]">Réflexions précédentes</h3>
      </div>

      <div className="flex flex-col gap-3">
        {pastReflections.map((item, idx) => (
          <Card key={idx} className="flex items-center justify-between !p-4 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-[#0f1419]/50 transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-xl p-2 bg-gray-50 dark:bg-[#0f1419] rounded-xl mt-1">{item.icon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#1d3557] dark:text-[#e2e8f0]">{item.date}</h4>
                  <span className="text-[10px] font-bold text-gray-400 px-2 py-0.5 bg-gray-100 dark:bg-[#0f1419] rounded-full">{item.tag}</span>
                </div>
                <p className="text-xs text-gray-400 font-medium mt-1 line-clamp-1">{item.preview}</p>
              </div>
            </div>
            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </Card>
        ))}
      </div>
    </div>
  );
}