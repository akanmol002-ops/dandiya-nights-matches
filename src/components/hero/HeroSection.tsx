"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Flame, Zap, MapPin, ArrowRight } from "lucide-react";
import GlowButton from "../ui/GlowButton";
import FestiveBadge from "../ui/FestiveBadge";

interface HeroSectionProps {
  onStartMatching: () => void;
  onExploreMatches: () => void;
  totalStrikesCount?: number;
}

export default function HeroSection({
  onStartMatching,
  onExploreMatches,
  totalStrikesCount = 24890,
}: HeroSectionProps) {
  const [liveStrikes, setLiveStrikes] = useState(totalStrikesCount);
  const [activeVenueIndex, setActiveVenueIndex] = useState(0);

  const trendingVenues = [
    { name: "Dome SVP Stadium, Worli", activeDancers: 642, status: "High Energy 🔥" },
    { name: "Kora Kendra Grounds, Borivali", activeDancers: 518, status: "Fast Dodhiya 💃" },
    { name: "GMDC Ground, Ahmedabad", activeDancers: 980, status: "Mega Circle 🪘" },
    { name: "United Way Garba, Baroda", activeDancers: 1420, status: "Sanedo Marathon ⚡" },
  ];

  // Micro interaction: simulate live dandiya strikes happening in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStrikes((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Cycle venues smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVenueIndex((prev) => (prev + 1) % trendingVenues.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [trendingVenues.length]);

  return (
    <section className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      {/* Background Ambient Glow Halos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-magenta-neon/20 via-gold-radiant/15 to-cyber-turquoise/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Floating Festive Alert Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-xl shadow-glass">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-turquoise opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-turquoise"></span>
            </span>
            <span className="text-xs sm:text-sm font-medium text-neutral-200">
              Navratri 2026 Season Live • Tonight&apos;s Raas Starts in{" "}
              <span className="text-gold-radiant font-bold">1h 14m</span>
            </span>
            <span className="text-xs text-neutral-400">|</span>
            <span className="text-xs font-semibold text-magenta-neon uppercase tracking-wider hidden sm:inline">
              1,420+ Dancers Online
            </span>
          </div>
        </motion.div>

        {/* Hero Title & Subtitle */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]"
          >
            Find Your Rhythm.{" "}
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-magenta-neon via-gold-radiant to-cyber-turquoise bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,215,0,0.35)]">
              Meet Your Dandiya Partner.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed"
          >
            Stop dancing solo on the sidelines. Match instantly with compatible dancers by{" "}
            <span className="text-white font-medium">Garba Style</span>,{" "}
            <span className="text-gold-radiant font-medium">Energy Stamina</span>, and{" "}
            <span className="text-cyber-turquoise font-medium">Tonight&apos;s Arena Venue</span>.
          </motion.p>

          {/* Interactive CTAs with Hover Light Track Effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <GlowButton
              variant="magenta"
              size="lg"
              onClick={onStartMatching}
              className="w-full sm:w-auto text-base group"
            >
              <span>Find Your Dandiya Partner</span>
              <motion.span
                animate={{ rotate: [0, -15, 15, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 2 }}
                className="text-xl"
              >
                🪘
              </motion.span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </GlowButton>

            <GlowButton
              variant="gold"
              size="lg"
              onClick={onExploreMatches}
              className="w-full sm:w-auto text-base"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Explore Matches & Chat 💬</span>
            </GlowButton>
          </motion.div>
        </div>

        {/* Live Matching Counters & MotionSite Glass Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto"
        >
          {/* Stat 1: Live Dandiya Strikes */}
          <div className="glass-panel rounded-2xl p-6 relative overflow-hidden border border-white/10 hover:border-magenta-neon/40 transition-all duration-300 group">
            <div className="absolute top-0 right-0 p-4 opacity-15 group-hover:opacity-30 transition-opacity">
              <Flame className="w-16 h-16 text-magenta-neon" />
            </div>
            <div className="flex items-center gap-2 text-magenta-neon mb-2 font-semibold text-xs tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-magenta-neon animate-ping" />
              Live Rhythm Strikes
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline gap-1">
              <span>{liveStrikes.toLocaleString()}</span>
              <span className="text-lg text-magenta-neon font-bold">+</span>
            </div>
            <p className="mt-1 text-xs text-neutral-400">
              Dandiya pair matches connected across Mumbai & Gujarat
            </p>
          </div>

          {/* Stat 2: Beat Sync Accuracy */}
          <div className="glass-panel rounded-2xl p-6 relative overflow-hidden border border-white/10 hover:border-gold-radiant/40 transition-all duration-300 group">
            <div className="absolute top-0 right-0 p-4 opacity-15 group-hover:opacity-30 transition-opacity">
              <Zap className="w-16 h-16 text-gold-radiant" />
            </div>
            <div className="flex items-center gap-2 text-gold-radiant mb-2 font-semibold text-xs tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5" />
              Beat Sync Algorithm
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline gap-1">
              <span>98.7%</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gold-radiant/20 text-gold-radiant font-bold ml-2">
                Ultra High
              </span>
            </div>
            <p className="mt-1 text-xs text-neutral-400">
              Dodhiya step timing & BPM sync matching accuracy
            </p>
          </div>

          {/* Stat 3: Trending Ground Venue */}
          <div className="glass-panel rounded-2xl p-6 relative overflow-hidden border border-white/10 hover:border-cyber-turquoise/40 transition-all duration-300 group">
            <div className="absolute top-0 right-0 p-4 opacity-15 group-hover:opacity-30 transition-opacity">
              <MapPin className="w-16 h-16 text-cyber-turquoise" />
            </div>
            <div className="flex items-center gap-2 text-cyber-turquoise mb-2 font-semibold text-xs tracking-wider uppercase">
              <MapPin className="w-3.5 h-3.5" />
              Tonight&apos;s Hot Arena
            </div>
            <div className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
              {trendingVenues[activeVenueIndex].name}
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xs text-cyber-turquoise font-semibold">
                {trendingVenues[activeVenueIndex].activeDancers} Dancers Live
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-neutral-300 font-medium">
                {trendingVenues[activeVenueIndex].status}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Quick Style Chips Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-400"
        >
          <span className="font-semibold text-neutral-300 mr-2">Featured Dance Styles:</span>
          <FestiveBadge variant="magenta" size="sm">💃 64-Step Dodhiya</FestiveBadge>
          <FestiveBadge variant="gold" size="sm">🔥 High-Speed Tran Taali</FestiveBadge>
          <FestiveBadge variant="turquoise" size="sm">🕺 Midnight Sanedo Raas</FestiveBadge>
          <FestiveBadge variant="velvet" size="sm">✨ Cyber-LED Dandiya Pairs</FestiveBadge>
        </motion.div>

      </div>
    </section>
  );
}
