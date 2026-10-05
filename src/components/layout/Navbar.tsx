"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Heart, Flame, Volume2, VolumeX, User, Crown, Sparkles } from "lucide-react";
import { CurrentUserProfile } from "../../types";

export type NavTab = "discover" | "matches" | "chat" | "profile";

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  matchesCount: number;
  unreadChatCount: number;
  currentUser: CurrentUserProfile;
  isAudioPlaying: boolean;
  toggleAudio: () => void;
  onOpenOnboarding?: () => void;
}

interface TabItem {
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
  highlight?: boolean;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  matchesCount,
  unreadChatCount,
  currentUser,
  isAudioPlaying,
  toggleAudio,
  onOpenOnboarding,
}: NavbarProps) {
  const tabs: TabItem[] = [
    { id: "discover", label: "Discover", icon: Flame },
    { id: "matches", label: "Matches", icon: Heart, count: matchesCount },
    { id: "chat", label: "Chat", icon: MessageCircle, count: unreadChatCount },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#12032B]/80 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab("discover")}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-magenta-neon via-gold-radiant to-cyber-turquoise p-[2px] shadow-neon-magenta group-hover:shadow-[0_0_30px_rgba(255,0,127,0.8)] transition-all duration-300">
              <div className="w-full h-full bg-[#12032B] rounded-[14px] flex items-center justify-center text-xl">
                🪔
              </div>
            </div>
            {/* Ambient flame glow pulse */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-radiant opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gold-amber"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gold-light to-magenta-neon bg-clip-text text-transparent group-hover:to-cyber-turquoise transition-all duration-300">
                Dandiya Matches
              </span>
              <span className="text-base sm:text-lg">🪔</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-cyber-turquoise tracking-wider uppercase">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyber-turquoise animate-pulse" />
              <span>Navratri Live Radar</span>
            </div>
          </div>
        </div>

        {/* Animated Underline Tab Switcher (MotionSite AI UI) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#190738]/90 p-1.5 rounded-2xl border border-white/10 shadow-inner-glow">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as NavTab)}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 select-none ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
                } ${tab.highlight && !isActive ? "text-gold-light" : ""}`}
              >
                {/* Active Pill Highlight with Framer Motion layoutId */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute inset-0 bg-gradient-to-r from-magenta-neon/30 via-gold-radiant/25 to-cyber-turquoise/30 rounded-xl border border-gold-radiant/40 shadow-[0_0_20px_rgba(255,215,0,0.25)]"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}

                <Icon
                  className={`w-4 h-4 relative z-10 transition-transform ${
                    isActive ? "scale-110 text-gold-radiant" : ""
                  }`}
                />
                
                <span className="relative z-10">{tab.label}</span>

                {/* Counter Badges */}
                {"count" in tab && typeof tab.count === "number" && tab.count > 0 && (
                  <span className="relative z-10 ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-magenta-neon text-white shadow-sm">
                    {tab.count}
                  </span>
                )}

                {tab.highlight && (
                  <span className="relative z-10 ml-0.5 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-gold-radiant/20 text-gold-radiant border border-gold-radiant/40">
                    VIP
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right side utilities: Garba Dhol Beat toggle + Profile avatar */}
        <div className="flex items-center gap-3">
          {/* Onboarding Flow Trigger */}
          {onOpenOnboarding && (
            <button
              onClick={onOpenOnboarding}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-magenta-neon/20 via-gold-radiant/20 to-cyber-turquoise/20 border border-gold-radiant/40 text-gold-light hover:text-white text-xs font-bold transition-all shadow-sm hover:shadow-neon-gold"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-radiant" />
              <span>Onboarding Flow</span>
            </button>
          )}

          {/* Ambient Garba Sound / Visualizer Toggle */}
          <button
            onClick={toggleAudio}
            title={isAudioPlaying ? "Mute Garba Dhol Beat" : "Play Festive Dhol Beat"}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-xs font-medium text-neutral-300 hover:text-white group"
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-cyber-turquoise animate-pulse" />
                <div className="flex items-end gap-[2px] h-3">
                  <span className="w-0.5 bg-cyber-turquoise h-full animate-[pulse_0.4s_ease-in-out_infinite]" />
                  <span className="w-0.5 bg-gold-radiant h-2/3 animate-[pulse_0.6s_ease-in-out_infinite]" />
                  <span className="w-0.5 bg-magenta-neon h-4/5 animate-[pulse_0.5s_ease-in-out_infinite]" />
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-neutral-400 group-hover:text-gold-light" />
                <span className="hidden sm:inline text-neutral-400 group-hover:text-neutral-200">Dhol Beat</span>
              </>
            )}
          </button>

          {/* User Profile Avatar with Golden VIP Halo */}
          <button
            onClick={() => setActiveTab("profile")}
            className="flex items-center gap-2.5 p-1 rounded-2xl hover:bg-white/5 transition-all group"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-gold-radiant via-magenta-neon to-cyber-turquoise shadow-neon-gold group-hover:shadow-[0_0_20px_rgba(255,215,0,0.6)] transition-all">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-cyber-turquoise border-2 border-velvet rounded-full" />
            </div>

            <div className="hidden lg:flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-white group-hover:text-gold-light transition-colors">
                  {currentUser.name}
                </span>
                <span className="text-[10px] px-1 rounded bg-gold-radiant/20 text-gold-radiant font-bold">
                  🪔 Verified
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 truncate max-w-[110px]">
                {currentUser.currentVenue.split(",")[0]}
              </span>
            </div>
          </button>
        </div>

      </div>

      {/* Mobile Bottom Navigation Bar for flawless responsive experience */}
      <div className="md:hidden flex items-center justify-around border-t border-white/10 bg-[#12032B]/95 px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as NavTab)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg relative ${
                isActive ? "text-gold-radiant font-semibold" : "text-neutral-400"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{tab.label}</span>
              {"count" in tab && typeof tab.count === "number" && tab.count > 0 && (
                <span className="absolute top-0 right-2 w-4 h-4 text-[9px] bg-magenta-neon text-white rounded-full flex items-center justify-center font-bold">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}
