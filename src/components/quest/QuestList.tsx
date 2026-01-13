import { Quest } from '../../types';
import QuestCard from './QuestCard';

interface QuestListProps {
  quests: Quest[];
  onAccept: (id: number) => void;
  onComplete: (id: number) => void;
}

export default function QuestList({ quests, onAccept, onComplete }: QuestListProps) {
  return (
    <div className="space-y-3">
      {quests.map((quest) => (
        <QuestCard
          key={quest.id}
          quest={quest}
          onAccept={() => onAccept(quest.id)}
          onComplete={() => onComplete(quest.id)}
        />
      ))}
    </div>
  );
}
