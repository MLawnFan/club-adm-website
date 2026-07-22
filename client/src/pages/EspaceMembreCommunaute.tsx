import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Users, Trophy, MessageCircle, Flame, Heart, Send, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Types ─────────────────────────────────────────────────────
interface Post {
  id: string;
  auteur: string;
  avatar: string;
  date: string;
  contenu: string;
  likes: number;
  liked: boolean;
  type: "post" | "defi" | "victoire";
}

interface Defi {
  id: string;
  titre: string;
  description: string;
  duree: string;
  participants: number;
  actif: boolean;
  completed: boolean;
}

// ─── Données de démonstration ──────────────────────────────────
const DEFIS: Defi[] = [
  {
    id: "d1",
    titre: "7 jours d'hydratation",
    description: "Bois ton objectif d'eau chaque jour pendant 7 jours consécutifs. Prends une photo de ta bouteille chaque matin.",
    duree: "7 jours",
    participants: 23,
    actif: true,
    completed: false,
  },
  {
    id: "d2",
    titre: "Meal prep dominical",
    description: "Prépare au moins 4 repas pour la semaine chaque dimanche. Partage ta photo de meal prep !",
    duree: "4 semaines",
    participants: 18,
    actif: true,
    completed: false,
  },
  {
    id: "d3",
    titre: "10 000 pas / jour",
    description: "Atteins 10 000 pas chaque jour pendant 14 jours. Screenshot de ton tracker bienvenu !",
    duree: "14 jours",
    participants: 31,
    actif: true,
    completed: false,
  },
  {
    id: "d4",
    titre: "Routine du soir — 21 jours",
    description: "Applique ta routine du soir (pas d'écran 60 min avant, chambre fraîche) pendant 21 jours pour en faire une habitude.",
    duree: "21 jours",
    participants: 15,
    actif: false,
    completed: false,
  },
];

const INITIAL_POSTS: Post[] = [
  {
    id: "p1",
    auteur: "Coach Maxime",
    avatar: "M",
    date: "Aujourd'hui",
    contenu: "Bienvenue dans la communauté ADM ! 🔥 Ici, on se soutient mutuellement dans notre transformation. N'hésitez pas à partager vos victoires, vos questions et vos défis. Ensemble, on est plus forts.",
    likes: 12,
    liked: false,
    type: "post",
  },
  {
    id: "p2",
    auteur: "Marie-Ève",
    avatar: "ME",
    date: "Hier",
    contenu: "Première semaine de meal prep complétée ! J'ai préparé 5 lunchs et 3 soupers. Ça change la vie de ne pas avoir à réfléchir à quoi manger. Merci pour les recettes du guide ! 💪",
    likes: 8,
    liked: false,
    type: "victoire",
  },
  {
    id: "p3",
    auteur: "Jean-François",
    avatar: "JF",
    date: "Il y a 2 jours",
    contenu: "Question : pour le défi hydratation, est-ce que le café compte dans mon total d'eau quotidien ? Je bois environ 3 cafés par jour.",
    likes: 3,
    liked: false,
    type: "post",
  },
  {
    id: "p4",
    auteur: "Coach Maxime",
    avatar: "M",
    date: "Il y a 2 jours",
    contenu: "Réponse à Jean-François : Le café compte partiellement, mais l'effet diurétique réduit l'hydratation nette. Compte 50% de ton café comme eau. Pour 3 cafés, ça donne environ 1.5 tasse d'eau équivalente. Le reste, complète avec de l'eau pure ! 💧",
    likes: 6,
    liked: false,
    type: "post",
  },
  {
    id: "p5",
    auteur: "Stéphanie",
    avatar: "S",
    date: "Il y a 3 jours",
    contenu: "VICTOIRE 🎉 J'ai complété mon premier bloc de 3 semaines sans manquer un seul entraînement ! La règle des 2 jours m'a vraiment aidée. Même les jours où j'avais pas envie, je faisais au moins 15 minutes.",
    likes: 15,
    liked: false,
    type: "victoire",
  },
];

