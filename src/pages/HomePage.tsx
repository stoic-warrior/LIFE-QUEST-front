import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api/user';
import { Flame, Coins, Star, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const { data: userData, isLoading } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => userApi.getMe().then((res) => res.data.data),
  });

  if (isLoading) {
    return <div className="p-8 text-center text-white">로딩 중...</div>;
  }

  const user = userData!;
  const xpProgress = (user.currentXp / getRequiredXp(user.level)) * 100;

  return (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">
          안녕하세요, {user.nickname}!
        </h1>
        <p className="text-slate-400">오늘도 모험을 시작해볼까요?</p>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-purple-200">레벨</p>
            <p className="text-4xl font-bold text-white">{user.level}</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <Star className="h-8 w-8 text-yellow-300" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm text-purple-200">
            <span>EXP</span>
            <span>
              {user.currentXp} / {getRequiredXp(user.level)}
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-yellow-400 transition-all"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={<Coins className="text-yellow-400" />} label="골드" value={user.gold} />
        <StatCard
          icon={<Flame className="text-orange-400" />}
          label="스트릭"
          value={`${user.streakDays}일`}
        />
        <StatCard
          icon={<TrendingUp className="text-green-400" />}
          label="총 XP"
          value={user.totalXp}
        />
      </div>

      <div className="rounded-xl bg-slate-800 p-4">
        <h2 className="mb-3 text-lg font-bold text-white">오늘의 퀘스트</h2>
        <p className="text-sm text-slate-400">
          퀘스트 탭에서 새로운 도전을 시작하세요!
        </p>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl bg-slate-800 p-4 text-center">
      <div className="mb-2 flex justify-center">{icon}</div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="font-bold text-white">{value}</p>
    </div>
  );
}

function getRequiredXp(level: number): number {
  return Math.round(100 * Math.pow(level, 1.5));
}
