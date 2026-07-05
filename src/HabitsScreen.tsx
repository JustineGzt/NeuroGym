import { WeeklyCalendar } from './components/WeeklyCalendar';
import { HabitItem } from './components/HabitItem';

export default function HabitsScreen() {
  const habitsData = [
    { icon: "📖", title: "Read 10 pages", streak: 14, initialCompleted: true },
    { icon: "💪", title: "30 min Workout", streak: 7, initialCompleted: false },
    { icon: "🧘", title: "Meditate 10 min", streak: 21, initialCompleted: true },
    { icon: "🚫", title: "No social media", streak: 3, initialCompleted: false },
    { icon: "💧", title: "Drink 2L Water", streak: 9, initialCompleted: true },
    { icon: "✍️", title: "Evening journaling", streak: 5, initialCompleted: false },
  ];

  return (
    <div className="pt-2">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-[#1d3557] dark:text-[#e2e8f0]">Habit Tracker</h1>
        <p className="text-sm font-medium text-gray-400 mt-1">3 of 6 completed today</p>
      </div>
      <WeeklyCalendar />
      <div className="flex flex-col">
        {habitsData.map((habit, idx) => (
          <HabitItem key={idx} {...habit} />
        ))}
      </div>
    </div>
  );
}