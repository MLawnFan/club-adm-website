/**
 * Composant vidéo témoignage
 * Affiche un placeholder vidéo avec un bouton play
 * En production, remplacer par l'URL réelle de la vidéo témoignage
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";

interface VideoTestimonialProps {
  thumbnailUrl?: string;
  videoUrl?: string;
  title?: string;
  subtitle?: string;
}

export default function VideoTestimonial({
  thumbnailUrl,
  videoUrl,
  title = "Écoute ce que nos membres ont à dire.",
  subtitle = "De vraies transformations. De vraies personnes.",
}: VideoTestimonialProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-14"
    >
      <div className="text-center mb-8">
        <h3
          className="font-display text-2xl sm:text-3xl font-bold text-white mb-2"
          style={{ textTransform: "none" }}
        >
          {title}
        </h3>
        <p className="font-body text-base sm:text-lg text-white/50">
          {subtitle}
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl">
        {!isPlaying ? (
          /* Thumbnail + Play button */
          <div
            className="relative aspect-video bg-online-navy-dark cursor-pointer group"
            onClick={() => {
              if (videoUrl) setIsPlaying(true);
            }}
          >
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt="Vidéo témoignage"
                className="w-full h-full object-cover"
              />
            ) : (
              /* Placeholder when no thumbnail */
              <div className="w-full h-full bg-gradient-to-br from-online-navy via-online-navy-dark to-online-navy flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-online-cta-red/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-online-cta-red/30 transition-all duration-300 group-hover:scale-110">
                    <Play
                      size={36}
                      className="text-online-cta-red ml-1"
                      fill="currentColor"
                    />
                  </div>
                  <p className="font-body text-white/40 text-sm">
                    {videoUrl
                      ? "Clique pour regarder le témoignage"
                      : "Vidéo témoignage bientôt disponible"}
                  </p>
                </div>
              </div>
            )}

            {/* Play overlay on thumbnail */}
            {thumbnailUrl && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-all">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-online-cta-red/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play
                    size={36}
                    className="text-white ml-1"
                    fill="currentColor"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Video player */
          <div className="relative aspect-video bg-black">
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            >
              <X size={16} />
            </button>
            {videoUrl && (
              <iframe
                src={videoUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Témoignage vidéo Club ADM"
              />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
