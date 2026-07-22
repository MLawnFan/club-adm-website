import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Apple, Dumbbell, Heart, Users, ChevronRight, Trophy, Flame } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ModuleProgress {
  nutrition: boolean;
  training: boolean;
  habits: number; // 0-5 modules completed
  community: boolean;
}

export default function EspaceMembre() {
  const [progress, setProgress] = useState<ModuleProgress>({
    nutrition: false,
    training: false,
    habits: 0,
    community: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("starterpack-progress");
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const totalProgress = (() => {
    let score = 0;
    if (progress.nutrition) score += 25;
    if (progress.training) score += 25;
    score += (progress.habits / 5) * 25;
    if (progress.community) score += 25;
    return Math.round(score);
  })();

  const modules = [
    {
      id: "nutrition",
      title: "Plan Nutritionnel",
      subtitle: "Personnalisé selon ton profil",
      icon: Apple,
      color: "from-green-500/20 to-green-600/5",
      borderColor: "border-green-500/30",
      iconColor: "text-green-400",
      href: "/espace-membre/nutrition",
      completed: progress.nutrition,
      value: "97$",
    },
    {
      id: "training",
      title: "Programmation Entraînement",
      subtitle: "Gym ou maison — adapté à toi",
      icon: Dumbbell,
      color: "from-blue-500/20 to-blue-600/5",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400",
      href: "/espace-membre/entrainement",
      completed: progress.training,
      value: "97$",
    },
    {
      id: "habits",
      title: "Habitudes de Vie",
      subtitle: "Sommeil, stress, récupération",
      icon: Heart,
      color: "from-purple-500/20 to-purple-600/5",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-400",
      href: "/espace-membre/habitudes",
      completed: progress.habits >= 5,
      progressText: `${progress.habits}/5 modules`,
      value: "47$",
    },
    {
      id: "community",
      title: "Communauté ADM",
      subtitle: "30 jours d'accès exclusif",
      icon: Users,
      color: "from-amber-500/20 to-amber-600/5",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-400",
      href: "/espace-membre/communaute",
      completed: progress.community,
      value: "70$",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Le Starter Pack ADM</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-foreground mb-4">
            TON ESPACE MEMBRE
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tout ce dont tu as besoin pour transformer tes habitudes de vie. Complète chaque module à ton rythme.
          </p>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Flame className="w-6 h-6 text-primary" />
                <span className="text-foreground font-semibold text-lg">Progression globale</span>
              </div>
              <span className="text-2xl font-display text-primary">{totalProgress}%</span>
            </div>
            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-red-400 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
            <p className="text-muted-foreground text-sm mt-3">
              {totalProgress === 0
                ? "Commence par le module qui t'inspire le plus !"
                : totalProgress === 100
                  ? "Félicitations ! Tu as complété tous les modules. 🎉"
                  : "Continue comme ça, tu es sur la bonne voie !"}
            </p>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((mod) => (
              <Link key={mod.id} href={mod.href}>
                <div
                  className={`group relative bg-gradient-to-br ${mod.color} border ${mod.borderColor} rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20`}
                >
                  {/* Value badge */}
                  <div className="absolute top-4 right-4">
                    <span className="text-xs text-muted-foreground line-through">{mod.value}</span>
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center mb-4 ${mod.iconColor}`}>
                    <mod.icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-foreground font-semibold text-lg mb-1">{mod.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{mod.subtitle}</p>

                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <div>
                      {mod.completed ? (
                        <span className="inline-flex items-center gap-1.5 text-green-400 text-sm font-medium">
                          <span className="w-2 h-2 rounded-full bg-green-400" />
                          Complété
                        </span>
                      ) : mod.progressText ? (
                        <span className="text-muted-foreground text-sm">{mod.progressText}</span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-muted-foreground text-sm">
                          <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                          À compléter
                        </span>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
