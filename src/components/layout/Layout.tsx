import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="mx-auto max-w-md pb-20">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
