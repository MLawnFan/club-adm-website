import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  ClipboardList,
  Dumbbell,
  Flame,
  LockKeyhole,
  UserRound,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useMemberOnboarding } from "@/hooks/useMemberOnboarding";
import {
  MEMBER_PRODUCTS,
  completedStepCount,
  type MemberProduct,
} from "@shared/memberOnboarding";

function ProductCard({ product }: { product: MemberProduct }) {
  const data = useMemberOnboarding(product);
  const info = MEMBER_PRODUCTS[product];
  const suffix = data.isDemo ? "?apercu=1" : "";
  const finished = data.status === "needs_review" || data.status === "referred";
  const count = completedStepCount(data.answers);
  const Icon = product === "rstart" ? Flame : Dumbbell;
  return (
    <article
      className="flex flex-col rounded-2xl border border-white/10 bg-[#131636] p-6 sm:p-8"
      data-member-product={product}
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="rounded-xl bg-[#ed1c24]/10 p-3">
          <Icon size={26} className="text-[#ed1c24]" />
        </div>
        <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/75">
          {info.duration}
        </span>
      </div>
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#ed1c24]">
        {product === "rstart" ? "Le parcours complet" : "Le projet numérique"}
      </p>
      <h2 className="mb-4 text-3xl sm:text-4xl text-white">
        {info.name.toUpperCase()}
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-white/65">
        {product === "rstart"
          ? "Ton programme de 12 semaines et ses 14 modules progressifs. Un parcours pour bâtir tes habitudes et suivre ton évolution."
          : "Un point de départ sur 4 semaines : nutrition, entraînement maison ou gym, habitudes de vie et communauté ADM."}
      </p>
      <ol className="mb-6 space-y-3 text-sm text-white/75">
        <li className="flex gap-3">
          <UserRound size={16} className="mt-0.5 shrink-0 text-[#ed1c24]" />
          1. Créer ou compléter ton profil ADM.
        </li>
        <li className="flex gap-3">
          <ClipboardList size={16} className="mt-0.5 shrink-0 text-[#ed1c24]" />
          2. Répondre au questionnaire guidé.
        </li>
        <li className="flex gap-3">
          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#ed1c24]" />
          3. Vérifier tes réponses et découvrir la prochaine étape.
        </li>
      </ol>
      <div className="mb-6 rounded-lg bg-white/5 p-4 text-sm" role="status">
        {data.loading
          ? "Chargement de ton dossier…"
          : data.error
            ? "Le dossier est temporairement indisponible."
            : !data.isAuthenticated && !data.isDemo
              ? "Connecte-toi pour créer ton profil et reprendre tes réponses."
              : data.status === "referred"
                ? "Questionnaire complété — avis adapté avant personnalisation."
                : finished
                  ? "Questionnaire complété — validation du guide à organiser."
                  : `Onboarding : ${count}/6 étapes complètes${data.status === "draft" ? " · brouillon enregistré" : ""}.`}
      </div>
      <div className="mt-auto space-y-3">
        <Link
          href={`/espace-membre/onboarding/${product}${suffix}`}
          className="flex min-h-12 items-center justify-between gap-3 rounded-lg bg-[#ed1c24] px-5 py-3 text-sm font-bold text-white"
        >
          {finished
            ? "Revoir mon profil et mes réponses"
            : data.status === "draft"
              ? "Reprendre mon onboarding"
              : "Commencer mon onboarding"}
          <ArrowRight size={17} />
        </Link>
        <Link
          href={
            data.isDemo && product === "rstart"
              ? "/programme/preview"
              : `${info.destination}${suffix}`
          }
          className="flex min-h-12 items-center justify-between gap-3 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white/80"
        >
          {product === "rstart"
            ? "Ouvrir mon programme de 12 semaines"
            : "Ouvrir les 4 modules du Starter Pack"}
          <ArrowRight size={17} />
        </Link>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-white/50">
        {product === "rstart"
          ? "Connexion et accès existants conservés. L’onboarding ne démarre pas ton programme automatiquement."
          : "Aperçu du produit numérique en développement. Aucun achat ni nouvel essai communautaire créé ici."}
      </p>
    </article>
  );
}

export default function MemberHub() {
  const data = useMemberOnboarding("starter");
  const [, navigate] = useLocation();
  const suffix = data.isDemo ? "?apercu=1" : "";
  useEffect(() => {
    if (!data.isAuthenticated) return;
    const path = sessionStorage.getItem("adm-onboarding-return");
    if (
      path === "/espace-membre/onboarding/rstart" ||
      path === "/espace-membre/onboarding/starter"
    ) {
      sessionStorage.removeItem("adm-onboarding-return");
      navigate(path);
    }
  }, [data.isAuthenticated, navigate]);
  return (
    <div className="min-h-screen bg-[#0f1229] text-white">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#ed1c24]">
          Espace membre Club ADM
        </p>
        <h1 className="mb-4 text-4xl sm:text-6xl">
          TES PROGRAMMES. UN SEUL ESPACE.
        </h1>
        <p className="mb-8 max-w-3xl text-base leading-relaxed text-white/65">
          Choisis ton parcours. On te guide ensuite pour créer ton profil,
          répondre aux questions de personnalisation et savoir exactement quoi
          faire en premier.
        </p>
        <div className="mb-8 flex flex-col gap-4 border-y border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <UserRound size={22} className="text-[#ed1c24]" />
            <div>
              <p className="font-semibold">
                {data.isDemo
                  ? "Profil de démonstration"
                  : data.user
                    ? `Bienvenue, ${data.answers.preferredName || data.user.name || "membre ADM"}`
                    : "Ton profil ADM"}
              </p>
              <p className="text-sm text-white/55">
                {data.isDemo
                  ? "Réponses fictives uniquement; aucun dossier personnel."
                  : "Même compte, questionnaires et progression séparés pour chaque parcours."}
              </p>
            </div>
          </div>
          <a
            href={`/espace-membre${data.isDemo ? "" : "?apercu=1"}`}
            className="text-sm underline text-white/70"
          >
            {data.isDemo
              ? "Quitter l’aperçu fictif"
              : "Tester avec un profil fictif"}
          </a>
        </div>
        {data.isDemo && (
          <p
            role="note"
            className="mb-6 rounded-lg border border-amber-400/25 bg-amber-400/10 p-4 text-sm text-amber-100"
          >
            Aperçu ouvert, sans achat : les réponses sont fictives et aucun
            guide réel n’est validé. Les accès de tes programmes restent
            inchangés.
          </p>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          <ProductCard product="rstart" />
          <ProductCard product="starter" />
        </div>
        <div className="mt-8 flex items-start gap-3 text-sm leading-relaxed text-white/60">
          <LockKeyhole className="mt-1 shrink-0 text-[#ed1c24]" size={18} />
          <p>
            Les vrais questionnaires sont réservés aux comptes connectés et
            enregistrés dans leur dossier privé. Les informations de santé ne
            vont pas dans la communauté. Le guide nutritionnel nécessite une
            validation humaine avant remise; aucun délai de réponse ni coaching
            individuel n’est promis ici.
          </p>
        </div>
        <Link
          href={`/${suffix}`}
          className="mt-8 inline-flex text-sm text-white/60 hover:text-white"
        >
          Retour au site Club ADM
        </Link>
      </main>
      <Footer />
    </div>
  );
}
