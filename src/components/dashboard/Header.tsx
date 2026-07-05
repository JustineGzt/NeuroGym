import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between w-full px-4 pt-2 pb-4">
      <div>
        <p className="text-xs font-bold tracking-wider text-[#2a9d8f] uppercase">Good Morning</p>
        <h1 className="text-2xl font-black text-[#1d3557] dark:text-[#e2e8f0]">Alex Rivera</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-3 bg-white dark:bg-[#1a2332] rounded-full shadow-sm border border-gray-100 dark:border-gray-700/50 text-[#1d3557] dark:text-[#e2e8f0] transition-colors">
          <span className="absolute top-3 right-3 w-2.5 height-2.5 bg-[#2a9d8f] rounded-full border-2 border-white dark:border-[#1a2332]"></span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
        </button>
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" alt="Profile" className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
      </div>
    </div>
  );
};
