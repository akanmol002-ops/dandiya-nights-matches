"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Sparkles,
  Zap,
  Save,
  CheckCircle2,
} from "lucide-react";
import { CurrentUserProfile, GarbaStyle, DandiyaStickType } from "../../types";
import FestiveBadge from "../ui/FestiveBadge";
import GlowButton from "../ui/GlowButton";

interface ProfileViewProps {
  currentUser: CurrentUserProfile;
  onUpdateProfile: (updated: CurrentUserProfile) => void;
  onOpenOnboarding?: () => void;
}

export default function ProfileView({
  currentUser,
  onUpdateProfile,
  onOpenOnboarding,
}: ProfileViewProps) {
  const [profile, setProfile] = useState<CurrentUserProfile>(currentUser);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const garbaStyleOptions: GarbaStyle[] = [
    "Dodhiya",
    "Tran Taali",
    "Sanedo Specialist",
    "2-Taali Classic",
    "Popat Raas",
    "Bolly-Garba Fusion",
  ];

  const stickOptions: DandiyaStickType[] = [
    "Neon Cyber LED Sticks",
    "Handcrafted Mirror Wooden",
    "Traditional Rajkot Brass",
    "Royal Gold Foil Carved",
  ];

  const toggleStyle = (style: GarbaStyle) => {
    if (profile.garbaStyles.includes(style)) {
      if (profile.garbaStyles.length > 1) {
        setProfile({
          ...profile,
          garbaStyles: profile.garbaStyles.filter((s) => s !== style),
        });
      }
    } else {
      setProfile({
        ...profile,
        garbaStyles: [...profile.garbaStyles, style],
      });
    }
  };

  const handleSave = () => {
    onUpdateProfile(profile);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Your Dandiya Profile</span>
            <span className="text-2xl">🪔</span>
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            Customize your Garba stamina, dance styles, and signature dandiya gear to attract matching partners.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {onOpenOnboarding && (
            <button
              type="button"
              onClick={onOpenOnboarding}
              className="px-4 py-2.5 rounded-xl border border-magenta-neon/40 bg-magenta-neon/15 hover:bg-magenta-neon/25 text-magenta-neon hover:text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-neon-magenta"
            >
              <Sparkles className="w-4 h-4" />
              <span>Onboarding Wizard</span>
            </button>
          )}

          <GlowButton
            variant="gold"
            size="md"
            onClick={handleSave}
            className="shadow-neon-gold"
          >
            <Save className="w-4 h-4 text-black" />
            <span>Save Profile</span>
          </GlowButton>
        </div>
      </div>

      {/* Saved Toast Alert */}
      {showSavedToast && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="mb-6 p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold flex items-center gap-2 shadow-lg"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Your Dandiya rhythm profile has been updated and synced with the live venue radar!</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Live Card Preview */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-radiant" />
            <span>Radar Preview (How others see you)</span>
          </div>

          <div className="glass-panel rounded-3xl p-5 border border-gold-radiant/30 relative overflow-hidden">
            <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-4 bg-neutral-900">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12032B] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-xl font-black text-white">
                  {profile.name}, {profile.age}
                </h3>
                <div className="flex items-center gap-1 text-xs text-cyber-turquoise">
                  <MapPin className="w-3 h-3" />
                  <span>{profile.currentVenue.split(",")[0]}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-neutral-300 italic line-clamp-2">
                &ldquo;{profile.bio}&rdquo;
              </p>

              <div className="flex flex-wrap gap-1">
                {profile.garbaStyles.map((style) => (
                  <FestiveBadge key={style} variant="magenta" size="sm">
                    {style}
                  </FestiveBadge>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-white/5 text-xs flex justify-between items-center border border-white/10">
                <span className="text-neutral-400">Energy Level:</span>
                <span className="text-gold-radiant font-bold">⚡ {profile.energyScore} / 10 Turbo</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 text-xs flex justify-between items-center border border-white/10">
                <span className="text-neutral-400">Dandiya Sticks:</span>
                <span className="text-cyber-turquoise font-semibold truncate max-w-[150px]">
                  {profile.dandiyaType}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns: Editor Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Basic Info */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <User className="w-4 h-4 text-cyber-turquoise" />
              <span>Dancer Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-400 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-gold-radiant text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-400 block mb-1">
                  Age
                </label>
                <input
                  type="number"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-gold-radiant text-white text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-400 block mb-1">
                Tonight&apos;s Active Venue / Ground
              </label>
              <select
                value={profile.currentVenue}
                onChange={(e) => setProfile({ ...profile, currentVenue: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#190738] border border-white/15 focus:border-gold-radiant text-white text-sm outline-none cursor-pointer"
              >
                <option value="Dome SVP Stadium, Worli">Dome SVP Stadium, Worli</option>
                <option value="Kora Kendra Grounds, Borivali">Kora Kendra Grounds, Borivali</option>
                <option value="GMDC Ground, Ahmedabad">GMDC Ground, Ahmedabad</option>
                <option value="United Way Garba, Baroda">United Way Garba, Baroda</option>
                <option value="Radio Club, Colaba">Radio Club, Colaba</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-400 block mb-1">
                Festive Bio & Partner Wish
              </label>
              <textarea
                rows={2}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-gold-radiant text-white text-sm outline-none"
              />
            </div>
          </div>

          {/* Section 2: Garba Styles (Multi-select) */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-3">
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <span>💃 Select Your Garba & Raas Styles</span>
            </h3>
            <p className="text-xs text-neutral-400">
              Pick the moves you excel at so your match knows what circle to form.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {garbaStyleOptions.map((style) => {
                const isSelected = profile.garbaStyles.includes(style);
                return (
                  <button
                    key={style}
                    onClick={() => toggleStyle(style)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                      isSelected
                        ? "bg-gradient-to-r from-magenta-neon to-[#d00067] border-white/40 text-white shadow-neon-magenta"
                        : "bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {isSelected ? "✓ " : "+ "}
                    {style}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Energy Stamina Meter */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-gold-radiant" />
                <span>Energy Stamina Meter</span>
              </h3>
              <span className="text-sm font-black text-gold-radiant">
                ⚡ {profile.energyScore} / 10
              </span>
            </div>

            <input
              type="range"
              min="5"
              max="10"
              step="0.1"
              value={profile.energyScore}
              onChange={(e) => setProfile({ ...profile, energyScore: parseFloat(e.target.value) })}
              className="w-full accent-[#FFD700] cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-neutral-400">
              <span>Relaxed 2-Taali (5.0)</span>
              <span>Classic Dodhiya (7.5)</span>
              <span className="text-magenta-neon font-bold">Turbo Sanedo Marathon (10.0)</span>
            </div>
          </div>

          {/* Section 4: Signature Dandiya Gear */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-3">
            <h3 className="font-bold text-lg text-white">
              <span>🪘 Signature Dandiya Sticks Equipment</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {stickOptions.map((stick) => {
                const isSelected = profile.dandiyaType === stick;
                return (
                  <button
                    key={stick}
                    onClick={() => setProfile({ ...profile, dandiyaType: stick })}
                    className={`p-3.5 rounded-2xl text-left border transition-all text-xs font-semibold ${
                      isSelected
                        ? "bg-cyber-turquoise/15 border-cyber-turquoise text-white shadow-neon-cyber"
                        : "bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span>{stick}</span>
                      {isSelected && <span className="text-cyber-turquoise text-sm">●</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
