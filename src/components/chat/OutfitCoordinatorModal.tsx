"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check, AlertTriangle } from "lucide-react";
import { DandiyaProfile, CurrentUserProfile } from "../../types";
import GlowButton from "../ui/GlowButton";

interface OutfitCoordinatorModalProps {
  isOpen: boolean;
  partner: DandiyaProfile | null;
  currentUser: CurrentUserProfile;
  onClose: () => void;
  onSendCard: () => void;
}

const OUTFIT_COLORS: Record<string, { bg: string; ring: string; glow: string }> = {
  "Radiant Yellow":     { bg: "bg-[#FFD700]",  ring: "ring-[#FFD700]/60",  glow: "shadow-[0_0_30px_rgba(255,215,0,0.5)]" },
  "Festive Red":        { bg: "bg-[#dc2626]",  ring: "ring-[#dc2626]/60",  glow: "shadow-[0_0_30px_rgba(220,38,38,0.5)]" },
  "Peacock Turquoise":  { bg: "bg-[#00F5D4]",  ring: "ring-[#00F5D4]/60",  glow: "shadow-[0_0_30px_rgba(0,245,212,0.5)]" },
  "Royal Purple":       { bg: "bg-[#9333ea]",  ring: "ring-[#9333ea]/60",  glow: "shadow-[0_0_30px_rgba(147,51,234,0.5)]" },
};

function getColorInfo(color: string) {
  for (const key of Object.keys(OUTFIT_COLORS)) {
    if (color.toLowerCase().includes(key.toLowerCase())) return { key, ...OUTFIT_COLORS[key] };
  }
  return { key: color, bg: "bg-white/20", ring: "ring-white/30", glow: "" };
}

function getCompatibility(c1: string, c2: string): { label: string; level: "great" | "good" | "mismatch"; tip: string } {
  const pairs: Record<string, { label: string; level: "great" | "good" | "mismatch"; tip: string }> = {
    "Radiant Yellow|Royal Purple":    { label: "Perfect Contrast! ✨", level: "great", tip: "Yellow & Purple is the classic Navratri power duo. You'll look stunning on the dance floor!" },
    "Radiant Yellow|Peacock Turquoise": { label: "Festive Harmony 🌊", level: "great", tip: "Sunshine meets ocean — a vibrant combo that screams celebration!" },
    "Festive Red|Royal Purple":       { label: "Royal Pair 👑", level: "great", tip: "Red & Purple radiates bold festive energy. Total showstoppers!" },
    "Festive Red|Radiant Yellow":     { label: "Fire & Gold 🔥", level: "great", tip: "Like a diya flame — warm, bright, and impossible to miss!" },
    "Peacock Turquoise|Royal Purple": { label: "Jewel Tones 💎", level: "good", tip: "Cool-toned elegance. You'll look like walking gemstones." },
    "Peacock Turquoise|Festive Red":  { label: "Bold Splash 🎨", level: "good", tip: "Unexpected but striking. Break the Navratri norms!" },
  };

  const k1 = `${c1}|${c2}`;
  const k2 = `${c2}|${c1}`;
  if (pairs[k1]) return pairs[k1];
  if (pairs[k2]) return pairs[k2];
  if (c1.toLowerCase() === c2.toLowerCase()) return { label: "Twinning! 👯", level: "good", tip: "You're wearing the same color — coordinate subtle differences or lean into the twin look!" };
  return { label: "Unique Mix 🎭", level: "good", tip: "No rules in Navratri fashion — own it together!" };
}

export default function OutfitCoordinatorModal({
  isOpen,
  partner,
  currentUser,
  onClose,
  onSendCard,
}: OutfitCoordinatorModalProps) {
  if (!isOpen || !partner) return null;

  const userColor = getColorInfo(currentUser.outfitColor);
  const partnerColor = getColorInfo(partner.outfitColor);
  const compat = getCompatibility(userColor.key, partnerColor.key);

  const levelIcon = compat.level === "great" ? <Sparkles className="w-4 h-4" /> :
                    compat.level === "good"  ? <Check className="w-4 h-4" /> :
                                               <AlertTriangle className="w-4 h-4" />;
  const levelColors = compat.level === "great" ? "text-[#00e676] bg-[#00e676]/15 border-[#00e676]/40" :
                      compat.level === "good"  ? "text-gold-radiant bg-gold-radiant/15 border-gold-radiant/40" :
                                                  "text-[#ff9800] bg-[#ff9800]/15 border-[#ff9800]/40";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[55] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        />

        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative z-10 w-full max-w-md bg-[#12032B]/95 rounded-3xl p-6 border border-gold-radiant/30 shadow-[0_0_50px_rgba(255,215,0,0.15)] overflow-hidden"
        >
          {/* Close */}
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-neutral-300 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <span className="text-3xl mb-2 block">🥻</span>
            <h3 className="text-xl font-black text-white">Outfit Coordinator</h3>
            <p className="text-xs text-neutral-400 mt-1">See how your tonight&apos;s outfits pair together</p>
          </div>

          {/* Side-by-side outfit compare */}
          <div className="flex items-center justify-center gap-6 mb-6">
            {/* User outfit */}
            <div className="flex flex-col items-center gap-2">
              <div className={`w-20 h-20 rounded-2xl ${userColor.bg} ${userColor.glow} ring-4 ${userColor.ring} flex items-center justify-center`}>
                <img src={currentUser.avatar} alt="You" className="w-14 h-14 rounded-xl object-cover" />
              </div>
              <span className="text-xs text-white font-bold">You</span>
              <span className="text-[10px] text-neutral-400 text-center max-w-[100px] leading-tight">{currentUser.outfitColor}</span>
            </div>

            {/* VS */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-magenta-neon/30 to-gold-radiant/30 border border-white/20 flex items-center justify-center text-sm font-black text-white flex-shrink-0"
            >
              ⚡
            </motion.div>

            {/* Partner outfit */}
            <div className="flex flex-col items-center gap-2">
              <div className={`w-20 h-20 rounded-2xl ${partnerColor.bg} ${partnerColor.glow} ring-4 ${partnerColor.ring} flex items-center justify-center`}>
                <img src={partner.avatar} alt={partner.name} className="w-14 h-14 rounded-xl object-cover" />
              </div>
              <span className="text-xs text-white font-bold">{partner.name.split(" ")[0]}</span>
              <span className="text-[10px] text-neutral-400 text-center max-w-[100px] leading-tight">{partner.outfitColor}</span>
            </div>
          </div>

          {/* Compatibility result */}
          <div className={`p-4 rounded-2xl border text-center mb-4 ${levelColors}`}>
            <div className="flex items-center justify-center gap-2 mb-1">
              {levelIcon}
              <span className="font-black text-base">{compat.label}</span>
            </div>
            <p className="text-xs opacity-80 leading-relaxed">{compat.tip}</p>
          </div>

          {/* Outfit suggestion */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 mb-5">
            <p className="font-semibold text-white mb-1">💡 Pro Tip</p>
            <p>Coordinate your dandiya sticks to match your partner&apos;s outfit for maximum visual sync on the floor!</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <GlowButton variant="gold" size="md" onClick={() => { onSendCard(); onClose(); }} className="flex-1">
              <span>Share in Chat 🥻</span>
            </GlowButton>
            <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-white/15 text-neutral-300 hover:text-white hover:bg-white/5 text-sm transition-colors">
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
