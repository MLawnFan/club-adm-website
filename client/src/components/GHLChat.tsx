/*
 * GHL CHAT WIDGET — Club ADM Fitness
 * Widget de chat GoHighLevel flottant en bas à droite
 * Design: bulle rouge ADM, animation pulse, modal chat
 * Le client devra remplacer l'URL du widget par son propre snippet GHL
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function GHLChat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Chat bubble — toujours visible */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors"
        style={{ backgroundColor: open ? "#232862" : "#ed1c24" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring when closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: "#ed1c24" }} />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-[60] w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{ backgroundColor: "#232862" }}
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle size={18} className="text-white" />
              </div>
              <div>
                <h4 className="text-white text-sm font-bold" style={{ fontFamily: "var(--font-body)" }}>
                  Club ADM Fitness
                </h4>
                <p className="text-white/50 text-xs">
                  Habituellement répond en quelques minutes
                </p>
              </div>
            </div>

            {/* Chat body — placeholder pour le widget GHL */}
            <div className="h-[380px] flex flex-col">
              {/* Message de bienvenue */}
              <div className="flex-1 p-5 overflow-y-auto">
                <div className="space-y-4">
                  {/* Bot message */}
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: "#ed1c24" }}>
                      ADM
                    </div>
                    <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                      <p className="text-sm text-navy leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                        Salut! 👋 Bienvenue chez Club ADM Fitness. Comment est-ce qu'on peut t'aider aujourd'hui?
                      </p>
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="pl-9 space-y-2">
                    {[
                      "Je veux réserver une consultation gratuite",
                      "Quels sont vos horaires?",
                      "Combien coûte un abonnement?",
                      "Je veux en savoir plus sur la programmation en ligne",
                    ].map((q) => (
                      <button
                        key={q}
                        onClick={() => window.open("https://clubadm.com/contact-us/", "_blank")}
                        className="block w-full text-left px-4 py-2.5 text-sm rounded-xl border border-gray-100 hover:border-adm-red/30 hover:bg-red-50/30 text-navy/70 hover:text-adm-red transition-all"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Input area */}
              <div className="border-t border-gray-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Écris ton message..."
                    className="flex-1 px-4 py-2.5 text-sm bg-gray-50 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-adm-red/20 text-navy placeholder:text-navy/30"
                    style={{ fontFamily: "var(--font-body)" }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        window.open("https://clubadm.com/contact-us/", "_blank");
                      }
                    }}
                  />
                  <button
                    onClick={() => window.open("https://clubadm.com/contact-us/", "_blank")}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: "#ed1c24" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>
                <p className="text-[10px] text-navy/25 text-center mt-2" style={{ fontFamily: "var(--font-body)" }}>
                  Propulsé par GoHighLevel
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
