import { CheckCircle, Sword } from 'lucide-react';
import { Quest, QuestType } from '../../types';

const QUEST_TYPE_LABELS: Record<QuestType, string> = {
  DAILY: '일일',
  MAIN: '메인',
  GUILD: '길드',
  SIDE: '서브',
  EVENT: '이벤트',
};

const DIFFICULTY_STARS = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'];

interface QuestCardProps {
  quest: Quest;
  onAccept: () => void;
  onComplete: () => void;
}

export default function QuestCard({ quest, onAccept, onComplete }: QuestCardProps) {
  return (
    <div className="rounded-xl bg-slate-800 p-4">
      <div className="mb-2 flex items-start justify-between">
        <div>
          <span className="rounded-full bg-purple-600/30 px-2 py-1 text-xs text-purple-300">
            {QUEST_TYPE_LABELS[quest.type]}
          </span>
          <h3 className="mt-2 font-bold text-white">{quest.title}</h3>
        </div>
        <span className="text-sm">{DIFFICULTY_STARS[quest.difficulty - 1]}</span>
      </div>

      <p className="mb-3 text-sm text-slate-400">{quest.description}</p>

      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-300">
          <span className="text-yellow-400">+{quest.baseXp} XP</span>
          <span className="mx-2">·</span>
          <span className="text-yellow-500">+{quest.goldReward} G</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onAccept}
            className="rounded-lg bg-blue-600 p-2 transition hover:bg-blue-500"
            title="수락"
          >
            <Sword className="h-4 w-4 text-white" />
          </button>
          <button
            onClick={onComplete}
            className="rounded-lg bg-green-600 p-2 transition hover:bg-green-500"
            title="완료"
          >
            <CheckCircle className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
