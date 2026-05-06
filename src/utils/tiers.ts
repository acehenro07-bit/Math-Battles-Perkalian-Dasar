export function getTier(score: number): { title: string; color: string; bg: string } {
  if (score <= 10) return { title: 'Warrior', color: 'text-stone-500', bg: 'bg-stone-100' };
  if (score <= 20) return { title: 'Elit', color: 'text-zinc-600', bg: 'bg-zinc-100' };
  if (score <= 30) return { title: 'Master', color: 'text-amber-600', bg: 'bg-amber-100' };
  if (score <= 40) return { title: 'Grandmaster', color: 'text-orange-500', bg: 'bg-orange-100' };
  if (score <= 50) return { title: 'Epic', color: 'text-emerald-500', bg: 'bg-emerald-100' };
  if (score <= 60) return { title: 'Legend', color: 'text-blue-600', bg: 'bg-blue-100' };
  if (score <= 80) return { title: 'Mythic', color: 'text-purple-600', bg: 'bg-purple-100' };
  if (score <= 100) return { title: 'Mythical Glory', color: 'text-pink-600', bg: 'bg-pink-100' };
  return { title: 'Mythical Immortal', color: 'text-red-600', bg: 'bg-red-100' };
}
