interface StatBarProps {
  label: string;
  value: number;
  colorClass: string;
}

export default function StatBar({ label, value, colorClass }: StatBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-bold text-white">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-700">
        <div
          className={`h-full rounded-full ${colorClass}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}
