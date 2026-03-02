/*
 * PAGE NOTRE ÉQUIPE — Club ADM Fitness
 * Design chaleureux: fond crème, photos coachs, histoire du gym
 * Présentation de l'équipe et de la mission
 */
import { motion } from "framer-motion";
import { Heart, Target, Users, Award, Instagram } from "lucide-react";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

const WARM_COMMUNITY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/warm-community-M6iUrbm2XzLgnQXpZaqtX2.webp";
const WARM_COACHING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/warm-coaching-2Gg7VFzQZCJwMjXGxnqzKN.webp";

const values = [
  {
    icon: Heart,
    title: "Passion",
    desc: "On vit et respire le fitness. Notre passion se transmet à chaque membre, à chaque cours.",
  },
  {
    icon: Target,
    title: "Résultats",
    desc: "On ne fait pas du fitness pour le fun. On mesure, on ajuste, on progresse. Ensemble.",
  },
  {
    icon: Users,
    title: "Communauté",
    desc: "Plus qu'un gym, c'est une famille. On se supporte, on se motive, on célèbre ensemble.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "Des coachs certifiés, des programmes éprouvés, un encadrement de qualité professionnelle.",
  },
];

const coaches = [
  {
    name: "Maxime Daigle",
    role: "Fondateur & Coach principal",
    bio: "Passionné d'entraînement fonctionnel depuis plus de 10 ans, Maxime a fondé Club ADM avec la vision de créer un espace où chaque personne peut devenir la meilleure version d'elle-même.",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=500&fit=crop",
    instagram: "https://www.instagram.com/clubadm/",
  },
  {
    name: "Sarah Tremblay",
    role: "Coach & Nutritionniste",
    bio: "Diplômée en kinésiologie et certifiée en nutrition sportive, Sarah combine l'entraînement et l'alimentation pour des résultats durables.",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop",
    instagram: "https://www.instagram.com/clubadm/",
  },
  {
    name: "Alexandre Roy",
    role: "Coach CrossFit L2",
    bio: "Ancien athlète compétitif, Alex apporte son énergie contagieuse et son expertise technique à chaque cours de groupe.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop",
    instagram: "https://www.instagram.com/clubadm/",
  },
  {
    name: "Émilie Gagnon",
    role: "Coach & Spécialiste Rookies",
    bio: "Éducatrice physique de formation, Émilie est passionnée par le développement des jeunes athlètes et leur confiance en soi.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop",
    instagram: "https://www.instagram.com/clubadm/",
  },
  {
    name: "Philippe Lavoie",
    role: "Coach & Entraîneur personnel",
    bio: "Spécialiste en réhabilitation et en performance, Philippe adapte chaque séance aux besoins spécifiques de ses clients.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop",
    instagram: "https://www.instagram.com/clubadm/",
  },
  {
    name: "Camille Bergeron",
    role: "Coach & Bien-être au travail",
    bio: "Certifiée en ergonomie et en fitness corporatif, Camille aide les entreprises à améliorer la santé de leurs employés.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
    instagram: "https://www.instagram.com/clubadm/",
  },
];

export default function NotreEquipe() {
  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Navbar />

      {/* Hero — Notre histoire */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]">
          {/* Text */}
          <div className="flex items-center bg-warm-cream px-6 lg:px-16 py-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-lg"
            >
              <p className="text-adm-red text-sm font-bold uppercase tracking-[0.15em] mb-4" style={{ fontFamily: "var(--font-body)" }}>
                Notre Histoire
              </p>
              <h1
                className="text-navy text-5xl lg:text-6xl leading-[0.9] mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                PLUS QU'UN GYM,<br />
                <span className="text-adm-red">UNE FAMILLE.</span>
              </h1>
              <p className="text-navy/50 text-base leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
                Club ADM est né d'une passion simple : rendre l'entraînement fonctionnel accessible à tous. Depuis nos débuts, notre mission est de créer un environnement où chaque personne, peu importe son niveau, se sent accueillie et motivée.
              </p>
              <p className="text-navy/50 text-base leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                Avec deux succursales à Brossard et Chambly, et maintenant une programmation en ligne, on repousse les frontières pour offrir notre expertise partout.
              </p>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img
              src={WARM_COMMUNITY}
              alt="Communauté Club ADM"
              className="w-full h-full object-cover min-h-[300px]"
            />
          </motion.div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-adm-red text-sm font-bold uppercase tracking-[0.15em] mb-3" style={{ fontFamily: "var(--font-body)" }}>
              Ce qui nous guide
            </p>
            <h2
              className="text-navy text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              NOS VALEURS
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-7 border border-gray-50 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-adm-red/10 flex items-center justify-center mb-5">
                  <v.icon size={22} className="text-adm-red" />
                </div>
                <h3
                  className="text-navy text-xl mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {v.title.toUpperCase()}
                </h3>
                <p className="text-navy/45 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* L'équipe */}
      <section className="bg-warm-cream py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-adm-red text-sm font-bold uppercase tracking-[0.15em] mb-3" style={{ fontFamily: "var(--font-body)" }}>
              Des passionnés à ton service
            </p>
            <h2
              className="text-navy text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              NOTRE ÉQUIPE
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coaches.map((coach, i) => (
              <motion.div
                key={coach.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <a
                    href={coach.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-navy/50 hover:text-adm-red hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Instagram size={16} />
                  </a>
                </div>
                <div className="p-6">
                  <h3
                    className="text-navy text-xl mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {coach.name.toUpperCase()}
                  </h3>
                  <p className="text-adm-red text-xs font-bold uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-body)" }}>
                    {coach.role}
                  </p>
                  <p className="text-navy/45 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    {coach.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo communauté + CTA */}
      <section className="relative">
        <img
          src={WARM_COACHING}
          alt="Coaching Club ADM"
          className="w-full h-[400px] lg:h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-navy/70 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center px-6"
          >
            <h2
              className="text-white text-4xl lg:text-6xl mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              PRÊT À REJOINDRE<br />
              <span className="text-adm-red">LA FAMILLE?</span>
            </h2>
            <p className="text-white/60 text-base max-w-md mx-auto mb-8" style={{ fontFamily: "var(--font-body)" }}>
              Réserve ta consultation gratuite et découvre comment on peut t'aider à atteindre tes objectifs.
            </p>
            <a
              href="https://clubadm.com/contact-us/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-adm-red text-white text-sm font-bold uppercase tracking-wider hover:bg-adm-red-hover transition-colors rounded-lg"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Consultation Gratuite
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
