"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Heart, MapPin, Zap, Clock, ShieldCheck, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import { MatchItem, DandiyaProfile } from "../../types";
import FestiveBadge from "../ui/FestiveBadge";
import GlowButton from "../ui/GlowButton";

interface MatchesViewProps {
  matches: MatchItem[];
  unlockedChatIds?: string[];
  onOpenChat: (profileId: string) => void;
  onOpenPaywall?: (profile: DandiyaProfile) => void;
  onExploreMore: () => void;
}

export default function MatchesView({
  matches,
  unlockedChatIds = [],
  onOpenChat,
  onOpenPaywall,
  onExploreMore,
}: MatchesViewProps) {
  const [filter, setFilter] = useState<"all" | "tonight">("all");

  const filteredMatches = matches.filter((m) => {
    if (filter === "tonight") return m.venuePlan.includes("Tonight") || m.matchedAt.includes("now") || m.matchedAt.includes("hours");
    return true;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Your Dandiya Strikes 🪘
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-magenta-neon/20 text-magenta-neon border border-magenta-neon/30 text-xs font-bold">
              {matches.length} Mutual Matches
            </span>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Partners who struck dandiyas back. Plan your venue meetups and lock your circles!
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 bg-[#190738] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === "all"
                ? "bg-magenta-neon text-white shadow-neon-magenta font-semibold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            All Matches ({matches.length})
          </button>
          <button
            onClick={() => setFilter("tonight")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === "tonight"
                ? "bg-gold-radiant text-black shadow-neon-gold font-semibold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Tonight&apos;s Raas
          </button>
        </div>
      </div>

      {/* Matches Grid */}
      {filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMatches.map((match, idx) => {
            const isChatUnlocked = match.isUnlocked || unlockedChatIds.includes(match.profile.id);

            return (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className={`glass-panel rounded-2xl p-5 border transition-all duration-300 relative group flex flex-col justify-between ${
                    isChatUnlocked
                      ? "border-white/10 hover:border-cyber-turquoise/40 shadow-[0_0_20px_rgba(0,245,212,0.05)]"
                      : "border-gold-radiant/25 hover:border-gold-radiant/60 shadow-[0_0_25px_rgba(255,215,0,0.08)]"
                  }`}
                >
                  <div>
                    {/* Top Row: Avatar & Compatibility & Lock Status */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className={`w-14 h-14 rounded-2xl overflow-hidden p-[2px] ${
                            isChatUnlocked
                              ? "bg-gradient-to-tr from-magenta-neon via-gold-radiant to-cyber-turquoise shadow-neon-cyber"
                              : "bg-gradient-to-tr from-gold-radiant to-amber-500 shadow-neon-gold"
                          }`}>
                            <img
                              src={match.profile.avatar}
                              alt={match.profile.name}
                              className="w-full h-full object-cover rounded-[14px]"
                            />
                          </div>
                          {match.profile.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-cyber-turquoise border-2 border-velvet rounded-full" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="font-bold text-base text-white group-hover:text-gold-light transition-colors">
                              {match.profile.name}
                            </h3>
                            {match.profile.verified && (
                              <ShieldCheck className="w-4 h-4 text-cyber-turquoise" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-neutral-400">
                              {match.profile.age} yrs • {match.profile.city}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold-radiant/15 border border-gold-radiant/30 text-gold-radiant text-xs font-bold">
                          <Zap className="w-3 h-3 fill-gold-radiant" />
                          {match.profile.compatibility}%
                        </div>
                        {isChatUnlocked ? (
                          <span className="text-[10px] text-[#00e676] font-bold px-1.5 py-0.2 rounded-full bg-[#00e676]/10 border border-[#00e676]/30 flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            Active
                          </span>
                        ) : (
                          <span className="text-[10px] text-gold-radiant font-bold px-1.5 py-0.2 rounded-full bg-gold-radiant/15 border border-gold-radiant/40 flex items-center gap-1 shadow-sm">
                            <Lock className="w-2.5 h-2.5" />
                            ₹50 Lock
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Dance Style chips */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {match.profile.garbaStyles.slice(0, 2).map((style) => (
                        <FestiveBadge key={style} variant="velvet" size="sm">
                          {style}
                        </FestiveBadge>
                      ))}
                      <FestiveBadge variant="gold" size="sm">
                        ⚡ {match.profile.energyScore} Stamina
                      </FestiveBadge>
                    </div>

                    {/* Venue Meetup Plan Box */}
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-4 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-neutral-300">
                        <MapPin className="w-3.5 h-3.5 text-magenta-neon shrink-0" />
                        <span className="font-semibold text-white truncate">
                          {match.profile.venue}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                        <Clock className="w-3 h-3 text-gold-radiant shrink-0" />
                        <span>{match.venuePlan}</span>
                      </div>
                    </div>

                    {/* Last message preview if any */}
                    {match.lastMessage && (
                      <p className="text-xs text-neutral-300 italic mb-4 line-clamp-1 bg-white/[0.03] p-2 rounded-lg border border-white/5">
                        &ldquo;{match.lastMessage}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                    {isChatUnlocked ? (
                      <>
                        <GlowButton
                          variant="magenta"
                          size="sm"
                          onClick={() => onOpenChat(match.profile.id)}
                          className="flex-1 font-bold"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Open Chat</span>
                        </GlowButton>

                        <button
                          onClick={() => onOpenChat(match.profile.id)}
                          title="Plan Raas"
                          className="px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-cyber-turquoise hover:text-white transition-colors flex items-center gap-1"
                        >
                          <span>🥻 Outfit</span>
                        </button>
                      </>
                    ) : (
                      <GlowButton
                        variant="gold"
                        size="sm"
                        onClick={() => {
                          if (onOpenPaywall) {
                            onOpenPaywall(match.profile);
                          } else {
                            onOpenChat(match.profile.id);
                          }
                        }}
                        className="w-full justify-center font-black text-xs shadow-neon-gold"
                      >
                        <Lock className="w-3.5 h-3.5 text-black mr-1" />
                        <span>Unlock Chat for ₹50 💳</span>
                      </GlowButton>
                    )}
                  </div>
                </motion.div>
              );
            })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 glass-panel rounded-3xl border border-white/10 max-w-md mx-auto">
          <Heart className="w-16 h-16 text-magenta-neon/40 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white">No Matches in this view yet</h3>
          <p className="text-neutral-400 text-sm mt-1 px-4">
            Strike dandiyas with more dancers in the Discover radar to build your festive circle!
          </p>
          <GlowButton variant="magenta" onClick={onExploreMore} className="mt-6 mx-auto">
            Discover Partners
          </GlowButton>
        </div>
      )}
    </div>
  );
}
