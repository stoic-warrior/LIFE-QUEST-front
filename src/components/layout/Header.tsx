interface HeaderProps {
  title: string;
  description?: string;
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <div className="space-y-1 text-center">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      {description && <p className="text-slate-400">{description}</p>}
    </div>
  );
}
