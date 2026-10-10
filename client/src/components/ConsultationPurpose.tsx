import { ShieldCheck } from "lucide-react";

export const CONSULTATION_PURPOSE_FAQ = "La consultation est gratuite parce qu’on veut prendre le temps de comprendre tes objectifs, ton expérience et tes besoins avant de te proposer un parcours. Si tu débutes ou reprends l’entraînement, on détermine avec toi l’accompagnement dont tu as besoin pour commencer en confiance, plutôt que de te placer directement dans un cours sans préparation. Notre objectif n’est pas simplement de remplir nos cours : c’est de préserver un encadrement sécuritaire et de qualité pour tout le monde. C’est gagnant-gagnant : tu es mieux orienté dès le départ, et nos coachs peuvent offrir l’attention nécessaire aux nouveaux membres comme à ceux qui sont déjà avec nous.";

export default function ConsultationPurpose() {
  return (
    <div className="rounded-xl border border-[#ed1c24]/20 bg-white/[0.025] p-6">
      <div className="mb-4 flex items-start gap-3">
        <ShieldCheck className="mt-0.5 shrink-0 text-[#ed1c24]" size={22} aria-hidden="true" />
        <h3 className="text-2xl leading-tight text-white">
          POURQUOI UNE CONSULTATION GRATUITE?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-relaxed text-white/65">
        <p>
          Avant de te proposer un cours, on veut comprendre tes objectifs, ton expérience et tes besoins.
          Si tu débutes ou reprends l’entraînement, on prend le temps de déterminer avec toi le bon
          accompagnement pour commencer en confiance.
        </p>
        <p>
          Notre objectif n’est pas simplement de remplir nos cours. On veut t’orienter vers le bon
          parcours et préparer ton arrivée, tout en préservant un encadrement sécuritaire et de
          qualité pour les nouveaux membres comme pour ceux qui sont déjà avec nous.
        </p>
        <p className="border-t border-white/10 pt-4 font-medium text-white/85">
          C’est gagnant-gagnant : tu pars avec une direction claire et une expérience adaptée à ton
          niveau, et nos coachs peuvent continuer à donner à chacun l’attention dont il a besoin.
        </p>
      </div>
    </div>
  );
}
