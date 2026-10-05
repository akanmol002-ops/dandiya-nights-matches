"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Sparkles, RefreshCw } from "lucide-react";
import { DandiyaProfile, GarbaStyle, CurrentUserProfile } from "../../types";
import SwipeCard from "./SwipeCard";
import FloatingActionBar from "./FloatingActionBar";
import ProfileDetailPanel from "./ProfileDetailPanel";
import FestiveBadge from "../ui/FestiveBadge";
import GlowButton from "../ui/GlowButton";

// ── Match probability (10% each swipe to keep demo fun) ─────────────────────
const MATCH_CHANCE = 0.55; // 55% for a lively demo deck

interface DiscoverViewProps {
  profiles: DandiyaProfile[];
  currentUser: CurrentUserProfile;
  onMatch: (profile: DandiyaProfile, isSuperLike?: boolean) => void;
  onPass: (profileId: string) => void;
  onSuperAarti: (profile: DandiyaProfile) => void;
  onResetDeck: () => void;
  onOpenOnboarding?: () => void;
}

const STYLE_FILTERS = ["All", "3-Taali", "Dodhiyu", "Popat", "Tran Taali", "Bollywood Fusion"];

export default function DiscoverView({
  profiles,
  currentUser,
  onMatch,
  onPass,
  onSuperAarti,
  onResetDeck,
  onOpenOnboarding,
}: DiscoverViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [styleFilter, setStyleFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [detailProfile, setDetailProfile] = useState<DandiyaProfile | null>(null);
  const [history, setHistory] = useState<Array<{ index: number; action: "like" | "pass" | "super" }>>([]);
  const [superLikesLeft, setSuperLikesLeft] = useState(currentUser.superLikesLeft ?? 3);

  // ── Filtered deck ────────────────────────────────────────────────────────
  const deck = profiles.filter((p) => {
    if (styleFilter === "All") return true;
    return p.garbaStyles.includes(styleFilter as GarbaStyle);
  });

  const remaining = deck.length - currentIndex;
  const topProfile = deck[currentIndex] ?? null;
  const nextProfile = deck[currentIndex + 1] ?? null;
  const nextNextProfile = deck[currentIndex + 2] ?? null;

  // ── Actions ──────────────────────────────────────────────────────────────
  const advance = useCallback(
    (action: "like" | "pass" | "super") => {
      if (!topProfile) return;
      setHistory((h) => [...h, { index: currentIndex, action }]);
      setCurrentIndex((i) => i + 1);

      if (action === "like" || action === "super") {
        const isMatch = Math.random() < MATCH_CHANCE;
        if (isMatch) {
          setTimeout(() => {
            onMatch(topProfile, action === "super");
          }, 350); // slight delay so card animates out first
        }
      }
      if (action === "pass") onPass(topProfile.id);
      if (action === "super") {
        onSuperAarti(topProfile);
        setSuperLikesLeft((n) => Math.max(0, n - 1));
      }
    },
    [topProfile, currentIndex, onMatch, onPass, onSuperAarti]
  );

  const handleRewind = useCallback(() => {
    const last = history[history.length - 1];
    if (!last) return;
    setCurrentIndex(last.index);
    setHistory((h) => h.slice(0, -1));
    if (last.action === "super") setSuperLikesLeft((n) => n + 1);
  }, [history]);

  const handleReset = () => {
    setCurrentIndex(0);
    setHistory([]);
    setSuperLikesLeft(currentUser.superLikesLeft ?? 3);
    onResetDeck();
  };

  // ── Shared styles with current user ─────────────────────────────────────
  const sharedStyles = topProfile
    ? topProfile.garbaStyles.filter((s) =>
        currentUser.garbaStyles.includes(s as typeof currentUser.garbaStyles[number])
      )
    : [];

  // ── Outfit color glow map ────────────────────────────────────────────────
  const OUTFIT_GLOW: Record<string, string> = {
    "Radiant Yellow": "shadow-[0_0_20px_rgba(255,215,0,0.35)]",
    "Festive Red": "shadow-[0_0_20px_rgba(220,38,38,0.4)]",
    "Peacock Turquoise": "shadow-[0_0_20px_rgba(0,245,212,0.35)]",
    "Royal Purple": "shadow-[0_0_20px_rgba(147,51,234,0.4)]",
  };

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-80px)] pb-8 px-4 pt-4">
      {/* ── Top bar: filter chips + counter ── */}
      <div className="w-full max-w-md mb-4 space-y-3">
        {/* Title row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-white">Discover</h2>
            {remaining > 0 && (
              <span className="text-xs text-neutral-400 bg-white/8 px-2 py-0.5 rounded-full">
                {remaining} dancer{remaining !== 1 ? "s" : ""} nearby
              </span>
            )}
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
              showFilters
                ? "bg-gold-radiant/15 border-gold-radiant/40 text-gold-radiant"
                : "bg-white/8 border-white/15 text-neutral-300 hover:text-white"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
        </div>

        {/* Filter chips */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-1.5 py-1">
                {STYLE_FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => { setStyleFilter(f); setCurrentIndex(0); setHistory([]); }}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${
                      styleFilter === f
                        ? "bg-magenta-neon/20 border-magenta-neon/60 text-magenta-neon shadow-[0_0_10px_rgba(255,0,127,0.25)]"
                        : "bg-white/6 border-white/12 text-neutral-400 hover:text-white hover:border-white/25"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Your profile sync strip */}
        <div className={`flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm ${OUTFIT_GLOW[currentUser.outfitColor] ?? ""}`}>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-9 h-9 rounded-full object-cover border border-white/20 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-neutral-500 mb-0.5">You Tonight</div>
            <div className="flex flex-wrap gap-1">
              {currentUser.garbaStyles.slice(0, 2).map((s) => (
                <FestiveBadge key={s} label={s} size="sm" />
              ))}
              {currentUser.skillLevel && (
                <FestiveBadge label={`${currentUser.skillLevel} ⚡`} size="sm" variant="gold" />
              )}
            </div>
          </div>
          {onOpenOnboarding && (
            <button
              onClick={onOpenOnboarding}
              className="text-[10px] text-gold-radiant border border-gold-radiant/30 px-2 py-1 rounded-lg hover:bg-gold-radiant/10 transition-colors flex-shrink-0"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* ── Card Deck ── */}
      <div className="relative w-full max-w-md" style={{ height: "560px" }}>
        {deck.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-center gap-4 rounded-3xl bg-white/4 border border-white/10">
            <div className="text-5xl">🪔</div>
            <p className="text-white font-bold text-lg">No dancers with this filter</p>
            <p className="text-neutral-400 text-sm">Try "All" or a different dance style</p>
            <button
              onClick={() => { setStyleFilter("All"); setCurrentIndex(0); }}
              className="text-sm text-magenta-neon border border-magenta-neon/30 px-4 py-2 rounded-xl hover:bg-magenta-neon/10 transition-colors"
            >
              Clear Filter
            </button>
          </div>
        ) : currentIndex >= deck.length ? (
          /* Deck exhausted */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full flex flex-col items-center justify-center text-center gap-5 rounded-3xl bg-gradient-to-br from-[#12032B] to-[#1e0845] border border-white/10"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              🥻
            </motion.div>
            <div>
              <p className="text-white font-black text-xl mb-1">You&apos;ve seen everyone! 🎉</p>
              <p className="text-neutral-400 text-sm">Come back after the next Garba circle!</p>
            </div>
            <GlowButton variant="gold" size="md" onClick={handleReset}>
              <RefreshCw className="w-4 h-4" />
              <span>Restart Deck 🪔</span>
            </GlowButton>
          </motion.div>
        ) : (
          <AnimatePresence>
            {/* Stack: render top 3 for depth effect */}
            {[nextNextProfile, nextProfile, topProfile].map((profile, idx) => {
              if (!profile) return null;
              const stackIndex = idx === 2 ? 0 : idx === 1 ? 1 : 2; // topProfile is stackIndex 0
              return (
                <SwipeCard
                  key={profile.id}
                  profile={profile}
                  isTop={stackIndex === 0}
                  stackIndex={stackIndex}
                  onSwipeLeft={() => advance("pass")}
                  onSwipeRight={() => advance("like")}
                  onSwipeUp={() => advance("super")}
                />
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* ── Shared synergy callout ── */}
      {topProfile && sharedStyles.length > 0 && (
        <motion.div
          key={topProfile.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-gold-radiant/10 border border-gold-radiant/30 text-gold-radiant text-xs font-semibold max-w-sm"
        >
          <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
          <span>
            You both love{" "}
            <span className="font-black">{sharedStyles[0]}</span>!
          </span>
        </motion.div>
      )}

      {/* ── Floating Action Bar ── */}
      {currentIndex < deck.length && deck.length > 0 && (
        <div className="mt-6 w-full max-w-md">
          <div className="p-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            {/* Swipe hint labels */}
            <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-3 px-2">
              <span className="text-[#ff3d57]/70">← Agli Baar ❌</span>
              <span className="text-[#FFD700]/70">↑ Gold Stick 🪔</span>
              <span className="text-[#00e676]/70">Chalo Garba 💖 →</span>
            </div>

            <FloatingActionBar
              onRewind={handleRewind}
              onPass={() => advance("pass")}
              onSuperLike={() => advance("super")}
              onLike={() => advance("like")}
              onInfo={() => setDetailProfile(topProfile)}
              canRewind={history.length > 0}
              superLikesLeft={superLikesLeft}
            />
          </div>
        </div>
      )}

      {/* ── Profile Detail Panel ── */}
      {detailProfile && (
        <ProfileDetailPanel
          profile={detailProfile}
          onClose={() => setDetailProfile(null)}
          onLike={() => advance("like")}
          onPass={() => advance("pass")}
        />
      )}
    </div>
  );
}
