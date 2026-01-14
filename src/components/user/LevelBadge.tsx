interface LevelBadgeProps {
  level: number;
}

export default function LevelBadge({ level }: LevelBadgeProps) {
  return (
    <div className="inline-flex items-center rounded-full bg-purple-600/30 px-4 py-2">
      <span className="font-bold text-purple-300">Lv. {level}</span>
    </div>
  );
}
