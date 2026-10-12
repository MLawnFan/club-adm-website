import { PROGRAMME_PROFILES } from "@/lib/programmeRatios";

export default function ProgrammeRatios({ programme }: { programme: string }) {
  const profile = PROGRAMME_PROFILES[programme];
  if (!profile) return null;

  return (
    <div className="mb-7" data-programme-ratios={programme}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-white/65">
        À quoi s’attendre
      </p>
      {profile.summary && (
        <p className="mb-4 text-base font-semibold leading-relaxed text-white">
          {profile.summary}
        </p>
      )}
      {profile.ratios.length > 0 && (
        <ul className="space-y-3">
          {profile.ratios.map((ratio) => (
            <li key={ratio.label}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3 text-xs sm:text-sm">
                <span className="text-white/75">{ratio.label}</span>
                <span className="shrink-0 font-bold tabular-nums text-white">{ratio.value} %</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${ratio.value}%`, backgroundColor: ratio.color }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-xs leading-relaxed text-white/55">{profile.note}</p>
    </div>
  );
}
