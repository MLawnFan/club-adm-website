import { CalendarCheck2, CreditCard, MapPin } from "lucide-react";
import { buildFounderTimeline, formatFounderDate } from "@/online/lib/founderTimeline";

type FounderTimelineProps = { trialEnd: number };

export default function FounderTimeline({ trialEnd }: FounderTimelineProps) {
  const timeline = buildFounderTimeline(trialEnd);
  const isDay23 = timeline.elapsedDays === 23;
  const steps = [
    {
      key: "start",
      icon: CalendarCheck2,
      marker: "J0 · ACHAT",
      title: "Ta période incluse commence",
      description: `Programme acheté le ${formatFounderDate(timeline.purchaseAt)}. Tes 30 jours de communauté sont compris dans cet achat.`,
      style: "border-white/25 bg-white/5 text-white/70",
    },
    {
      key: "now",
      icon: MapPin,
      marker: `${isDay23 ? "J23 · " : `J${timeline.elapsedDays} · `}AUJOURD’HUI`,
      title: "Tu choisis si tu continues",
      description: `Il te reste environ ${timeline.remainingDays} jour${timeline.remainingDays === 1 ? "" : "s"} déjà inclus. Choisir l’offre fondateur maintenant ne redémarre pas le compteur.`,
      style: "border-online-cta-red bg-online-cta-red text-white",
    },
    {
      key: "end",
      icon: CreditCard,
      marker: "J30 · FIN DES 30 JOURS",
      title: "Premier prélèvement prévu",
      description: `${formatFounderDate(timeline.trialEnd, true)} (heure de Toronto) : 49 $/mois, seulement si tu confirmes l’abonnement.`,
      style: "border-emerald-400/55 bg-emerald-400/10 text-emerald-300",
    },
  ];

  return (
    <section aria-labelledby="fondateur-timeline-title" className="mt-10 sm:mt-12 border border-white/15 bg-[#101d2d] px-5 py-7 sm:px-8 sm:py-9">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-online-cta-red">Tes 30 jours, en un coup d’œil</p>
          <h2 id="fondateur-timeline-title" className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">UNE SEULE PÉRIODE GRATUITE. UNE DATE CLAIRE.</h2>
        </div>
        <p className="font-body text-sm text-white/65">J{timeline.elapsedDays} sur 30 · environ {timeline.remainingDays} jours restants</p>
      </div>

      <div className="relative mt-7" role="progressbar" aria-label="Progression de la période de 30 jours incluse" aria-valuemin={0} aria-valuemax={30} aria-valuenow={timeline.elapsedDays}>
        <div className="h-1.5 overflow-hidden bg-white/15">
          <div className="h-full bg-online-cta-red transition-[width] duration-200 motion-reduce:transition-none" style={{ width: `${timeline.progressPercent}%` }} />
        </div>
        <span aria-hidden="true" className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#101d2d] bg-white shadow-[0_0_0_2px_#db1738]" style={{ left: `${timeline.progressPercent}%` }} />
      </div>
      <div className="mt-2 flex justify-between gap-4 font-body text-xs text-white/50" aria-hidden="true"><span>J0 · achat</span><span>J30 · fin des 30 jours</span></div>

      <ol className="relative mt-8 grid gap-6 pl-8 sm:grid-cols-3 sm:gap-6 sm:pl-0">
        <span aria-hidden="true" className="absolute bottom-12 left-4 top-4 w-px bg-white/20 sm:hidden" />
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <li key={step.key} className="relative min-w-0">
              <div className={`absolute -left-8 top-0 grid h-8 w-8 place-items-center rounded-full border shadow-[0_0_0_5px_#101d2d] sm:static ${step.style}`}>
                <Icon size={16} strokeWidth={2} aria-hidden="true" />
              </div>
              <div className="sm:mt-5">
                <p className={`font-display text-[11px] font-bold uppercase tracking-[0.15em] ${step.key === "now" ? "text-online-cta-red" : "text-white/50"}`}>{step.marker}</p>
                <h3 className="mt-2 font-display text-lg leading-tight font-bold text-white">{step.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-white/65">{step.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-7 border-l-[3px] border-emerald-400 bg-emerald-400/[0.06] px-4 py-3 font-body text-sm text-white/80">
        <strong className="text-white">0 $ aujourd’hui.</strong> Si tu confirmes le tarif fondateur, Stripe prévoit le premier prélèvement le <strong className="text-white">{formatFounderDate(timeline.trialEnd, true)} (heure de Toronto)</strong>. Pas de deuxième essai ajouté; annulation possible en tout temps.
      </p>
      <p className="mt-3 font-body text-xs text-white/45">Dates calculées à partir du paiement programme confirmé par Stripe; la date finale affichée par Stripe prévaut.</p>
    </section>
  );
}
