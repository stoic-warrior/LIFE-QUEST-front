import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { questApi } from '../api/quest';
import { QuestType } from '../types';
import { Plus } from 'lucide-react';
import QuestCreateModal from '../components/quest/QuestCreateModal';
import QuestList from '../components/quest/QuestList';

const QUEST_TYPE_LABELS: Record<QuestType, string> = {
  DAILY: '일일',
  MAIN: '메인',
  GUILD: '길드',
  SIDE: '서브',
  EVENT: '이벤트',
};

export default function QuestsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState<QuestType | 'ALL'>('ALL');
  const queryClient = useQueryClient();

  const { data: quests, isLoading } = useQuery({
    queryKey: ['quests', filter],
    queryFn: () =>
      questApi.list(filter === 'ALL' ? undefined : filter).then((res) => res.data.data || []),
  });

  const acceptMutation = useMutation({
    mutationFn: questApi.accept,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['quests'] }),
  });

  const completeMutation = useMutation({
    mutationFn: questApi.complete,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['quests'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      if (res.data.data) {
        const result = res.data.data;
        alert(
          `퀘스트 완료! +${result.xpEarned} XP, +${result.goldEarned} 골드${
            result.leveledUp ? `\n🎉 레벨 업! Lv.${result.newLevel}` : ''
          }`
        );
      }
    },
  });

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">퀘스트</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="rounded-full bg-purple-600 p-2 transition hover:bg-purple-500"
        >
          <Plus className="h-5 w-5 text-white" />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {(['ALL', 'DAILY', 'MAIN', 'SIDE'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === type
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {type === 'ALL' ? '전체' : QUEST_TYPE_LABELS[type]}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-center text-slate-400">로딩 중...</p>
      ) : quests?.length === 0 ? (
        <p className="py-8 text-center text-slate-400">
          퀘스트가 없습니다. 새로 만들어보세요!
        </p>
      ) : (
        <QuestList
          quests={quests ?? []}
          onAccept={(id) => acceptMutation.mutate(id)}
          onComplete={(id) => completeMutation.mutate(id)}
        />
      )}

      {showCreateModal && (
        <QuestCreateModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
