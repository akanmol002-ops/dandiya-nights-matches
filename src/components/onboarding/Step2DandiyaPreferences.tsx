"use client";

import React from "react";
import { Sparkles, MapPin, Zap, Award, Flame, Check } from "lucide-react";
import { GarbaStyle, OnboardingFormData, OutfitColor, SkillLevel } from "../../types";

interface Step2DandiyaPreferencesProps {
  formData: OnboardingFormData;
  setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
}

export default function Step2DandiyaPreferences({
  formData,
  setFormData,
}: Step2DandiyaPreferencesProps) {
  // Required Dance Styles from prompt:
  // 3-Taali, Dodhiyu, Popat, Tran-Taali, Bollywood Fusion
  const danceStyles: { id: GarbaStyle; label: string; desc: string }[] = [
    { id: "3-Taali", label: "3-Taali", desc: "Classic energetic rhythm" },
    { id: "Dodhiyu", label: "Dodhiyu", desc: "Complex 8 to 64-step spins" },
    { id: "Popat", label: "Popat", desc: "Playful traditional hops" },
    { id: "Tran-Taali", label: "Tran-Taali", desc: "High-speed synchronized claps" },
    { id: "Bollywood Fusion", label: "Bollywood Fusion", desc: "Modern bass & hook steps" },
  ];

  // Required Outfit Colors from prompt:
  // Radiant Yellow, Festive Red, Peacock Turquoise, Royal Purple
  const outfitColors: {
    id: OutfitColor;
    label: string;
    hex: string;
    glow: string;
    border: string;
    emoji: string;
  }[] = [
    {
      id: "Radiant Yellow",
      label: "Radiant Yellow",
      hex: "#FFD700",
      glow: "rgba(255, 215, 0, 0.5)",
      border: "border-amber-400",
      emoji: "🟡",
    },
    {
      id: "Festive Red",
      label: "Festive Red",
      hex: "#FF0055",
      glow: "rgba(255, 0, 85, 0.5)",
      border: "border-rose-500",
      emoji: "🔴",
    },
    {
      id: "Peacock Turquoise",
      label: "Peacock Turquoise",
      hex: "#00F5D4",
      glow: "rgba(0, 245, 212, 0.5)",
      border: "border-cyan-400",
      emoji: "🦚",
    },
    {
      id: "Royal Purple",
      label: "Royal Purple",
      hex: "#9D4EDD",
      glow: "rgba(157, 78, 221, 0.5)",
      border: "border-purple-500",
      emoji: "🟣",
    },
  ];

  // Required Venues from prompt:
  // Kora Kendra, Stadium/Ground, Club VIP, Local Society Garba
  const venueOptions = [
    {
      id: "Kora Kendra Grounds, Borivali",
      name: "Kora Kendra Grounds",
      badge: "Borivali Mega Ground",
      desc: "Massive open-air arena with 50,000+ dancers",
    },
    {
      id: "Dome SVP Stadium / Worli Ground",
      name: "Stadium / Ground Arena",
      badge: "NSCI Dome Worli",
      desc: "Indoor AC dome with celebrity orchestra & VIP zones",
    },
    {
      id: "Club VIP Arena",
      name: "Club VIP Garba",
      badge: "Exclusive & Acoustic",
      desc: "Premium club lawns with curated folk singers",
    },
    {
      id: "Local Society Garba Circle",
      name: "Local Society Garba",
      badge: "Community Authentic",
      desc: "Warm neighborhood raas circle with continuous aarti",
    },
  ];

  // Dance Skill Levels:
  // Beginner, Intermediate, Garba Pro
  const skillLevels: { id: SkillLevel; label: string; desc: string; icon: string }[] = [
    {
      id: "Beginner",
      label: "Beginner",
      desc: "Learning the 2-taali groove & enjoying the vibe",
      icon: "🌱",
    },
    {
      id: "Intermediate",
      label: "Intermediate",
      desc: "Can keep up with 3-taali & steady Dodhiya spins",
      icon: "🔥",
    },
    {
      id: "Garba Pro",
      label: "Garba Pro",
      desc: "Non-stop turbo Dodhiya, Sanedo battles & leadership",
      icon: "👑",
    },
  ];

  const toggleStyle = (style: GarbaStyle) => {
    if (formData.favoriteStyles.includes(style)) {
      if (formData.favoriteStyles.length > 1) {
        setFormData((prev) => ({
          ...prev,
          favoriteStyles: prev.favoriteStyles.filter((s) => s !== style),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        favoriteStyles: [...prev.favoriteStyles, style],
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <span>Dandiya & Raas Preferences</span>
          <span className="text-xl">💃</span>
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Lock in your preferred dance moves, outfit sync, and venue to find matched partners.
        </p>
      </div>

      {/* 1. Favorite Dance Styles (Selectable Pills) */}
      <div>
        <label className="text-xs font-semibold text-neutral-300 block mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-magenta-neon" />
            <span>Favorite Dance Styles (Select multiple)</span>
          </span>
          <span className="text-[11px] text-neutral-400">
            {formData.favoriteStyles.length} selected
          </span>
        </label>

        <div className="flex flex-wrap gap-2">
          {danceStyles.map((style) => {
            const isSelected = formData.favoriteStyles.includes(style.id);
            return (
              <button
                type="button"
                key={style.id}
                onClick={() => toggleStyle(style.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 border flex items-center gap-2 ${
                  isSelected
                    ? "bg-gradient-to-r from-magenta-neon to-[#d00067] border-white/40 text-white shadow-neon-magenta scale-[1.02]"
                    : "bg-white/5 border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 hover:border-gold-radiant/40"
                }`}
              >
                <span>{isSelected ? "✓" : "+"}</span>
                <span>{style.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Tonight's Outfit Color */}
      <div>
        <label className="text-xs font-semibold text-neutral-300 block mb-2 flex items-center gap-1.5">
          <span>🥻</span>
          <span>Tonight&apos;s Outfit Color (Helps partners spot you in the arena)</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {outfitColors.map((color) => {
            const isSelected = formData.outfitColor === color.id;
            return (
              <button
                type="button"
                key={color.id}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, outfitColor: color.id }))
                }
                className={`p-3 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? `bg-white/10 ${color.border} shadow-[0_0_20px_${color.glow}] scale-[1.03]`
                    : "bg-white/5 border-white/10 hover:border-white/30 text-neutral-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-6 h-6 rounded-full shadow-md flex items-center justify-center text-xs"
                    style={{ backgroundColor: color.hex }}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-black stroke-[3]" />}
                  </div>
                  <span className="text-xs">{color.emoji}</span>
                </div>

                <span className="text-xs font-bold text-white block">
                  {color.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Preferred Venue / Event Type */}
      <div>
        <label className="text-xs font-semibold text-neutral-300 block mb-2 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-cyber-turquoise" />
          <span>Preferred Venue / Event Ground</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {venueOptions.map((v) => {
            const isSelected = formData.preferredVenue === v.id;
            return (
              <button
                type="button"
                key={v.id}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, preferredVenue: v.id }))
                }
                className={`p-3 rounded-2xl border text-left transition-all duration-200 ${
                  isSelected
                    ? "bg-gradient-to-r from-cyber-turquoise/20 to-blue-500/15 border-cyber-turquoise text-white shadow-neon-cyber"
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-neutral-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{v.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-cyber-turquoise font-semibold">
                    {v.badge}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 line-clamp-1">{v.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Dance Skill Level */}
      <div>
        <label className="text-xs font-semibold text-neutral-300 block mb-2 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-gold-radiant" />
          <span>Dance Skill Level</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {skillLevels.map((lvl) => {
            const isSelected = formData.skillLevel === lvl.id;
            return (
              <button
                type="button"
                key={lvl.id}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, skillLevel: lvl.id }))
                }
                className={`p-3.5 rounded-2xl border text-left transition-all duration-300 ${
                  isSelected
                    ? "bg-gold-radiant/15 border-gold-radiant text-white shadow-neon-gold scale-[1.02]"
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-neutral-300 hover:border-gold-radiant/30"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base">{lvl.icon}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-gold-radiant shadow-sm" />
                  )}
                </div>
                <div className="text-xs font-extrabold text-white">{lvl.label}</div>
                <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-2">
                  {lvl.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
