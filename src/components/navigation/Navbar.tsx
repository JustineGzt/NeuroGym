import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { label: "Neuro-Gym", path: "/", icon: "🧠" },
    { label: "Habits", path: "/habits", icon: "🎯" },
    { label: "Journal", path: "/journal", icon: "📖" },
    { label: "Circle", path: "/circle", icon: "👥" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1a2332] border-t border-gray-100 dark:border-gray-700/50 shadow-lg z-50 transition-colors">
      <div className="max-w-md mx-auto flex justify-around items-center py-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col items-center gap-1 text-xs font-semibold transition-colors ${
                isActive ? "text-[#1d3557] dark:text-[#e2e8f0]" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              <span className={`text-xl p-2 rounded-xl transition-all ${isActive ? "bg-[#f4f3ef] dark:bg-[#0f1419]" : ""}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
