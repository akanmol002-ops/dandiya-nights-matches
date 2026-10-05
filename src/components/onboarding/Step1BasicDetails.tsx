"use client";

import React from "react";
import { User, MapPin, Sparkles, Heart } from "lucide-react";
import { OnboardingFormData } from "../../types";

interface Step1BasicDetailsProps {
  formData: OnboardingFormData;
  setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
}

export default function Step1BasicDetails({
  formData,
  setFormData,
}: Step1BasicDetailsProps) {
  const genderOptions = [
    { id: "Female", label: "Female 💃" },
    { id: "Male", label: "Male 🕺" },
    { id: "Non-Binary", label: "Non-Binary ✨" },
    { id: "Prefer not to say", label: "Private 🔒" },
  ];

  const popularCities = ["Mumbai", "Ahmedabad", "Vadodara", "Surat", "Pune"];

  const festiveBioTemplates = [
    "Can spin for 64-step Dodhiya without getting dizzy! Looking for high-energy partners tonight. 🪘✨",
    "Engineering by day, Dholak beat enthusiast by night. Let's do spontaneous Sanedo battles! 🕺🔥",
    "10 years of Kathiawadi folk dance experience. Let's lead the biggest circle on the floor! 💃👑",
    "Brought extra pairs of LED dandiya sticks. Ready for non-stop Falguni Pathak tracks! ✨🪔",
  ];

  const insertBioTemplate = (template: string) => {
    setFormData((prev) => ({ ...prev, bio: template }));
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <span>Basic Details</span>
          <span className="text-xl">🪔</span>
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Tell fellow dancers who you are and where you&apos;ll be grooving this Navratri.
        </p>
      </div>

      {/* Full Name & Age */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold text-neutral-300 block mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-gold-radiant" />
            <span>Full Name</span>
            <span className="text-magenta-neon">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Arjun Trivedi"
            value={formData.fullName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, fullName: e.target.value }))
            }
            className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 text-sm outline-none transition-all duration-300 focus:border-gold-radiant focus:ring-1 focus:ring-gold-radiant focus:shadow-[0_0_20px_rgba(255,215,0,0.35)]"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-neutral-300 block mb-1.5 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-magenta-neon" />
            <span>Age</span>
            <span className="text-magenta-neon">*</span>
          </label>
          <input
            type="number"
            min={18}
            max={75}
            placeholder="24"
            value={formData.age || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, age: Number(e.target.value) }))
            }
            className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 text-sm outline-none transition-all duration-300 focus:border-gold-radiant focus:ring-1 focus:ring-gold-radiant focus:shadow-[0_0_20px_rgba(255,215,0,0.35)]"
          />
        </div>
      </div>

      {/* Gender Selection */}
      <div>
        <label className="text-xs font-semibold text-neutral-300 block mb-2">
          Gender Identity
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {genderOptions.map((opt) => {
            const isSelected = formData.gender === opt.id;
            return (
              <button
                type="button"
                key={opt.id}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, gender: opt.id }))
                }
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all duration-200 text-center ${
                  isSelected
                    ? "bg-gradient-to-r from-magenta-neon to-[#d00067] border-white/40 text-white shadow-neon-magenta"
                    : "bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 hover:border-gold-radiant/40"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* City / Location */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-cyber-turquoise" />
            <span>City / Metro Area</span>
          </label>
          <span className="text-[11px] text-neutral-400">Quick Pick:</span>
        </div>

        <input
          type="text"
          placeholder="e.g. Mumbai, Maharashtra"
          value={formData.city}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, city: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 text-sm outline-none transition-all duration-300 focus:border-gold-radiant focus:ring-1 focus:ring-gold-radiant focus:shadow-[0_0_20px_rgba(255,215,0,0.35)]"
        />

        {/* Quick city chips */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {popularCities.map((city) => (
            <button
              type="button"
              key={city}
              onClick={() => setFormData((prev) => ({ ...prev, city }))}
              className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                formData.city.includes(city)
                  ? "bg-cyber-turquoise/20 border-cyber-turquoise text-cyber-turquoise font-semibold"
                  : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
              }`}
            >
              📍 {city}
            </button>
          ))}
        </div>
      </div>

      {/* Short Festive Bio */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-neutral-300">
            Short Festive Bio & Partner Vibe
          </label>
          <span className="text-[11px] text-neutral-400 font-mono">
            {formData.bio.length}/160
          </span>
        </div>

        <textarea
          rows={3}
          maxLength={160}
          placeholder="Describe your energy, favorite beats, or who you'd love to dance with..."
          value={formData.bio}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, bio: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 text-sm outline-none transition-all duration-300 focus:border-gold-radiant focus:ring-1 focus:ring-gold-radiant focus:shadow-[0_0_20px_rgba(255,215,0,0.35)] resize-none"
        />

        {/* AI Bio generator suggestions */}
        <div className="mt-2.5">
          <div className="flex items-center gap-1.5 text-[11px] text-gold-radiant font-semibold mb-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Try these festive bio prompts:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {festiveBioTemplates.map((template, i) => (
              <button
                type="button"
                key={i}
                onClick={() => insertBioTemplate(template)}
                className="text-left text-[11px] text-neutral-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-gold-radiant/10 border border-white/5 hover:border-gold-radiant/30 transition-all line-clamp-1"
              >
                &ldquo;{template}&rdquo;
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
