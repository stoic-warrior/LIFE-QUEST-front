import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api/user';
import { useAuthStore } from '../store/authStore';
import { LogOut, User, Zap, Brain, Palette, Users, Heart, Sparkles } from 'lucide-react';

const STAT_CONFIG = [
  { key: 'strength', label: '체력', icon: Zap, color: 'bg-red-500' },
  { key: 'intelligence', label: '지능', icon: Brain, color: 'bg-blue-500' },
  { key: 'creativity', label: '창의력', icon: Palette, color: 'bg-purple-500' },
  { key: 'social', label: '사회성', icon: Users, color: 'bg-green-500' },
  { key: 'emotional', label: '감성', icon: Heart, color: 'bg-pink-500' },
  { key: 'spiritual', label: '정신력', icon: Sparkles, color: 'bg-yellow-500' },
] as const;

export default function ProfilePage() {
  const logout = useAuthStore((s) => s.logout);

  const { data: user } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => userApi.getMe().then((res) => res.data.data),
  });

  const { data: stats } = useQuery({
    queryKey: ['user', 'stats'],
    queryFn: () => userApi.getMyStats().then((res) => res.data.data),
  });

  if (!user) return <div className="p-8 text-center text-white">로딩 중...</div>;

  return (
    <div className="space-y-6 p-4">
      <div className="rounded-2xl bg-slate-800 p-6 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
          <User className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white">{user.nickname}</h1>
        <p className="text-sm text-slate-400">{user.email}</p>
        <div className="mt-4 inline-block rounded-full bg-purple-600/30 px-4 py-2">
          <span className="font-bold text-purple-300">Lv. {user.level}</span>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-800 p-4">
        <h2 className="mb-4 text-lg font-bold text-white">캐릭터 스탯</h2>
        <div className="space-y-3">
          {stats &&
            STAT_CONFIG.map(({ key, label, icon: Icon, color }) => (
              <div key={key} className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${color}`}
                >
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-slate-300">{label}</span>
                    <span className="font-bold text-white">
                      {stats[key]}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                    <div
                      className={`h-full rounded-full transition-all ${color}`}
                      style={{ width: `${Math.min(stats[key], 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <button
        onClick={logout}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600/20 py-3 font-bold text-red-400 transition hover:bg-red-600/30"
      >
        <LogOut className="h-5 w-5" />
        로그아웃
      </button>
    </div>
  );
}
