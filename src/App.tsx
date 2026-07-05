import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navigation/Navbar";
import { ThemeToggle } from "./components/ui/ThemeToggle";

import NeuroGymScreen from "./NeuroGymScreen"; 
import HabitsScreen from "./HabitsScreen";
import JournalScreen from "./JournalScreen";
import CircleScreen from "./CircleScreen";

export default function App() {
  return (
    <Router>
      <div className="max-w-md mx-auto min-h-screen">
        <div className="flex justify-end px-4 pt-4">
          <ThemeToggle />
        </div>
        <main className="min-h-screen pb-24 px-4">
          <Routes>
            <Route path="/" element={<NeuroGymScreen />} />
            <Route path="/habits" element={<HabitsScreen />} />
            <Route path="/journal" element={<JournalScreen />} />
            <Route path="/circle" element={<CircleScreen />} />
          </Routes>
        </main>
        <Navbar/>
      </div>
    </Router>
  );
}