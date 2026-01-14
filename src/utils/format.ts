export function formatNumber(value: number): string {
  return new Intl.NumberFormat('ko-KR').format(value);
}

export function formatXp(current: number, required: number): string {
  return `${formatNumber(current)} / ${formatNumber(required)}`;
}
