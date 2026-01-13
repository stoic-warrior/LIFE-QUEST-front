import { NavLink } from 'react-router-dom';
import { Home, Scroll, User } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', icon: Home, label: '홈' },
  { to: '/quests', icon: Scroll, label: '퀘스트' },
  { to: '/profile', icon: User, label: '프로필' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-700 bg-slate-800">
      <div className="mx-auto flex max-w-md justify-around py-2">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center rounded-lg px-4 py-2 transition ${
                isActive ? 'text-purple-400' : 'text-slate-400 hover:text-white'
              }`
            }
          >
            <Icon className="h-6 w-6" />
            <span className="mt-1 text-xs">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
