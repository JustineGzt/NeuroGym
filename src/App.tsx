import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navigation/Navbar";

// Importations des 4 pages principales
import NeuroGymScreen from "./NeuroGymScreen"; 
import HabitsScreen from "./HabitsScreen";
import JournalScreen from "./JournalScreen";
import CircleScreen from "./CircleScreen";

export default function App() {
  return (
    <Router>
      <main className="max-w-md mx-auto min-h-screen pb-24 relative px-4">
        <Routes>
          <Route path="/" element={<NeuroGymScreen />} />
          <Route path="/habits" element={<HabitsScreen />} />
          <Route path="/journal" element={<JournalScreen />} />
          <Route path="/circle" element={<CircleScreen />} />
        </Routes>
      </main>
      <Navbar />
    </Router>
  );
}