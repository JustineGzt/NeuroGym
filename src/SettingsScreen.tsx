import { useState } from 'react';
import { Card } from './components/ui/Card';

export default function SettingsScreen() {
  // États des préférences
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // États pour les actions dynamiques
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("Jamais synchronisé");

  // Fonction de sauvegarde simulée
  const handleBackup = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const now = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      setLastSync(`Sauvegardé à ${now}`);
    }, 1500); // Simule une attente réseau de 1.5s
  };

  // Fonction de suppression sécurisée
  const handleDeleteData = () => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer toutes vos données ? Cette action est irréversible."
    );
    if (confirmDelete) {
      alert("Toutes les données locales ont été réinitialisées.");
      // Logique de réinitialisation des états ici si nécessaire
    }
  };

  return (
    <div className="pt-2 px-2 max-w-md mx-auto">
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-[#1d3557] dark:text-[#e2e8f0]">Paramètres</h1>
        <p className="text-sm text-gray-400 mt-1">Gère tes préférences et ton compte</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Section 1 : Profil */}
        <div>
          <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-3">Mon Compte</p>
          <Card className="!p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-[#0f1419]/50 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#2a9d8f] text-white rounded-full flex items-center justify-center font-black text-xl shadow-sm">
                JD
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#1d3557] dark:text-[#e2e8f0]">John Doe</h4>
                <p className="text-xs text-gray-400 font-medium">john.doe@exemple.com</p>
              </div>
            </div>
            <button className="text-xs font-bold text-red-500 hover:text-red-600 px-3 py-1.5 bg-red-50 dark:bg-red-950/20 rounded-lg transition-colors">
              Déconnexion
            </button>
          </Card>
        </div>

        {/* Section 2 : Application & Préférences */}
        <div>
          <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-3">Préférences</p>
          <Card className="!p-2 flex flex-col">
            
            {/* Option : Mode Sombre */}
            <div className="flex items-center justify-between p-3 border-b border-gray-50 dark:border-gray-700/50">
              <div className="flex items-center gap-3">
                <span className="text-lg">🌙</span>
                <span className="text-sm font-semibold text-[#1d3557] dark:text-[#e2e8f0]">Mode sombre</span>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                role="switch"
                aria-checked={darkMode}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${darkMode ? 'bg-[#2a9d8f]' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Option : Notifications */}
            <div className="flex items-center justify-between p-3 border-b border-gray-50 dark:border-gray-700/50">
              <div className="flex items-center gap-3">
                <span className="text-lg">🔔</span>
                <span className="text-sm font-semibold text-[#1d3557] dark:text-[#e2e8f0]">Rappels quotidiens</span>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                role="switch"
                aria-checked={notifications}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${notifications ? 'bg-[#2a9d8f]' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${notifications ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Option : Sons */}
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <span className="text-lg">🔊</span>
                <span className="text-sm font-semibold text-[#1d3557] dark:text-[#e2e8f0]">Effets sonores</span>
              </div>
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                role="switch"
                aria-checked={soundEnabled}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${soundEnabled ? 'bg-[#2a9d8f]' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${soundEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

          </Card>
        </div>

        {/* Section 3 : Sécurité & Données */}
        <div>
          <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-3">Sécurité & Données</p>
          <Card className="!p-2 flex flex-col">
            
            {/* Bouton Sauvegarder avec état de chargement */}
            <button 
              onClick={handleBackup}
              disabled={isSyncing}
              className="flex items-center justify-between p-3 text-left w-full hover:bg-gray-50 dark:hover:bg-[#0f1419]/30 rounded-xl transition-colors disabled:opacity-60"
            >
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#1d3557] dark:text-[#e2e8f0]">
                  {isSyncing ? "Synchronisation..." : "Sauvegarder les données (Backup)"}
                </span>
                <span className="text-xs text-gray-400 mt-0.5">{lastSync}</span>
              </div>
              {isSyncing && (
                <svg className="animate-spin h-4 w-4 text-[#2a9d8f]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
            </button>

            {/* Bouton de suppression sécurisé */}
            <button 
              onClick={handleDeleteData}
              className="flex items-center justify-between p-3 text-left w-full hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors group"
            >
              <span className="text-sm font-semibold text-red-500 group-hover:text-red-600">Supprimer toutes mes données</span>
            </button>
          </Card>
        </div>

        {/* Version de l'app */}
        <p className="text-center text-[11px] font-medium text-gray-400 mt-4 mb-8">
          Version de l'application : 1.0.0 (Production)
        </p>
      </div>
    </div>
  );
}