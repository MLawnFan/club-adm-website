import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  ShieldCheck,
  Save,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { getLoginUrl } from "@/const";
import { useMemberOnboarding } from "@/hooks/useMemberOnboarding";
import {
  HABIT_LEVELS,
  MEMBER_PRODUCTS,
  ONBOARDING_STEPS,
  missingForStep,
  numericProfileIssue,
  type MemberAnswers,
  type MemberProduct,
} from "@shared/memberOnboarding";

const inputClass =
  "mt-2 w-full rounded-lg border border-white/15 bg-[#0f1229] px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-[#ed1c24] focus:outline-none focus:ring-2 focus:ring-[#ed1c24]/30";
const buttonClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#ed1c24] px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50";
const optional =
  "Si tu préfères ne pas préciser, écris « préfère ne pas répondre ».";

export default function MemberOnboarding() {
  const [, params] = useRoute("/espace-membre/onboarding/:product");
  const product: MemberProduct =
    params?.product === "rstart" ? "rstart" : "starter";
  const data = useMemberOnboarding(product);
  const [, navigate] = useLocation();
  const [answers, setAnswers] = useState<MemberAnswers>(data.answers);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const suffix = data.isDemo ? "?apercu=1" : "";
  const info = MEMBER_PRODUCTS[product];

  useEffect(() => {
    setAnswers(data.answers);
    setStep(data.step);
  }, [data.answers, data.step]);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [step]);
  function update<K extends keyof MemberAnswers>(
    key: K,
    value: MemberAnswers[K]
  ) {
    setAnswers(previous => ({
      ...previous,
      [key]: value,
      reviewed: key === "reviewed" ? Boolean(value) : false,
    }));
    setSavedMessage("");
    setError("");
  }
  const field = (
    key: keyof MemberAnswers,
    label: string,
    help = optional,
    placeholder = "Ta réponse",
    multiline = true
  ) => (
    <label className="block" key={key}>
      <span className="font-semibold text-white">{label}</span>
      <span className="mt-1 block text-sm leading-relaxed text-white/60">
        {help}
      </span>
      {multiline ? (
        <textarea
          id={`onboarding-${key}`}
          name={key}
          rows={2}
          maxLength={2000}
          value={String(answers[key])}
          onChange={e => update(key, e.target.value as never)}
          className={inputClass}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={`onboarding-${key}`}
          name={key}
          maxLength={100}
          value={String(answers[key])}
          onChange={e => update(key, e.target.value as never)}
          className={inputClass}
          placeholder={placeholder}
          autoComplete={key === "preferredName" ? "given-name" : "off"}
        />
      )}
    </label>
  );
  const select = (
    key: keyof MemberAnswers,
    label: string,
    options: { value: string; label: string }[],
    help?: string
  ) => (
    <label className="block" key={key}>
      <span className="font-semibold text-white">{label}</span>
      {help && <span className="mt-1 block text-sm text-white/60">{help}</span>}
      <select
        id={`onboarding-${key}`}
        name={key}
        value={String(answers[key])}
        onChange={e => update(key, e.target.value as never)}
        className={inputClass}
      >
        <option value="">Choisis une réponse</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        {!options.some(option => option.value === "non-partage") && key !== "weightUnit" && key !== "heightUnit" && (
          <option value="non-partage">Je préfère ne pas répondre — personnalisation limitée</option>
        )}
      </select>
    </label>
  );
  const save = async (nextStep: number, submit = false) => {
    setError("");
    if (nextStep > step || submit) {
      const missing = missingForStep(answers, step);
      if (missing.length) {
        setError(
          "Il manque une réponse à cette étape. Tu peux indiquer que tu préfères ne pas partager une information facultative."
        );
        document.getElementById(`onboarding-${missing[0]}`)?.focus();
        return;
      }
      const issue = numericProfileIssue(answers);
      if (issue) {
        setError(issue);
        return;
      }
    }
    if (!answers.consent) {
      setError("Confirme ton consentement avant d’enregistrer ton profil.");
      return;
    }
    try {
      await data.save(answers, nextStep, submit);
      setStep(nextStep);
      setSavedMessage(
        data.isDemo
          ? "Étape sauvegardée pour cette démonstration fictive."
          : "Étape enregistrée dans ton dossier privé."
      );
      if (submit)
        navigate(
          data.isDemo && product === "rstart"
            ? "/programme/preview"
            : `${info.destination}${suffix}`
        );
      else window.scrollTo({ top: 0, behavior: "auto" });
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Impossible d’enregistrer maintenant. Tes réponses restent à l’écran."
      );
    }
  };

  if (data.loading)
    return (
      <div className="min-h-screen bg-[#0f1229] p-12 text-white" role="status">
        Chargement de ton parcours…
      </div>
    );
  if (!data.isAuthenticated && !data.isDemo)
    return (
      <div className="min-h-screen bg-[#0f1229] text-white">
        <Navbar />
        <main className="mx-auto max-w-2xl px-6 py-16">
          <Link
            href="/espace-membre"
            className="mb-8 inline-flex items-center gap-2 text-white/65"
          >
            <ArrowLeft size={16} /> Mes programmes
          </Link>
          <LockKeyhole className="mb-6 text-[#ed1c24]" size={36} />
          <h1 className="mb-4 text-4xl">CRÉE TON COMPTE OU CONNECTE-TOI</h1>
          <p className="mb-6 leading-relaxed text-white/70">
            Un seul compte pour tes deux parcours. La connexion protège les
            réponses de ton questionnaire et te permet de les reprendre plus
            tard.
          </p>
          <ol className="mb-8 space-y-3 text-white/80">
            <li>
              1. Connecte-toi ou crée ton compte dans la fenêtre de connexion.
            </li>
            <li>2. Choisis le prénom de ton profil ADM.</li>
            <li>3. Complète le questionnaire, une étape à la fois.</li>
          </ol>
          <button
            className={buttonClass}
            onClick={() => {
              sessionStorage.setItem(
                "adm-onboarding-return",
                `/espace-membre/onboarding/${product}`
              );
              window.location.assign(getLoginUrl());
            }}
          >
            Créer mon compte / me connecter <ArrowRight size={16} />
          </button>
          <p className="mt-6 text-sm text-white/60">
            Tu veux seulement voir le fonctionnement?{" "}
            <a
              className="underline text-white"
              href={`/espace-membre/onboarding/${product}?apercu=1`}
            >
              Ouvrir un profil fictif
            </a>
            .
          </p>
          <p className="mt-6 text-xs leading-relaxed text-white/50">
            Aucun achat ni accès au programme de 12 semaines n’est créé par
            cette connexion.
          </p>
        </main>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0f1229] text-white">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href={`/espace-membre${suffix}`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/65"
        >
          <ArrowLeft size={16} /> Mes programmes
        </Link>
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#ed1c24]">
          {info.name} · {info.duration}
        </p>
        <h1 className="mb-3 text-4xl sm:text-5xl">
          TON DÉPART, ÉTAPE PAR ÉTAPE
        </h1>
        <p className="mb-6 max-w-3xl leading-relaxed text-white/65">
          Pas besoin de tout faire d’un coup. Les étapes enregistrées restent
          dans ton dossier; tu peux revenir les modifier. Tes réponses ne sont
          jamais publiées dans la communauté.
        </p>
        {data.isDemo && (
          <div
            role="note"
            className="mb-6 rounded-lg border border-amber-400/25 bg-amber-400/10 p-4 text-sm text-amber-100"
          >
            Aperçu : profil fictif en lecture seule. Ne saisis aucune
            information personnelle réelle ici. Tu peux parcourir les étapes et
            voir le récapitulatif; aucune validation ni inscription réelle n’est
            effectuée.
          </div>
        )}
        {data.error && (
          <p role="alert" className="mb-6 text-red-200">
            Le chargement du dossier a échoué : {data.error.message}. Réessaie
            avant de remplacer tes réponses.
          </p>
        )}
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <ol
              className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1"
              aria-label="Étapes du questionnaire"
            >
              {ONBOARDING_STEPS.map((label, index) => (
                <li
                  key={label}
                  aria-current={index === step ? "step" : undefined}
                  className={`rounded-lg border px-3 py-3 text-xs sm:text-sm ${index === step ? "border-[#ed1c24] bg-[#ed1c24]/10 text-white" : "border-white/10 text-white/60"}`}
                >
                  <span className="mr-2 font-bold">{index + 1}.</span>
                  {label}
                </li>
              ))}
            </ol>
            <p className="mt-4 flex items-center gap-2 text-xs text-white/60">
              <ShieldCheck size={16} />{" "}
              {data.isDemo
                ? "Données fictives seulement"
                : "Réponses privées liées à ton compte"}
            </p>
          </aside>
          <div className="rounded-2xl border border-white/10 bg-[#131636] p-5 sm:p-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/60">
              Étape {step + 1} sur {ONBOARDING_STEPS.length}
            </p>
            <h2
              ref={heading}
              tabIndex={-1}
              className="mb-6 text-3xl outline-none"
            >
              {ONBOARDING_STEPS[step].toUpperCase()}
            </h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                void save(Math.min(5, step + 1), step === 5);
              }}
            >
              <fieldset
                disabled={data.isDemo || data.saving || Boolean(data.error)}
                className="space-y-6 disabled:opacity-90"
              >
                {step === 0 && (
                  <>
                    {field(
                      "preferredName",
                      "1. Quel prénom veux-tu utiliser?",
                      "Ce prénom s’affichera dans ton espace ADM.",
                      "Ton prénom",
                      false
                    )}
                    <label className="flex items-start gap-3 text-sm leading-relaxed">
                      <input
                        id="onboarding-consent"
                        type="checkbox"
                        checked={answers.consent}
                        onChange={e => update("consent", e.target.checked)}
                        className="mt-1 h-5 w-5 shrink-0 accent-[#ed1c24]"
                      />
                      <span>
                        J’accepte que mes réponses servent à préparer mon guide
                        dans mon dossier privé. Ce guide est éducatif et ne
                        remplace pas des soins. Les données sensibles ne vont
                        pas dans la communauté.
                      </span>
                    </label>
                    {select(
                      "ageRange",
                      "2. Quelle est ta tranche d’âge?",
                      ["18-25", "26-35", "36-45", "46-55", "56-65", "65+"]
                        .map(value => ({ value, label: `${value} ans` }))
                        .concat([
                          {
                            value: "moins-18",
                            label: "Moins de 18 ans — orientation adaptée",
                          },
                        ]),
                      "Âge chronologique seulement, jamais un âge biologique estimé."
                    )}
                    {field(
                      "exactAge",
                      "Âge exact — facultatif",
                      "Nécessaire seulement si une équation énergétique est envisagée. Aucun âge n’est inventé si tu le laisses vide.",
                      "Ex. 40",
                      false
                    )}
                    {select(
                      "equationSex",
                      "3. Sexe utilisé par une éventuelle équation — facultatif",
                      [
                        { value: "Femme", label: "Femme" },
                        { value: "Homme", label: "Homme" },
                        {
                          value: "non-partage",
                          label:
                            "Je préfère ne pas préciser / l’équation ne me convient pas",
                        },
                      ],
                      "Distinct de ton identité de genre. Sans cette information, aucune cible énergétique automatique ne sera affichée."
                    )}
                    {select("objective", "4. Ton objectif principal", [
                      { value: "SG", label: "Santé générale" },
                      { value: "PE", label: "Performance" },
                      { value: "PM", label: "Prise de masse" },
                      { value: "PP", label: "Perte de poids" },
                      { value: "ED", label: "Éducation / autre" },
                    ])}
                    {field(
                      "dailyGoal",
                      "Qu’aimerais-tu surtout améliorer au quotidien?",
                      "Décris un changement réaliste, pas un résultat garanti.",
                      "Ex. Une routine de repas plus régulière"
                    )}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        {field(
                          "weight",
                          "5. Ton poids approximatif — facultatif",
                          "Tu peux cliquer sur « Ne pas partager ».",
                          "Ex. 165",
                          false
                        )}
                        {select("weightUnit", "Unité du poids", [
                          { value: "lbs", label: "Livres (lbs)" },
                          { value: "kg", label: "Kilogrammes (kg)" },
                        ])}
                        <button
                          type="button"
                          onClick={() => update("weight", "non-partage")}
                          className="mt-2 text-sm underline text-white/65"
                        >
                          Ne pas partager le poids
                        </button>
                      </div>
                      <div>
                        {field(
                          "height",
                          "6. Ta taille approximative — facultatif",
                          "En cm ou pouces (5 pi 6 po = 66 po).",
                          "Ex. 168",
                          false
                        )}
                        {select("heightUnit", "Unité de la taille", [
                          { value: "cm", label: "Centimètres" },
                          { value: "in", label: "Pouces" },
                        ])}
                        <button
                          type="button"
                          onClick={() => update("height", "non-partage")}
                          className="mt-2 text-sm underline text-white/65"
                        >
                          Ne pas partager la taille
                        </button>
                      </div>
                    </div>
                    {select(
                      "activity",
                      "7. Ton activité habituelle",
                      [
                        "Sédentaire",
                        "Légèrement actif",
                        "Actif",
                        "Très actif",
                      ].map(value => ({ value, label: value }))
                    )}
                    {field(
                      "activityDetails",
                      "Fréquence, durée et intensité",
                      "Inclut ton travail, tes déplacements, ta marche et tes entraînements.",
                      "Ex. Travail assis, marche quotidienne, 3 séances de 45 minutes"
                    )}
                  </>
                )}
                {step === 1 && (
                  <>
                    <p className="rounded-lg bg-white/5 p-4 text-sm leading-relaxed text-white/70">
                      On pose ces questions pour éviter une personnalisation
                      automatique inappropriée. Tu peux répondre sans fournir de
                      détails cliniques.
                    </p>
                    {select(
                      "eatingRelationship",
                      "17. Une relation difficile avec l’alimentation ou l’image corporelle?",
                      [
                        { value: "non", label: "Non" },
                        { value: "oui", label: "Oui" },
                        {
                          value: "non-partage",
                          label: "Je préfère ne pas répondre",
                        },
                      ],
                      "Restrictions, épisodes de perte de contrôle ou difficulté actuelle/passée : une réponse simple suffit."
                    )}
                    {select(
                      "healthSituation",
                      "18. Une situation de santé particulière s’applique-t-elle?",
                      [
                        { value: "non", label: "Non" },
                        { value: "oui", label: "Oui" },
                        {
                          value: "incertain",
                          label: "Je ne suis pas certain(e)",
                        },
                        {
                          value: "non-partage",
                          label: "Je préfère ne pas répondre",
                        },
                      ],
                      "Grossesse, allaitement, maladie diagnostiquée, symptôme préoccupant ou médicament qui influence l’alimentation, l’appétit, le poids ou l’exercice."
                    )}
                    {field(
                      "healthDetails",
                      "Détails ou professionnel qui te suit — facultatif",
                      "Partage seulement ce qui est nécessaire et confortable. Ne transmets aucun dossier médical."
                    )}
                    {field(
                      "restrictions",
                      "10. Allergies, intolérances, restrictions ou préférences culturelles?",
                      "Écris « aucune » si rien ne s’applique. Toute restriction doit être vérifiée avant la remise.",
                      "Ex. Intolérance au lactose, végétarien, aucune…"
                    )}
                  </>
                )}
                {step === 2 && (
                  <>
                    {field(
                      "schedule",
                      "8. À quoi ressemble ton horaire?",
                      "Quarts, nuits, déplacements ou périodes sans accès facile à un repas.",
                      "Ex. Horaire de jour ou quarts de nuit"
                    )}
                    {field(
                      "mealRhythm",
                      "9. À quels moments manges-tu?",
                      "Précise le nombre de repas et de collations qui te convient.",
                      "Ex. 3 repas et une collation selon ma faim"
                    )}
                    {field(
                      "foodPreferences",
                      "11. Aliments aimés, détestés ou difficiles à cuisiner?",
                      "Des choix simples et réalistes pour toi."
                    )}
                    {field(
                      "budgetEquipment",
                      "12. Budget, équipement et temps disponibles?",
                      "Décris ton accès à l’épicerie et ta capacité réelle de préparation.",
                      "Ex. Budget modéré, micro-ondes, 20 minutes par repas"
                    )}
                    {field(
                      "household",
                      "13. Qui fait les achats et les repas à la maison?",
                      "Indique si les repas doivent convenir à d’autres personnes.",
                      "Ex. Je cuisine pour deux adultes"
                    )}
                  </>
                )}
                {step === 3 && (
                  <>
                    {select(
                      "habitLevel",
                      "14. Ton niveau de départ",
                      HABIT_LEVELS.map(level => ({
                        value: level.value,
                        label: `Niveau ${level.value} — ${level.name}`,
                      })),
                      "Un niveau décrit la simplicité et l’autonomie de tes habitudes, pas ta valeur ni un pourcentage de perfection."
                    )}
                    <ul className="space-y-2 text-sm text-white/65">
                      {HABIT_LEVELS.map(level => (
                        <li key={level.value}>
                          <strong className="text-white">{level.name} :</strong>{" "}
                          {level.description}
                        </li>
                      ))}
                    </ul>
                    {field(
                      "habitReason",
                      "Qu’est-ce qui explique ton choix aujourd’hui?"
                    )}
                    {field(
                      "firstAction",
                      "15. Un petit changement faisable dans les deux prochaines semaines?",
                      "Choisis une seule action assez simple pour une semaine occupée.",
                      "Ex. Préparer un lunch deux fois par semaine"
                    )}
                    {field(
                      "pastExperience",
                      "16. Qu’est-ce qui t’a aidé ou nui auparavant?",
                      "Faim, stress, sommeil, budget, horaire, entraînement, entourage…"
                    )}
                    {field(
                      "extraInfo",
                      "19. Autre chose à savoir — facultatif",
                      "Toute information utile pour rendre le guide applicable à ta réalité."
                    )}
                  </>
                )}
                {step === 4 && (
                  <>
                    <p className="text-sm leading-relaxed text-white/65">
                      Ces réponses servent à préparer l’orientation de ton
                      entraînement. Le programme de 12 semaines et le Starter
                      Pack restent deux parcours distincts.
                    </p>
                    {select("environment", "Où vas-tu t’entraîner?", [
                      {
                        value: "gym",
                        label: "Gym conventionnel — machines et poids libres",
                      },
                      {
                        value: "maison",
                        label: "À la maison — équipement minimal",
                      },
                    ])}
                    {select(
                      "experience",
                      "Ton expérience d’entraînement",
                      [
                        {
                          value: "debutant",
                          label: "Débutant — moins de 6 mois",
                        },
                        {
                          value: "intermediaire",
                          label: "Intermédiaire — 6 mois à 2 ans",
                        },
                        {
                          value: "avance",
                          label: "Avancé — plus de 2 ans structurés",
                        },
                      ],
                      "Débutant : plus d’explications. Avancé : indications plus concises."
                    )}
                    {select(
                      "trainingDays",
                      "Combien de jours par semaine sont réalistes?",
                      ["3", "4", "5"].map(value => ({
                        value,
                        label: `${value} jours`,
                      }))
                    )}
                    {select(
                      "trainingObjective",
                      "Ton objectif d’entraînement",
                      [
                        {
                          value: "hypertrophie",
                          label: "Esthétique / musculation",
                        },
                        { value: "force", label: "Force" },
                        {
                          value: "fonctionnel",
                          label: "Santé / mouvements fonctionnels",
                        },
                        { value: "perte_poids", label: "Transformation" },
                        { value: "endurance", label: "Endurance" },
                      ]
                    )}
                    <div id="onboarding-limitationsAnswered">
                      <p className="font-semibold">
                        Douleur ou limitation à prendre en compte?
                      </p>
                      <p className="mt-1 text-sm text-white/60">
                        Une machine n’est pas automatiquement sécuritaire pour
                        une blessure. Un avis adapté peut être nécessaire.
                      </p>
                      <div className="mt-3 space-y-3">
                        {[
                          { value: "aucune", label: "Aucune limitation" },
                          { value: "epaule", label: "Épaule" },
                          { value: "genou", label: "Genou" },
                          { value: "dos", label: "Dos" },
                          { value: "autre", label: "Autre / avis à demander" },
                        ].map(option => (
                          <label
                            key={option.value}
                            className="flex items-center gap-3"
                          >
                            <input
                              type="checkbox"
                              className="h-5 w-5 accent-[#ed1c24]"
                              checked={
                                option.value === "aucune"
                                  ? answers.limitationsAnswered &&
                                    answers.limitations.length === 0
                                  : answers.limitations.includes(option.value)
                              }
                              onChange={() => {
                                update("limitationsAnswered", true);
                                update(
                                  "limitations",
                                  option.value === "aucune"
                                    ? []
                                    : answers.limitations.includes(option.value)
                                      ? answers.limitations.filter(
                                          value => value !== option.value
                                        )
                                      : [...answers.limitations, option.value]
                                );
                              }}
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </fieldset>
              {step === 5 && (
                <>
                  <p className="mb-5 text-sm leading-relaxed text-white/65">
                    Relis les informations principales. Tu peux modifier
                    n’importe quelle étape avant de confirmer. Le guide ne sera
                    pas présenté comme validé tant que l’équipe n’a pas effectué
                    la vérification humaine.
                  </p>
                  <dl className="grid gap-4 sm:grid-cols-2">
                    {[
                      ["Prénom", answers.preferredName],
                      ["Programme", `${info.name} — ${info.duration}`],
                      [
                        "Âge",
                        `${answers.ageRange}${answers.exactAge ? ` · ${answers.exactAge} ans` : ""}`,
                      ],
                      ["Objectif", answers.dailyGoal],
                      ["Activité", answers.activityDetails],
                      ["Restrictions", answers.restrictions],
                      [
                        "Horaire et repas",
                        `${answers.schedule} · ${answers.mealRhythm}`,
                      ],
                      [
                        "Aliments et budget",
                        `${answers.foodPreferences} · ${answers.budgetEquipment}`,
                      ],
                      [
                        "Niveau de départ",
                        `Niveau ${answers.habitLevel} — ${HABIT_LEVELS.find(level => level.value === answers.habitLevel)?.name || ""}`,
                      ],
                      ["Premier geste", answers.firstAction],
                      [
                        "Entraînement",
                        `${answers.environment} · ${answers.experience} · ${answers.trainingDays} jours`,
                      ],
                      [
                        "Orientation de sécurité",
                        answers.healthSituation === "non" &&
                        answers.eatingRelationship === "non" &&
                        answers.ageRange !== "moins-18"
                          ? "Validation du profil avant remise"
                          : "Avis adapté avant personnalisation automatisée",
                      ],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-lg bg-white/5 p-4">
                        <dt className="text-xs uppercase tracking-wider text-white/50">
                          {label}
                        </dt>
                        <dd className="mt-2 break-words text-sm text-white/90">
                          {value || "Non précisé"}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {ONBOARDING_STEPS.slice(0, 5).map((label, index) => (
                      <button
                        type="button"
                        key={label}
                        onClick={() => void save(index)}
                        className="rounded-lg border border-white/15 px-3 py-2 text-xs text-white/75"
                      >
                        Modifier : {label}
                      </button>
                    ))}
                  </div>
                  <label className="mt-6 flex items-start gap-3 text-sm">
                    <input
                      id="onboarding-reviewed"
                      type="checkbox"
                      className="mt-1 h-5 w-5 shrink-0 accent-[#ed1c24]"
                      checked={answers.reviewed}
                      onChange={e => update("reviewed", e.target.checked)}
                    />
                    <span>
                      {data.isDemo
                        ? "J’ai parcouru le profil fictif de démonstration."
                        : "J’ai relu mes réponses et je comprends qu’une validation humaine est nécessaire avant la remise du guide."}
                    </span>
                  </label>
                </>
              )}
              {error && (
                <p
                  role="alert"
                  className="mt-5 rounded-lg bg-red-500/10 p-3 text-sm text-red-200"
                >
                  {error}
                </p>
              )}
              {savedMessage && (
                <p
                  role="status"
                  className="mt-5 flex items-center gap-2 text-sm text-green-300"
                >
                  <CheckCircle2 size={16} />
                  {savedMessage}
                </p>
              )}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
                <button
                  type="button"
                  disabled={step === 0 || data.saving}
                  onClick={() => void save(step - 1)}
                  className="inline-flex min-h-12 items-center gap-2 px-2 text-sm text-white/70 disabled:opacity-30"
                >
                  <ArrowLeft size={16} /> Précédent
                </button>
                <button
                  type="button"
                  disabled={data.saving || Boolean(data.error)}
                  onClick={() => void save(step)}
                  className="inline-flex min-h-12 items-center gap-2 px-2 text-sm text-white/70"
                >
                  <Save size={16} /> Enregistrer
                </button>
                <button
                  type="submit"
                  disabled={data.saving || Boolean(data.error)}
                  className={`${buttonClass} w-full sm:w-auto`}
                >
                  {data.saving
                    ? "Enregistrement…"
                    : step === 5
                      ? data.isDemo
                        ? "Voir la suite fictive"
                        : "Confirmer mon questionnaire"
                      : "Enregistrer et continuer"}
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
