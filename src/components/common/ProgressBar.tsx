interface ProgressBarProps {
  value: number;
}

export default function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div className="h-3 w-full rounded-full bg-white/20">
      <div
        className="h-full rounded-full bg-yellow-400 transition-all"
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
}
