"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Music, Zap, AtSign, ShieldCheck, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { DandiyaProfile } from "../../types";
import FestiveBadge from "../ui/FestiveBadge";
import GlowButton from "../ui/GlowButton";
import { useState } from "react";

interface ProfileDetailPanelProps {
  profile: DandiyaProfile | null;
  onClose: () => void;
  onLike: () => void;
  onPass: () => void;
}

export default function ProfileDetailPanel({
  profile,
  onClose,
  onLike,
  onPass,
}: ProfileDetailPanelProps) {
  const [photoIdx, setPhotoIdx] = useState(0);

  if (!profile) return null;

  const photos = profile.photos?.length ? profile.photos : [profile.avatar];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Panel */}
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative z-10 w-full max-w-md bg-[#12032B] rounded-t-3xl sm:rounded-3xl border border-white/10 overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Photo Carousel */}
          <div className="relative h-72 sm:h-80 bg-[#0c021e] flex-shrink-0">
            <img
              src={photos[photoIdx]}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#12032B] to-transparent pointer-events-none" />

            {/* Photo navigation */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={() => setPhotoIdx((i) => (i - 1 + photos.length) % photos.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setPhotoIdx((i) => (i + 1) % photos.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                {/* Dots */}
                <div className="absolute top-3 inset-x-0 flex justify-center gap-1.5 pointer-events-none">
                  {photos.map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all ${i === photoIdx ? "bg-white w-5" : "bg-white/40 w-2.5"}`} />
                  ))}
                </div>
              </>
            )}

            {/* Close btn */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Info */}
          <div className="p-5 space-y-4">
            {/* Name row */}
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-black text-white">{profile.name}</h2>
              <span className="text-xl text-white/70">{profile.age}</span>
              {profile.verified && <ShieldCheck className="w-5 h-5 text-cyber-turquoise" />}
              {profile.online && (
                <span className="text-[10px] text-[#00e676] font-bold px-2 py-0.5 rounded-full bg-[#00e676]/15 border border-[#00e676]/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse" />
                  Online Now
                </span>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-sm text-neutral-400">
              <MapPin className="w-4 h-4 text-magenta-neon" />
              <span>{profile.city}</span>
              <span className="text-neutral-600">·</span>
              <span>{profile.distanceKm} km away</span>
            </div>

            {/* Bio */}
            <p className="text-sm text-neutral-300 leading-relaxed">{profile.bio}</p>

            {/* Badges */}
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2 font-semibold">Festive Badges</p>
              <div className="flex flex-wrap gap-2">
                {profile.badges.map((b) => (
                  <FestiveBadge key={b} label={b} />
                ))}
              </div>
            </div>

            {/* Garba Styles */}
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2 font-semibold">Dance Styles</p>
              <div className="flex flex-wrap gap-1.5">
                {profile.garbaStyles.map((style) => (
                  <span key={style} className="text-xs px-3 py-1 rounded-full bg-magenta-neon/10 border border-magenta-neon/30 text-magenta-neon font-medium">
                    {style}
                  </span>
                ))}
              </div>
            </div>

            {/* Compatibility */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-neutral-400">Rhythm Compatibility</span>
                <span className="text-sm font-black text-gold-radiant">{profile.compatibility}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${profile.compatibility}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-magenta-neon via-gold-radiant to-cyber-turquoise shadow-[0_0_8px_rgba(255,215,0,0.4)]"
                />
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-neutral-500 mb-0.5">Tonight&apos;s Outfit</p>
                <p className="text-white font-semibold">{profile.outfitColor}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-neutral-500 mb-0.5">Dandiya Sticks</p>
                <p className="text-white font-semibold">{profile.dandiyaType}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 col-span-2">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Music className="w-3.5 h-3.5 text-cyber-turquoise" />
                  <p className="text-neutral-500">Favourite Song</p>
                </div>
                <p className="text-white font-semibold">{profile.favoriteSong}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Zap className="w-3.5 h-3.5 text-gold-radiant" />
                  <p className="text-neutral-500">Skill Level</p>
                </div>
                <p className="text-white font-semibold">{profile.skillLevel ?? "—"}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-neutral-500 mb-0.5">Strike Count</p>
                <p className="text-white font-semibold">🪘 {profile.strikeCount.toLocaleString()}</p>
              </div>
            </div>

            {profile.instagram && (
              <div className="flex items-center gap-2 text-xs text-neutral-400 border-t border-white/10 pt-3">
                <AtSign className="w-4 h-4 text-magenta-neon" />
                <span>{profile.instagram}</span>
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex gap-3 pt-2 pb-2">
              <button
                onClick={() => { onPass(); onClose(); }}
                className="flex-1 py-3 rounded-2xl border border-[#ff3d57]/30 text-[#ff3d57] text-sm font-bold hover:bg-[#ff3d57]/10 transition-colors"
              >
                ❌ Agli Baar
              </button>
              <GlowButton variant="magenta" size="md" onClick={() => { onLike(); onClose(); }} className="flex-1">
                <Heart className="w-4 h-4" />
                <span>Chalo Garba! 💖</span>
              </GlowButton>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
