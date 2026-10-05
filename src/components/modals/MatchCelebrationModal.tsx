"use client";

import React, { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, MessageCircle, Heart, X, Lock } from "lucide-react";
import { DandiyaProfile, CurrentUserProfile } from "../../types";
import GlowButton from "../ui/GlowButton";

interface MatchCelebrationModalProps {
  matchedProfile: DandiyaProfile | null;
  currentUser: CurrentUserProfile;
  unlockedChatIds?: string[];
  onClose: () => void;
  onOpenChat: (profileId: string) => void;
  onOpenPaywall?: (profile: DandiyaProfile) => void;
  isSuperLike?: boolean;
}

function fireMatchConfetti() {
  // First burst — centre
  confetti({
    particleCount: 90,
    spread: 80,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.45 },
    colors: ["#FF007F", "#FFD700", "#00F5D4", "#FFFFFF", "#FF8C00"],
    ticks: 220,
  });
  // Side cannons
  setTimeout(() => {
    confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0, y: 0.5 }, colors: ["#FFD700", "#FF007F", "#FFF"] });
    confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1, y: 0.5 }, colors: ["#00F5D4", "#FFD700", "#FFF"] });
  }, 200);
  // Gentle gold shower
  setTimeout(() => {
    confetti({ particleCount: 40, spread: 120, startVelocity: 20, origin: { x: 0.5, y: 0 }, colors: ["#FFD700", "#FFF8DC", "#FFD700"] });
  }, 500);
}

function buildMatchContext(profile: DandiyaProfile, user: CurrentUserProfile): string {
  const sharedStyles = profile.garbaStyles.filter((s) =>
    user.garbaStyles.includes(s as typeof user.garbaStyles[number])
  );
  const sameVenue =
    user.venuePreference &&
    profile.venue.toLowerCase().includes(
      user.venuePreference.split(",")[0].toLowerCase()
    );

  const parts: string[] = [];
  if (sharedStyles.length > 0) parts.push(`${sharedStyles[0]} dance`);
  if (sameVenue) parts.push(profile.venue.split(",")[0].trim() + " venue");
  if (profile.outfitColor.toLowerCase().includes(user.outfitColor?.toLowerCase() ?? ""))
    parts.push("matching outfit color");

  if (parts.length === 0) {
    return `You both bring ${profile.compatibility}% rhythm energy to the dance floor. Start chatting to coordinate your outfits!`;
  }
  return `You both love ${parts.join(" & ")}. Start chatting to coordinate tonight's dance plan! 🎶`;
}

export default function MatchCelebrationModal({
  matchedProfile,
  currentUser,
  unlockedChatIds = [],
  onClose,
  onOpenChat,
  onOpenPaywall,
  isSuperLike = false,
}: MatchCelebrationModalProps) {
  const matchContext = useMemo(
    () => (matchedProfile ? buildMatchContext(matchedProfile, currentUser) : ""),
    [matchedProfile, currentUser]
  );

  useEffect(() => {
    if (matchedProfile) fireMatchConfetti();
  }, [matchedProfile]);

  if (!matchedProfile) return null;

  const isChatUnlocked =
    matchedProfile.id === "p1" ||
    (currentUser.unlockedChats && currentUser.unlockedChats.includes(matchedProfile.id)) ||
    unlockedChatIds.includes(matchedProfile.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
        />

        {/* Ambient glow pulses */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-magenta-neon blur-[100px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-gold-radiant blur-[80px]"
          />
        </div>

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.75, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.75, opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="relative z-10 w-full max-w-md bg-[#12032B]/95 rounded-3xl p-6 sm:p-8 border border-gold-radiant/50 shadow-[0_0_80px_rgba(255,0,127,0.5),0_0_40px_rgba(255,215,0,0.2)] text-center overflow-hidden"
        >
          {/* Gold shimmer border ring */}
          <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-magenta-neon/20 via-gold-radiant/40 to-cyber-turquoise/20 [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] pointer-events-none" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-neutral-300 hover:text-white hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Label pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-radiant/15 border border-gold-radiant/40 text-gold-radiant text-xs font-bold uppercase tracking-widest mb-4">
            {isSuperLike ? (
              <>🪔 Gold Stick Match!</>
            ) : (
              <><Sparkles className="w-3.5 h-3.5" /> Rhythm Synced</>
            )}
          </div>

          {/* Headline */}
          <motion.h2
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 280, damping: 18 }}
            className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-neon via-gold-radiant to-cyber-turquoise leading-tight mb-1"
          >
            It&apos;s a Dandiya Match! 🪔🥻
          </motion.h2>

          {/* Context text */}
          <p className="text-sm text-neutral-300 mt-2 max-w-sm mx-auto leading-relaxed">
            {matchContext}
          </p>

          {/* Dual avatars */}
          <div className="my-7 flex items-center justify-center gap-0">
            {/* User avatar */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 250, damping: 20 }}
              className="relative -mr-4 z-10"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] bg-gradient-to-tr from-cyber-turquoise to-blue-500 shadow-[0_0_20px_rgba(0,245,212,0.6)]">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#12032B] px-2 py-0.5 rounded-full text-[9px] text-cyber-turquoise font-bold border border-cyber-turquoise/50">
                You
              </span>
            </motion.div>

            {/* Center burst icon */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 400, damping: 15 }}
              className="relative z-20 w-14 h-14 rounded-full bg-gradient-to-tr from-magenta-neon to-gold-radiant flex items-center justify-center text-2xl shadow-[0_0_24px_rgba(255,215,0,0.8)] border-2 border-white/50"
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                🪔
              </motion.span>
            </motion.div>

            {/* Match avatar */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 250, damping: 20 }}
              className="relative -ml-4 z-10"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] bg-gradient-to-tr from-magenta-neon to-gold-radiant shadow-[0_0_20px_rgba(255,0,127,0.6)]">
                <img
                  src={matchedProfile.avatar}
                  alt={matchedProfile.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#12032B] px-2 py-0.5 rounded-full text-[9px] text-magenta-neon font-bold border border-magenta-neon/50">
                {matchedProfile.name.split(" ")[0]}
              </span>
            </motion.div>
          </div>

          {/* Venue sync card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-gold-radiant/8 to-magenta-neon/8 border border-gold-radiant/20 text-xs text-neutral-300 max-w-xs mx-auto mb-6"
          >
            <span className="text-neutral-500 block mb-0.5">Tonight&apos;s Raas Ground</span>
            <span className="font-semibold text-white">{matchedProfile.venue}</span>
          </motion.div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            {isChatUnlocked ? (
              <GlowButton
                variant="magenta"
                size="md"
                onClick={() => {
                  onClose();
                  onOpenChat(matchedProfile.id);
                }}
                className="w-full sm:w-auto font-bold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Start Chatting 💬</span>
              </GlowButton>
            ) : (
              <GlowButton
                variant="gold"
                size="md"
                onClick={() => {
                  onClose();
                  if (onOpenPaywall) {
                    onOpenPaywall(matchedProfile);
                  } else {
                    onOpenChat(matchedProfile.id);
                  }
                }}
                className="w-full sm:w-auto font-black shadow-neon-gold"
              >
                <Lock className="w-4 h-4 text-black mr-1" />
                <span>Unlock Chat (₹50) 💬🪔</span>
              </GlowButton>
            )}

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/15 text-neutral-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-magenta-neon" />
              Keep Swiping 🥻
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
