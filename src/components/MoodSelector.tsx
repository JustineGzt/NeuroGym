import React, { useState } from 'react';

export const MoodSelector: React.FC = () => {
  const [selected, setSelected] = useState("Good");
  const moods = [
    { label: "Rough", emoji: "🤯" },
    { label: "Okay", emoji: "😐" },
    { label: "Good", emoji: "😊" },
    { label: "Great", emoji: "😄" },
    { label: "Amazing", emoji: "🤩" },
  ];

  return (
    <div className="w-full bg-white dark:bg-[#1a2332] rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50 mb-5 transition-colors">
      <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-4">How are you feeling?</p>
      <div className="flex justify-between items-center">
        {moods.map((mood, idx) => {
          const isSelected = selected === mood.label;
          return (
            <button 
              key={idx} 
              onClick={() => setSelected(mood.label)}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all ${
                isSelected ? 'bg-[#f4f3ef] dark:bg-[#0f1419] scale-105 font-bold text-[#1d3557] dark:text-[#e2e8f0]' : 'opacity-60 hover:opacity-100 text-gray-500 dark:text-gray-400'
              }`}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-[10px] font-semibold">{mood.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};