"use client";

import React from "react";
import { ShieldCheck, Heart, Sparkles, Lock, LifeBuoy } from "lucide-react";
import { LegalDocType } from "../../types";

interface FooterProps {
  onOpenLegal: (tab: LegalDocType) => void;
}

export default function Footer({ onOpenLegal }: FooterProps) {
  return (
    <footer className="relative z-20 border-t border-white/10 bg-[#0c021e]/95 backdrop-blur-xl py-8 px-4 sm:px-6 mt-16 text-xs text-neutral-400">
      {/* Top subtle glow line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-radiant/50 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Upper Row: Brand & Policy Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="text-xl">🪔</span>
              <span className="font-extrabold text-base text-white tracking-wide">
                Dandiya Nights Matches
              </span>
            </div>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="text-xs text-neutral-400">
              Navratri Festive Garba Partner Radar & Outfit Sync
            </span>
          </div>

          {/* Quick Legal & Safety Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={() => onOpenLegal("terms")}
              className="text-neutral-300 hover:text-gold-radiant transition-colors font-medium hover:underline"
            >
              Terms & Conditions
            </button>
            <span className="text-neutral-600">•</span>
            <button
              onClick={() => onOpenLegal("privacy")}
              className="text-neutral-300 hover:text-cyber-turquoise transition-colors font-medium hover:underline"
            >
              Privacy Policy
            </button>
            <span className="text-neutral-600">•</span>
            <button
              onClick={() => onOpenLegal("safety")}
              className="text-neutral-300 hover:text-magenta-neon transition-colors font-medium hover:underline flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-magenta-neon" />
              <span>Dandiya Safety Guide</span>
            </button>
            <span className="text-neutral-600">•</span>
            <button
              onClick={() => onOpenLegal("report")}
              className="text-neutral-300 hover:text-red-400 transition-colors font-medium hover:underline flex items-center gap-1"
            >
              <LifeBuoy className="w-3.5 h-3.5 text-red-400" />
              <span>Report an Issue</span>
            </button>
          </div>
        </div>

        {/* Lower Row: Safety Trust Badges & MotionSite AI signature */}
        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="px-2 py-0.5 rounded-full bg-gold-radiant/10 border border-gold-radiant/25 text-gold-radiant font-bold">
              ₹50 Digital Chat Pass
            </span>
            <span className="px-2 py-0.5 rounded-full bg-cyber-turquoise/10 border border-cyber-turquoise/25 text-cyber-turquoise font-semibold">
              🔒 18+ Age Verified Only
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#00e676]/10 border border-[#00e676]/25 text-[#00e676] font-semibold">
              ✓ Zero-Tolerance Safe Grounds
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>Crafted for Navratri with</span>
            <span className="text-magenta-neon font-black">MotionSite AI</span>
            <span>aesthetic</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
