import React from 'react';
import { FriendChallengeCard } from './components/circle/FriendChallengeCard';

export default function CircleScreen() {
  const circlesData = [
    { initials: "ST", avatarBg: "bg-[#e9c46a]", name: "Sam Torres", challenge: "Read 20 books this year", userProgress: 73, friendProgress: 58, statusMessage: "You're leading by 15% — keep the momentum!", statusType: "leading" as const },
    { initials: "MO", avatarBg: "bg-purple-400", name: "Maya Okon", challenge: "Run 100km in a month", userProgress: 41, friendProgress: 67, statusMessage: "Maya is ahead by 26% — time to push!", statusType: "behind" as const },
    { initials: "LC", avatarBg: "bg-[#2a9d8f]", name: "Liam Chen", challenge: "30-Day Meditation", userProgress: 87, friendProgress: 72, statusMessage: "You're leading by 15% — keep the momentum!", statusType: "leading" as const },
    { initials: "PN", avatarBg: "bg-[#e63946]", name: "Priya Nair", challenge: "No junk food — 30 days", userProgress: 55, friendProgress: 55, statusMessage: "Perfectly tied — who blinks first?", statusType: "tied" as const },
  ];

  return (
    <div className="pt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-xs font-bold tracking-wider text-[#2a9d8f] uppercase">Accountability</p>
          <h1 className="text-3xl font-black text-[#1d3557]">The Circle</h1>
          <p className="text-xs font-medium text-gray-400 mt-0.5">4 partners • 4 shared challenges</p>
        </div>
        <button className="p-3 bg-[#1d3557] hover:bg-[#112237] text-white rounded-2xl font-black shadow-md transition-transform active:scale-95 text-xl">
          ＋
        </button>
      </div>

      <div className="flex flex-col">
        {circlesData.map((friend, idx) => (
          <FriendChallengeCard key={idx} {...friend} />
        ))}
      </div>
    </div>
  );
}