
export default function CircleScreen() {
  // Données prêtes pour FriendChallengeCard (à réactiver)
  /*
  const circlesData = [
    { initials: "ST", avatarBg: "bg-[#e9c46a]", name: "Sam Torres", challenge: "Read 20 books this year", userProgress: 73, friendProgress: 58, statusMessage: "You're leading by 15% — keep the momentum!", statusType: "leading" as const },
    ...
  ];
  */

  return (
    <div className="pt-2">
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

      {/* <div className="flex flex-col">
        {circlesData.map((friend, idx) => (
          <FriendChallengeCard key={idx} {...friend} />
        ))}
      </div> */}
    </div>
  );
}