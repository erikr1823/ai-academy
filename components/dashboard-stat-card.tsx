import { cardInteractiveClass } from "@/components/academy-shell";

export function DashboardStatCard({
  label,
  value,
  detail,
  accent = "from-emerald-500/20 to-transparent",
}: {
  label: string;
  value: string;
  detail?: string;
  accent?: string;
}) {
  return (
    <article className={`${cardInteractiveClass} p-6`}>
      <div
        className={`mb-4 h-1 w-12 rounded-full bg-gradient-to-r ${accent}`}
        aria-hidden
      />
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      {detail && <p className="mt-2 text-sm text-zinc-400">{detail}</p>}
    </article>
  );
}
