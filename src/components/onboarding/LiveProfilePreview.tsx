"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Sparkles,
  Zap,
  ShieldCheck,
  Music,
  Heart,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { OnboardingFormData, OutfitColor, SkillLevel } from "../../types";
import FestiveBadge from "../ui/FestiveBadge";

interface LiveProfilePreviewProps {
  formData: OnboardingFormData;
  primaryPhotoIndex?: number;
}

export default function LiveProfilePreview({
  formData,
  primaryPhotoIndex = 0,
}: LiveProfilePreviewProps) {
  // Outfit color styling helper
  const getOutfitColorTheme = (color: OutfitColor) => {
    switch (color) {
      case "Radiant Yellow":
        return {
          bg: "bg-amber-400/20",
          border: "border-amber-400/60",
          text: "text-amber-300",
          dot: "bg-amber-400",
          glow: "rgba(255, 215, 0, 0.4)",
          emoji: "🟡",
        };
      case "Festive Red":
        return {
          bg: "bg-rose-500/20",
          border: "border-rose-500/60",
          text: "text-rose-300",
          dot: "bg-rose-500",
          glow: "rgba(244, 63, 94, 0.4)",
          emoji: "🔴",
        };
      case "Peacock Turquoise":
        return {
          bg: "bg-cyan-400/20",
          border: "border-cyan-400/60",
          text: "text-cyan-300",
          dot: "bg-cyan-400",
          glow: "rgba(0, 245, 212, 0.4)",
          emoji: "🦚",
        };
      case "Royal Purple":
        return {
          bg: "bg-purple-500/20",
          border: "border-purple-500/60",
          text: "text-purple-300",
          dot: "bg-purple-500",
          glow: "rgba(168, 85, 247, 0.4)",
          emoji: "🟣",
        };
      default:
        return {
          bg: "bg-gold-radiant/20",
          border: "border-gold-radiant/60",
          text: "text-gold-radiant",
          dot: "bg-gold-radiant",
          glow: "rgba(255, 215, 0, 0.4)",
          emoji: "✨",
        };
    }
  };

  const outfitTheme = getOutfitColorTheme(formData.outfitColor);

  // Calculate profile completeness score (0 - 100%)
  const calculateCompleteness = () => {
    let score = 20; // base
    if (formData.fullName.trim().length > 2) score += 20;
    if (formData.bio.trim().length > 10) score += 20;
    if (formData.favoriteStyles.length > 0) score += 20;
    if (formData.photos.length > 0) score += 20;
    return Math.min(100, score);
  };

  const completeness = calculateCompleteness();
  const currentPhoto =
    formData.photos[primaryPhotoIndex] ||
    formData.photos[0] ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";

  // Derive dynamic headline badge
  const primaryStyle = formData.favoriteStyles[0] || "Garba";
  const skillLabel = formData.skillLevel === "Garba Pro" ? "Pro 🪔" : `${formData.skillLevel} 🪘`;
  const festiveHeadlineBadge = `${primaryStyle} ${skillLabel}`;

  return (
    <div className="w-full max-w-sm mx-auto sticky top-24">
      {/* Live Preview Header label */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-turquoise opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-turquoise"></span>
          </span>
          <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
            Live Partner Card Preview
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-gold-radiant font-semibold bg-gold-radiant/10 px-2 py-0.5 rounded-full border border-gold-radiant/30">
          <Sparkles className="w-3 h-3" />
          <span>{completeness}% Ready</span>
        </div>
      </div>

      {/* Glassmorphic Frosted Card */}
      <motion.div
        layout
        className="glass-panel-glow rounded-3xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative group transition-all duration-300"
        style={{
          boxShadow: `0 0 35px ${outfitTheme.glow}, 0 20px 50px rgba(0,0,0,0.8)`,
        }}
      >
        {/* Photo Container with Gradient Wash */}
        <div className="relative h-[310px] w-full overflow-hidden bg-neutral-900">
          <img
            src={currentPhoto}
            alt={formData.fullName || "Your Profile"}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />

          {/* Dark Velvet Fade Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#12032B] via-[#12032B]/30 to-transparent" />

          {/* Top Floating Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
            {/* Live Distance / Radar Tag */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-neutral-200 text-xs">
              <MapPin className="w-3 h-3 text-cyber-turquoise" />
              <span>{formData.city || "Mumbai"}</span>
            </div>

            {/* Tonight's Outfit Pill */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md border text-xs font-bold shadow-sm ${outfitTheme.bg} ${outfitTheme.border} ${outfitTheme.text}`}
            >
              <span>{outfitTheme.emoji}</span>
              <span>{formData.outfitColor.replace("Radiant ", "").replace("Peacock ", "")}</span>
            </div>
          </div>

          {/* Photo Count Indicators (if multiple photos) */}
          {formData.photos.length > 1 && (
            <div className="absolute top-12 left-3 z-20 flex gap-1">
              {formData.photos.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === primaryPhotoIndex
                      ? "w-5 bg-gold-radiant shadow-sm"
                      : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Identity overlay on photo bottom */}
          <div className="absolute bottom-2.5 left-4 right-4 z-20">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-black text-white tracking-tight truncate">
                {formData.fullName || "Your Name"}, {formData.age || 24}
              </h3>
              <ShieldCheck className="w-5 h-5 text-cyber-turquoise shrink-0 fill-cyber-turquoise/20" />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-neutral-300 mt-0.5 truncate">
              <span className="text-gold-radiant">🎟️</span>
              <span className="font-semibold text-white truncate">
                {formData.preferredVenue.split(",")[0] || "Dome SVP Stadium"}
              </span>
            </div>
          </div>
        </div>

        {/* Card Details Body */}
        <div className="p-4 space-y-3.5">
          {/* Animated Festive Badges */}
          <div className="flex flex-wrap gap-1.5">
            {/* Primary Skill/Style Badge */}
            <FestiveBadge variant="gold" size="sm" glow>
              <Sparkles className="w-3 h-3" />
              <span>{festiveHeadlineBadge}</span>
            </FestiveBadge>

            {/* Outfit Badge */}
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-md ${outfitTheme.bg} ${outfitTheme.border} ${outfitTheme.text}`}
            >
              <span>🥻 {formData.outfitColor}</span>
            </span>

            {/* Venue Badge */}
            <FestiveBadge variant="turquoise" size="sm">
              <span>🎟️ {formData.preferredVenue.split(" ")[0]} Venue</span>
            </FestiveBadge>
          </div>

          {/* Dance Styles Chips */}
          <div className="flex flex-wrap gap-1">
            {formData.favoriteStyles.map((style) => (
              <span
                key={style}
                className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-neutral-300"
              >
                💃 {style}
              </span>
            ))}
          </div>

          {/* Bio text */}
          <p className="text-xs text-neutral-300 leading-relaxed italic line-clamp-2 bg-white/[0.02] p-2 rounded-xl border border-white/5">
            &ldquo;{formData.bio || "No bio added yet. Add a fun festive line to attract partners!"}&rdquo;
          </p>

          {/* Skill & Sync Meter */}
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs flex justify-between items-center">
            <div>
              <span className="text-[10px] text-neutral-400 block">Dance Skill Level</span>
              <span className="font-bold text-cyber-turquoise">
                ⚡ {formData.skillLevel}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-neutral-400 block">Dandiya Compatibility</span>
              <span className="font-black text-gold-radiant">
                🔥 99% Ready
              </span>
            </div>
          </div>
        </div>

        {/* Live Card Bottom Glow Strip */}
        <div
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(90deg, #FF007F, #FFD700, #00F5D4)`,
          }}
        />
      </motion.div>

      {/* Helpful Hint */}
      <p className="text-[11px] text-neutral-400 text-center mt-2.5">
        ✨ This card will be shown in the <strong>Discover Swiping Deck</strong> to potential partners.
      </p>
    </div>
  );
}
