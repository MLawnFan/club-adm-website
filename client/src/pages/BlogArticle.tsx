/*
 * BLOG ARTICLE — Dark premium
 * Fond navy sombre, contenu éditorial, texte blanc/crème
 */
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, ArrowRight, User, Tag, Share2 } from "lucide-react";
import { Link, useParams } from "wouter";
import PromoBanner from "@/components/PromoBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_ARTICLES } from "./Blog";

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactElement[] = [];
  let currentList: string[] = [];
  let listKey = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${listKey++}`} className="space-y-1.5 mb-6 pl-5">
          {currentList.map((item, i) => (
            <li key={i} className="leading-relaxed list-disc" style={{ color: "rgba(255,255,255,0.55)" }}>
              {item.replace(/^\*\*(.+?)\*\*/, "").includes("**") ? (
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, "<strong style='color:rgba(255,255,255,0.85);font-weight:600'>$1</strong>") }} />
              ) : item.startsWith("**") ? (
                <>
                  <strong style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{item.match(/^\*\*(.+?)\*\*/)?.[1]}</strong>
                  {item.replace(/^\*\*(.+?)\*\*/, "")}
                </>
              ) : item}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") { flushList(); continue; }
    if (line.startsWith("## ")) {
      flushList();
      elements.push(<h2 key={`h2-${i}`} className="text-2xl lg:text-3xl mt-10 mb-4 text-white" style={{ fontFamily: "var(--font-display)" }}>{line.replace("## ", "")}</h2>);
    } else if (line.startsWith("### ")) {
      flushList();
      elements.push(<h3 key={`h3-${i}`} className="text-xl lg:text-2xl mt-8 mb-3 text-white" style={{ fontFamily: "var(--font-display)" }}>{line.replace("### ", "")}</h3>);
    } else if (line.startsWith("- ")) {
      currentList.push(line.replace("- ", ""));
    } else if (line.startsWith("**") && line.endsWith("**") && !line.includes(":")) {
      flushList();
      elements.push(<p key={`bold-${i}`} className="font-semibold mt-6 mb-2" style={{ color: "rgba(255,255,255,0.85)" }}>{line.replace(/\*\*/g, "")}</p>);
    } else {
      flushList();
      const html = line.replace(/\*\*(.+?)\*\*/g, "<strong style='color:rgba(255,255,255,0.85);font-weight:600'>$1</strong>");
      elements.push(<p key={`p-${i}`} className="leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.55)" }} dangerouslySetInnerHTML={{ __html: html }} />);
    }
  }
  flushList();
  return elements;
}

export default function BlogArticle() {
  const params = useParams<{ slug: string }>();
  const article = BLOG_ARTICLES.find((a) => a.slug === params.slug);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return BLOG_ARTICLES.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 3);
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#0f1229" }}>
        <PromoBanner />
        <Navbar />
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl mb-4 text-white" style={{ fontFamily: "var(--font-display)" }}>ARTICLE NON TROUVÉ</h1>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>Cet article n'existe pas ou a été déplacé.</p>
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-bold uppercase tracking-wider rounded-lg" style={{ backgroundColor: "#ed1c24" }}>
            <ArrowLeft size={14} /> Retour au blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.title, text: article.excerpt, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f1229" }}>
      <PromoBanner />
      <Navbar />

      {/* Hero Image */}
      <section className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="max-w-[900px] mx-auto">
            <span className="inline-block px-3 py-1 text-white text-[11px] font-bold uppercase tracking-wider mb-4 rounded" style={{ backgroundColor: "#ed1c24" }}>{article.category}</span>
            <h1 className="text-white text-3xl lg:text-5xl leading-tight" style={{ fontFamily: "var(--font-display)" }}>{article.title}</h1>
          </div>
        </div>
      </section>

      {/* Article Meta */}
      <section className="border-b border-white/[0.06]" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[900px] mx-auto px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-5 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            <span className="flex items-center gap-1.5"><User size={14} />{article.author}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} />{article.readTime} de lecture</span>
            <span>{article.date}</span>
          </div>
          <button onClick={handleShare} className="flex items-center gap-1.5 text-sm transition-colors hover:text-red-400" style={{ color: "rgba(255,255,255,0.3)" }}>
            <Share2 size={14} /> Partager
          </button>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-10 lg:py-16" style={{ backgroundColor: "#0f1229" }}>
        <div className="max-w-[720px] mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {renderContent(article.content)}
          </motion.div>
        </div>
      </article>

      {/* Author Box */}
      <section className="py-10 border-t border-white/[0.06]" style={{ backgroundColor: "#0f1229" }}>
        <div className="max-w-[720px] mx-auto px-6 lg:px-8">
          <div className="flex items-start gap-5 p-6 rounded-xl border border-white/[0.06]" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
            <div className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#232862" }}>
              <User size={24} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-base mb-1">{article.author}</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                Coach certifié chez Club ADM Fitness. Passionné par l'entraînement fonctionnel et le développement de chaque athlète, peu importe son niveau.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 lg:py-16" style={{ backgroundColor: "#131636" }}>
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl mb-8 text-white" style={{ fontFamily: "var(--font-display)" }}>ARTICLES SIMILAIRES</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((related, i) => (
                <motion.div key={related.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link href={`/blog/${related.slug}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-lg mb-3">
                      <img src={related.image} alt={related.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="flex items-center gap-2 text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                      <span>{related.category}</span><span>·</span><span>{related.readTime}</span>
                    </div>
                    <h3 className="text-lg leading-tight text-white group-hover:text-red-400 transition-colors" style={{ fontFamily: "var(--font-display)" }}>{related.title}</h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className="py-10 border-t border-white/[0.06]" style={{ backgroundColor: "#0f1229" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors hover:text-red-400" style={{ color: "rgba(255,255,255,0.5)" }}>
            <ArrowLeft size={14} /> Retour au blog
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