// ─── Composant principal ───────────────────────────────────────
export default function EspaceMembreCommunaute() {
  const [activeTab, setActiveTab] = useState<"fil" | "defis" | "qa">("fil");
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [defis, setDefis] = useState<Defi[]>(DEFIS);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("starterpack-community");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.posts) setPosts(data.posts);
        if (data.defis) setDefis(data.defis);
      } catch {}
    }
    // Mark community as visited
    const progress = JSON.parse(localStorage.getItem("starterpack-progress") || "{}");
    progress.community = true;
    localStorage.setItem("starterpack-progress", JSON.stringify(progress));
  }, []);

  const saveData = (newPosts: Post[], newDefis: Defi[]) => {
    localStorage.setItem("starterpack-community", JSON.stringify({ posts: newPosts, defis: newDefis }));
  };

  const handleLike = (postId: string) => {
    const updated = posts.map(p =>
      p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    );
    setPosts(updated);
    saveData(updated, defis);
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: `user-${Date.now()}`,
      auteur: "Toi",
      avatar: "T",
      date: "À l'instant",
      contenu: newPost,
      likes: 0,
      liked: false,
      type: "post",
    };
    const updated = [post, ...posts];
    setPosts(updated);
    setNewPost("");
    saveData(updated, defis);
  };

  const joinDefi = (defiId: string) => {
    const updated = defis.map(d =>
      d.id === defiId ? { ...d, participants: d.participants + 1, completed: true } : d
    );
    setDefis(updated);
    saveData(posts, updated);
  };

  const tabs = [
    { id: "fil" as const, label: "Fil d'actualité", icon: MessageCircle },
    { id: "defis" as const, label: "Défis", icon: Trophy },
    { id: "qa" as const, label: "Q&A", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <Link href="/espace-membre">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Retour à l'espace membre
            </button>
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-amber-400" />
              <h1 className="font-display text-4xl text-foreground">Communauté ADM</h1>
            </div>
            <p className="text-muted-foreground">30 jours d'accès exclusif — Entraide, défis et motivation.</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-card border border-border rounded-xl p-1 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Fil d'actualité */}
          {activeTab === "fil" && (
            <div className="space-y-4">
              {/* New post */}
              <div className="bg-card border border-border rounded-xl p-4">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Partage une victoire, une question ou un mot d'encouragement..."
                  className="w-full bg-transparent text-foreground placeholder:text-muted-foreground resize-none border-none outline-none text-sm min-h-[80px]"
                />
                <div className="flex justify-end mt-2">
                  <Button size="sm" onClick={handlePost} disabled={!newPost.trim()}>
                    <Send className="w-4 h-4 mr-1" /> Publier
                  </Button>
                </div>
              </div>

              {/* Posts */}
              {posts.map((post) => (
                <div key={post.id} className={`bg-card border rounded-xl p-4 ${
                  post.type === "victoire" ? "border-green-500/30" : "border-border"
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      post.auteur === "Coach Maxime" ? "bg-primary text-white" : "bg-secondary text-foreground"
                    }`}>
                      {post.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground text-sm">{post.auteur}</span>
                        {post.type === "victoire" && (
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Victoire</span>
                        )}
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{post.contenu}</p>
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`mt-2 flex items-center gap-1 text-xs transition-colors ${
                          post.liked ? "text-primary" : "text-muted-foreground hover:text-primary"
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${post.liked ? "fill-primary" : ""}`} />
                        {post.likes}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Défis */}
          {activeTab === "defis" && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Défis actifs</h3>
                </div>
                <p className="text-sm text-muted-foreground">Rejoins un défi pour te motiver et rester constant. Les défis sont conçus pour ancrer les habitudes du programme.</p>
              </div>

              {defis.map((defi) => (
                <div key={defi.id} className={`bg-card border rounded-xl p-5 ${
                  defi.actif ? "border-border" : "border-border opacity-60"
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{defi.titre}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {defi.duree}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" /> {defi.participants} participants
                        </span>
                      </div>
                    </div>
                    {defi.actif && !defi.completed && (
                      <Button size="sm" variant="outline" onClick={() => joinDefi(defi.id)}>
                        Rejoindre
                      </Button>
                    )}
                    {defi.completed && (
                      <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-medium">Inscrit ✓</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{defi.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Q&A */}
          {activeTab === "qa" && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <MessageCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Questions & Réponses</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Pose tes questions directement dans le fil d'actualité. Coach Maxime répond chaque semaine aux questions les plus fréquentes en vidéo.
                </p>
                <Button variant="outline" onClick={() => setActiveTab("fil")}>
                  Aller au fil d'actualité
                </Button>
              </div>

              <div className="bg-card border border-amber-500/30 rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-3">FAQ rapide</h3>
                <div className="space-y-3">
                  {[
                    { q: "Combien de temps dure mon accès ?", a: "30 jours à partir de ton achat. Profite-en au maximum !" },
                    { q: "Puis-je reposer une question si je n'ai pas eu de réponse ?", a: "Oui ! Les questions sont traitées chaque semaine. Si tu n'as pas eu de réponse, repose-la." },
                    { q: "Comment participer aux défis ?", a: "Clique sur 'Rejoindre' dans l'onglet Défis. Tu recevras des rappels pour te motiver." },
                    { q: "Puis-je prolonger mon accès ?", a: "Oui ! Contacte-nous pour un renouvellement ou découvre nos programmes de coaching." },
                  ].map((faq, i) => (
                    <div key={i} className="bg-secondary/30 rounded-lg p-3">
                      <p className="text-sm font-medium text-foreground mb-1">{faq.q}</p>
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
