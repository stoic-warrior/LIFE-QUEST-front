import { Flame } from 'lucide-react';

interface StreakCounterProps {
  days: number;
}

export default function StreakCounter({ days }: StreakCounterProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2">
      <Flame className="h-5 w-5 text-orange-400" />
      <span className="text-sm text-slate-300">스트릭</span>
      <span className="font-bold text-white">{days}일</span>
    </div>
  );
}
