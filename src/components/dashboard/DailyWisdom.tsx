import React from 'react';

export const DailyWisdom: React.FC = () => {
  return (
    <div className="w-full bg-[#1d3557] dark:bg-[#0d1b2a] rounded-3xl p-6 text-white bg-gradient-to-br from-[#1d3557] to-[#24426b] dark:from-[#0d1b2a] dark:to-[#1a2332] relative overflow-hidden shadow-md">
      <p className="text-xs font-bold tracking-wider text-[#2a9d8f] uppercase mb-3">Daily Wisdom</p>
      <p className="text-lg font-medium mb-4 leading-relaxed">"The mind is not a vessel to be filled, but a fire to be kindled."</p>
      <p className="text-sm text-gray-400">— Plutarch</p>
      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />
    </div>
  );
};