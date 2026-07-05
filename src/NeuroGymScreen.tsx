import { Header } from './components/dashboard/Header';
import { DailyWisdom } from './components/dashboard/DailyWisdom';
import { GrowthScore } from './components/dashboard/GrowthScore';
import { BrainChallenge } from './components/dashboard/BrainChallenge';
import { UpcomingToday } from './components/dashboard/UpcomingToday';
import { FocusBlocker } from './components/dashboard/FocusBlocker';

export default function NeuroGymScreen() {
  return (
    <div className="pt-2 flex flex-col gap-5">
      {/* Barre supérieure avec le message d'accueil et la photo de profil */}
      <Header />
      
      {/* Encadré bleu avec la citation du jour */}
      <DailyWisdom />
      
      {/* Score global (73/100) et le graphique circulaire */}
      <GrowthScore />
      
      {/* Le défi cérébral interactif (Learn 5 Coding Terms) */}
      <BrainChallenge />
      
      {/* La liste des tâches restantes de la journée */}
      <UpcomingToday />

      {/* Limité les reseaux */}
      <FocusBlocker />
    </div>
  );
}