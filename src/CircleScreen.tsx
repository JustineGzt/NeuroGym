import React from 'react';
import { Card } from './components/ui/Card';

// ==========================================
// COMPOSANT : CARTE DU DÉFI AMI
// ==========================================
interface FriendChallengeCardProps {
  initials: string;
  avatarBg: string;
  name: string;
  challenge: string;
  userProgress: number;
  friendProgress: number;
  statusMessage: string;
  statusType: 'leading' | 'trailing' | 'tied';
}

function FriendChallengeCard({
  initials,
  avatarBg,
  name,
  challenge,
  userProgress,
  friendProgress,
  statusMessage,
  statusType
}: FriendChallengeCardProps) {
  
  const getStatusColor = () => {
    if (statusType === 'leading') return 'text-emerald-500 bg-emerald-500/10';
    if (statusType === 'trailing') return 'text-rose-500 bg-rose-500/10';
    return 'text-amber-500 bg-amber-500/10';
  };

  return (
    <Card className="mb-4">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-xl ${avatarBg} flex items-center justify-center text-white font-black text-sm shrink-0`}>
          {initials}
        </div>

        {/* Infos textuelles */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#1d3557] dark:text-[#e2e8f0] truncate">{name}</h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tight ${getStatusColor()}`}>
              {statusType === 'leading' ? 'Devant' : statusType === 'trailing' ? 'Retard' : 'Égalité'}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5 italic">« {challenge} »</p>
        </div>
      </div>

      {/* Barres de progression */}
      <div className="mt-4 space-y-2">
        {/* Ta progression */}
        <div>
          <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1">
            <span>Toi</span>
            <span className="text-[#2a9d8f]">{userProgress}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#2a9d8f] h-full transition-all duration-300" style={{ width: `${userProgress}%` }} />
          </div>
        </div>

        {/* Sa progression */}
        <div>
          <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1">
            <span>{name.split(' ')[0]}</span>
            <span className="text-[#1d3557] dark:text-[#457b9d]">{friendProgress}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#1d3557] dark:bg-[#457b9d] h-full transition-all duration-300" style={{ width: `${friendProgress}%` }} />
          </div>
        </div>
      </div>

      {/* Message de statut */}
      <p className="text-[11px] text-gray-400 dark:text-gray-400 mt-3 font-medium border-t border-gray-50 dark:border-gray-800/50 pt-2">
        📢 {statusMessage}
      </p>
    </Card>
  );
}

// ==========================================
// ÉCRAN PRINCIPAL
// ==========================================
export default function CircleScreen() {
  const circlesData: FriendChallengeCardProps[] = [
    { 
      initials: "ST", 
      avatarBg: "bg-[#e9c46a]", 
      name: "Sam Torres", 
      challenge: "Lire 20 bouquins cette année", 
      userProgress: 73, 
      friendProgress: 58, 
      statusMessage: "Tu mènes de 15% — conserve ton avance !", 
      statusType: "leading" 
    },
    { 
      initials: "AL", 
      avatarBg: "bg-[#e76f51]", 
      name: "Alex Lucas", 
      challenge: "Pas d'écrans après 22h30 (30j)", 
      userProgress: 45, 
      friendProgress: 60, 
      statusMessage: "Alex a pris l'avantage. Éteins ce téléphone ce soir !", 
      statusType: "trailing" 
    },
    { 
      initials: "MD", 
      avatarBg: "bg-[#2a9d8f]", 
      name: "Marie Dubois", 
      challenge: "90 min de Deep Work par jour", 
      userProgress: 80, 
      friendProgress: 80, 
      statusMessage: "Égalité parfaite. C'est le moment de poser une session de plus !", 
      statusType: "tied" 
    },
    { 
      initials: "KB", 
      avatarBg: "bg-[#457b9d]", 
      name: "Karim Ben", 
      challenge: "Entraînement physique 4x / semaine", 
      userProgress: 90, 
      friendProgress: 70, 
      statusMessage: "Tu gères. Karim galère à suivre ton rythme ce mois-ci.", 
      statusType: "leading" 
    }
  ];

  return (
    <div className="pt-2">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-xs font-bold tracking-wider text-[#2a9d8f] uppercase">Accountability</p>
          <h1 className="text-3xl font-black text-[#1d3557] dark:text-[#e2e8f0]">The Circle</h1>
          <p className="text-xs font-medium text-gray-400 mt-0.5">4 partners • 4 shared challenges</p>
        </div>
        <button className="p-3 bg-[#1d3557] dark:bg-[#2a9d8f] hover:bg-[#112237] dark:hover:bg-[#238b7e] text-white rounded-2xl font-black shadow-md transition-all active:scale-95 text-xl">
          ＋
        </button>
      </div>

      {/* Liste des défis */}
      <div className="flex flex-col">
        {circlesData.map((friend, idx) => (
          <FriendChallengeCard key={idx} {...friend} />
        ))}
      </div>
    </div>
  );
}