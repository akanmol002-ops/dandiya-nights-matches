"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  MessageCircle,
  Shirt,
  MapPinned,
  Music,
  ShieldCheck,
  Lock,
  ArrowRight,
  Zap,
} from "lucide-react";
import { DandiyaProfile } from "../../types";
import GlowButton from "../ui/GlowButton";

interface UnlockChatPaywallModalProps {
  isOpen: boolean;
  profile: DandiyaProfile | null;
  onClose: () => void;
  onProceedToPay: (profile: DandiyaProfile) => void;
  onOpenLegal?: (tab: "terms" | "privacy" | "safety") => void;
}

export default function UnlockChatPaywallModal({
  isOpen,
  profile,
  onClose,
  onProceedToPay,
  onOpenLegal,
}: UnlockChatPaywallModalProps) {
  if (!isOpen || !profile) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[65] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl -z-10"
        />

        {/* Ambient Glows */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold-radiant/20 blur-[100px]" />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-magenta-neon/20 blur-[90px]" />
        </div>

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 350, damping: 26 }}
          className="relative w-full max-w-lg bg-[#12032B]/95 rounded-3xl p-5 sm:p-7 border border-gold-radiant/40 shadow-[0_0_60px_rgba(255,215,0,0.25)] text-center overflow-hidden my-auto"
        >
          {/* Gold Shimmer Gradient Rim */}
          <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-r from-magenta-neon/30 via-gold-radiant/40 to-cyber-turquoise/30 [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-neutral-300 hover:text-white hover:bg-white/20 transition-colors z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Pill */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-radiant/15 border border-gold-radiant/40 text-gold-radiant text-xs font-bold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5 text-gold-radiant" />
            <span>Direct Chat Access</span>
          </div>

          {/* Header */}
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-radiant via-white to-magenta-neon leading-tight">
            Unlock Conversation for ₹50 💬🪔
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
            Pay a one-time fee of <span className="text-gold-radiant font-bold">₹50</span> to start chatting with{" "}
            <span className="text-white font-semibold">{profile.name}</span>, coordinate your traditional Garba outfits, and sync venue details!
          </p>

          {/* Matched Partner Mini Card Preview */}
          <div className="my-5 p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-left relative overflow-hidden">
            <div className="relative shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-14 h-14 rounded-xl object-cover ring-2 ring-gold-radiant/50"
              />
              <span className="absolute -bottom-1 -right-1 bg-black px-1.5 py-0.2 rounded-full text-[9px] text-cyber-turquoise font-bold border border-cyber-turquoise/40">
                {profile.compatibility}%
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-sm text-white truncate">{profile.name}</h4>
                <span className="text-xs text-neutral-400">{profile.age} yrs</span>
                {profile.verified && <ShieldCheck className="w-3.5 h-3.5 text-cyber-turquoise shrink-0" />}
              </div>
              <p className="text-[11px] text-cyber-turquoise truncate mt-0.5">
                📍 {profile.venue.split(",")[0]}
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gold-radiant font-semibold">
                <span>🥻 {profile.outfitColor}</span>
                <span>•</span>
                <span>⚡ {profile.energyScore}/10 Stamina</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-lg font-black text-gold-radiant">₹50</div>
              <div className="text-[9px] text-neutral-400">One-time</div>
            </div>
          </div>

          {/* Features Included with Unlock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left mb-6">
            <div className="p-2.5 rounded-xl bg-[#1a063b] border border-white/10 flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-magenta-neon/20 text-magenta-neon shrink-0 mt-0.5">
                <MessageCircle className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Direct 1-on-1 Chat</p>
                <p className="text-[10px] text-neutral-400">Unlimited instant messaging & live typing</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#1a063b] border border-white/10 flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-gold-radiant/20 text-gold-radiant shrink-0 mt-0.5">
                <Shirt className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Outfit Coordinator 🥻</p>
                <p className="text-[10px] text-neutral-400">Side-by-side color contrast sync</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#1a063b] border border-white/10 flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyber-turquoise/20 text-cyber-turquoise shrink-0 mt-0.5">
                <MapPinned className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Venue Meetup Sync 🎟️</p>
                <p className="text-[10px] text-neutral-400">Share gate & timing plans easily</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#1a063b] border border-white/10 flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-400 shrink-0 mt-0.5">
                <Music className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Garba Track Sharing 🎵</p>
                <p className="text-[10px] text-neutral-400">Send festive audio track previews</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            <GlowButton
              variant="gold"
              size="lg"
              onClick={() => {
                onClose();
                onProceedToPay(profile);
              }}
              className="w-full justify-center text-sm sm:text-base font-black shadow-[0_0_30px_rgba(255,215,0,0.5)]"
            >
              <span>Pay ₹50 & Start Chatting 💳</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </GlowButton>

            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              Maybe Later • Keep Browsing Radar
            </button>
          </div>

          {/* Policy micro-notice */}
          <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-neutral-400 flex flex-wrap items-center justify-center gap-1.5">
            <span>🔒 Secure Instant Payment via UPI / Cards.</span>
            <span>Digital chat fee is non-refundable once activated.</span>
            {onOpenLegal && (
              <button
                onClick={() => onOpenLegal("terms")}
                className="text-gold-radiant underline hover:text-white"
              >
                Terms apply
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
