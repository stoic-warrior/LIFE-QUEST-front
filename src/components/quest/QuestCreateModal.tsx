import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { questApi } from '../../api/quest';
import { QuestType, StatType } from '../../types';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function QuestCreateModal({ onClose }: Props) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'DAILY' as QuestType,
    difficulty: 1,
    baseXp: 50,
    goldReward: 10,
    targetStat: 'STRENGTH' as StatType,
    repeatable: false,
  });

  const mutation = useMutation({
    mutationFn: questApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests'] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-slate-800 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">새 퀘스트</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="퀘스트 제목"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-lg bg-slate-700 px-4 py-3 text-white"
            required
          />

          <textarea
            placeholder="설명"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="h-24 w-full resize-none rounded-lg bg-slate-700 px-4 py-3 text-white"
          />

          <div className="grid grid-cols-2 gap-3">
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as QuestType })}
              className="rounded-lg bg-slate-700 px-4 py-3 text-white"
            >
              <option value="DAILY">일일</option>
              <option value="MAIN">메인</option>
              <option value="SIDE">서브</option>
            </select>

            <select
              value={form.difficulty}
              onChange={(e) =>
                setForm({ ...form, difficulty: Number(e.target.value) })
              }
              className="rounded-lg bg-slate-700 px-4 py-3 text-white"
            >
              {[1, 2, 3, 4, 5].map((d) => (
                <option key={d} value={d}>
                  난이도 {d}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-slate-400">기본 XP</label>
              <input
                type="number"
                value={form.baseXp}
                onChange={(e) =>
                  setForm({ ...form, baseXp: Number(e.target.value) })
                }
                className="mt-1 w-full rounded-lg bg-slate-700 px-4 py-3 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400">골드 보상</label>
              <input
                type="number"
                value={form.goldReward}
                onChange={(e) =>
                  setForm({ ...form, goldReward: Number(e.target.value) })
                }
                className="mt-1 w-full rounded-lg bg-slate-700 px-4 py-3 text-white"
              />
            </div>
          </div>

          <select
            value={form.targetStat}
            onChange={(e) =>
              setForm({ ...form, targetStat: e.target.value as StatType })
            }
            className="w-full rounded-lg bg-slate-700 px-4 py-3 text-white"
          >
            <option value="STRENGTH">체력</option>
            <option value="INTELLIGENCE">지능</option>
            <option value="CREATIVITY">창의력</option>
            <option value="SOCIAL">사회성</option>
            <option value="EMOTIONAL">감성</option>
            <option value="SPIRITUAL">정신력</option>
          </select>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-3 font-bold text-white"
          >
            {mutation.isPending ? '생성 중...' : '퀘스트 생성'}
          </button>
        </form>
      </div>
    </div>
  );
}
