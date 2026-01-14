import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-900 p-6 text-center">
      <h1 className="text-3xl font-bold text-white">404</h1>
      <p className="text-slate-400">페이지를 찾을 수 없습니다.</p>
      <Link
        to="/"
        className="rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white transition hover:bg-purple-500"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
