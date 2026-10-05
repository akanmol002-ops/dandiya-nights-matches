"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MapPin,
  ShieldCheck,
  Mic,
  Smile,
  Eye,
  Music,
  Shirt,
  MapPinned,
  Play,
  Pause,
  ChevronDown,
} from "lucide-react";
import { ChatMessage, DandiyaProfile, MatchItem, CurrentUserProfile } from "../../types";
import FestiveBadge from "../ui/FestiveBadge";
import GlowButton from "../ui/GlowButton";
import OutfitCoordinatorModal from "./OutfitCoordinatorModal";

// ── Mock realtime engine ─────────────────────────────────────────────────────
const AUTO_RESPONSES: Record<string, string[]> = {
  default: [
    "Yes absolutely! Meet me by Gate 3 near the big Dhol setup in 15 mins! 🪘💃",
    "Haha yes! My rhythm is on point tonight. Let's do the 64-step Dodhiya! ✨",
    "Sounds like a plan! Bringing my A-game energy! ⚡🎉",
    "Perfect! Keep an eye out for my outfit! See you on the floor! 🪔",
    "Can't wait! Let's sync our dandiya sticks and own that circle 🔥",
  ],
  outfit: [
    "Love it! Our outfits are going to look amazing together on the dance floor! 🥻✨",
    "Great coordination! I'll make sure my dandiya sticks match too! 🪔",
  ],
  venue: [
    "Perfect timing! I'll be there early to grab a good spot near the stage 🎟️",
    "See you there! Let's meet at the main entrance and find the best circle together 🪘",
  ],
  track: [
    "Omg that's my absolute favorite! Let's request the DJ to play it when we're dancing! 🎵🔥",
    "Such a banger! I know all the steps for this one. We're going to kill it! 💃",
  ],
};

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Garba track library ──────────────────────────────────────────────────────
const GARBA_TRACKS = [
  { name: "Chogada Tara", artist: "Darshan Raval (Live Dhol Mix)", duration: "4:32", emoji: "🪘" },
  { name: "Dholida", artist: "Gangubai (Raas Remix)", duration: "3:58", emoji: "💃" },
  { name: "Sanedo", artist: "Electric Dhol EDM", duration: "5:14", emoji: "⚡" },
  { name: "Nagada Sang Dhol Baje", artist: "Ram-Leela OST", duration: "4:45", emoji: "🥁" },
  { name: "Dholi Taro Dhol Baaje", artist: "Hum Dil De Chuke Sanam", duration: "5:02", emoji: "🪔" },
];

// ── Component ────────────────────────────────────────────────────────────────
interface ChatViewProps {
  activePartnerId: string;
  profiles: DandiyaProfile[];
  matches: MatchItem[];
  messages: Record<string, ChatMessage[]>;
  currentUser: CurrentUserProfile;
  unlockedChatIds?: string[];
  onOpenPaywall?: (profile: DandiyaProfile) => void;
  onSendMessage: (partnerId: string, text: string, msg?: Partial<ChatMessage>) => void;
  onSelectPartner: (partnerId: string) => void;
}

export default function ChatView({
  activePartnerId,
  profiles,
  matches,
  messages,
  currentUser,
  unlockedChatIds = [],
  onOpenPaywall,
  onSendMessage,
  onSelectPartner,
}: ChatViewProps) {
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showOutfitModal, setShowOutfitModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [trackPlaying, setTrackPlaying] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const activePartner = profiles.find((p) => p.id === activePartnerId) ?? profiles[0];
  const partnerMessages = messages[activePartnerId] || [];

  const isCurrentChatUnlocked =
    activePartner.id === "p1" ||
    (currentUser.unlockedChats && currentUser.unlockedChats.includes(activePartner.id)) ||
    unlockedChatIds.includes(activePartner.id) ||
    Boolean(matches.find((m) => m.profile.id === activePartner.id)?.isUnlocked);

  // Matched partner IDs for sidebar
  const matchedPartnerIds = new Set(matches.map((m) => m.profile.id));

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [partnerMessages.length, isTyping]);

  // Mock real-time response engine
  const simulateReply = useCallback(
    (category: string = "default") => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
      setIsTyping(true);
      const delay = 1200 + Math.random() * 1400;
      typingTimeout.current = setTimeout(() => {
        setIsTyping(false);
        const pool = AUTO_RESPONSES[category] ?? AUTO_RESPONSES.default;
        const response = randomFrom(pool);
        onSendMessage(activePartnerId, response, {
          senderId: activePartnerId,
          senderName: activePartner.name,
          isUser: false,
        });
      }, delay);
    },
    [activePartnerId, activePartner.name, onSendMessage]
  );

  const handleSend = (textToSend?: string, extra?: Partial<ChatMessage>) => {
    if (!isCurrentChatUnlocked) {
      if (onOpenPaywall) onOpenPaywall(activePartner);
      return;
    }
    const text = textToSend ?? inputText;
    if (!text.trim()) return;

    onSendMessage(activePartnerId, text, extra);
    setInputText("");
    simulateReply(extra?.messageType ?? "default");
  };

  // ── Quick action: Coordinate Outfits ────────────────────────────────────
  const handleSendOutfitCard = () => {
    const msg: Partial<ChatMessage> = {
      messageType: "outfit-compare",
      metadata: {
        userOutfit: currentUser.outfitColor,
        partnerOutfit: activePartner.outfitColor,
        compatNote: "Let's coordinate our looks!",
      },
    };
    handleSend(`🥻 Outfit Coordination — I'm wearing ${currentUser.outfitColor}! What about you?`, msg);
  };

  // ── Quick action: Sync Venue ────────────────────────────────────────────
  const handleSendVenueCard = () => {
    const msg: Partial<ChatMessage> = {
      messageType: "venue-sync",
      metadata: {
        venueName: activePartner.venue,
        venueTime: "9:30 PM Tonight",
      },
    };
    handleSend(`🎟️ Venue Sync — Let's meet at ${activePartner.venue.split(",")[0]}! I'll be there by 9:30 PM.`, msg);
  };

  // ── Quick action: Send Garba Track ──────────────────────────────────────
  const handleSendTrack = () => {
    const track = randomFrom(GARBA_TRACKS);
    const msg: Partial<ChatMessage> = {
      messageType: "garba-track",
      metadata: {
        trackName: track.name,
        trackArtist: track.artist,
      },
    };
    handleSend(`🎵 ${track.name} — ${track.artist}. This should be our Dandiya anthem tonight!`, msg);
  };

  const festiveEmojis = ["🪘", "🪔", "💃", "🕺", "✨", "🔥", "👑", "🥻", "🎟️", "🎵", "⚡", "🙏"];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4 sm:py-6">
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden flex flex-col md:flex-row h-[720px]">

        {/* ════════════════════ LEFT: Matches Sidebar ═══════════════════════ */}
        <div className={`${showSidebar ? "block" : "hidden"} md:block w-full md:w-80 border-r border-white/10 bg-[#0e0225]/95 backdrop-blur-xl flex flex-col flex-shrink-0`}>
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <span>Dandiya Conversations</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-magenta-neon/20 text-magenta-neon font-bold border border-magenta-neon/30">
                {matches.length}
              </span>
            </h3>
            <p className="text-[10px] text-neutral-500 mt-0.5">Your mutual Dandiya matches</p>
          </div>

          {/* Conversations list */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
            {matches.map((match) => {
              const partner = match.profile;
              const isActive = partner.id === activePartnerId;
              const isPartnerUnlocked =
                partner.id === "p1" ||
                (currentUser.unlockedChats && currentUser.unlockedChats.includes(partner.id)) ||
                unlockedChatIds.includes(partner.id) ||
                match.isUnlocked;

              const lastMsg = (messages[partner.id] || []).slice(-1)[0]?.text ?? match.lastMessage ?? partner.bio;
              const unread = match.unreadCount ?? 0;

              return (
                <button
                  key={partner.id}
                  onClick={() => { onSelectPartner(partner.id); setShowSidebar(false); }}
                  className={`w-full text-left p-3 rounded-2xl transition-all duration-200 flex items-center gap-3 ${
                    isActive
                      ? "bg-gradient-to-r from-magenta-neon/15 to-gold-radiant/10 border border-gold-radiant/30 shadow-[0_0_12px_rgba(255,215,0,0.1)]"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {/* Avatar with online ring */}
                  <div className="relative shrink-0">
                    <div className={`w-12 h-12 rounded-xl overflow-hidden ${
                      isPartnerUnlocked
                        ? partner.online
                          ? "ring-2 ring-cyber-turquoise shadow-[0_0_8px_rgba(0,245,212,0.4)]"
                          : "ring-1 ring-white/10"
                        : "ring-1 ring-gold-radiant/40"
                    }`}>
                      <img src={partner.avatar} alt={partner.name} className="w-full h-full object-cover" />
                    </div>
                    {partner.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-cyber-turquoise border-2 border-[#0e0225] rounded-full animate-pulse" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-bold text-sm text-white truncate">{partner.name}</span>
                        {partner.verified && <ShieldCheck className="w-3.5 h-3.5 text-cyber-turquoise flex-shrink-0" />}
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {isPartnerUnlocked ? (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#00e676]/15 text-[#00e676] font-bold border border-[#00e676]/30">
                            Active
                          </span>
                        ) : (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-gold-radiant/15 text-gold-radiant font-bold border border-gold-radiant/30">
                            ₹50 Lock
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] text-neutral-400 truncate">{lastMsg}</p>
                  </div>

                  {/* Unread badge */}
                  {unread > 0 && (
                    <span className="ml-1 w-5 h-5 rounded-full bg-gold-radiant text-[10px] font-black text-black flex items-center justify-center flex-shrink-0 shadow-[0_0_8px_rgba(255,215,0,0.5)]">
                      {unread}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Empty sidebar */}
            {matches.length === 0 && (
              <div className="text-center py-12 text-neutral-500 text-xs">
                <p className="text-2xl mb-2">🪘</p>
                <p>No matches yet! Keep swiping in Discover to find your Dandiya partner.</p>
              </div>
            )}
          </div>
        </div>

        {/* ════════════════════ RIGHT: Chat Window ══════════════════════════ */}
        <div className="flex-1 flex flex-col bg-[#12032B]/90 min-w-0">

          {/* ── Chat Header ─────────────────────────────────────────────── */}
          <div className="p-4 border-b border-white/10 bg-[#15043a]/80 backdrop-blur-md flex items-center justify-between gap-2 flex-shrink-0">
            {/* Mobile back btn */}
            <button
              onClick={() => setShowSidebar(true)}
              className="md:hidden p-2 rounded-xl bg-white/8 text-neutral-300 hover:text-white transition-colors mr-1"
            >
              <ChevronDown className="w-4 h-4 rotate-90" />
            </button>

            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={activePartner.avatar}
                  alt={activePartner.name}
                  className="w-11 h-11 rounded-xl object-cover border border-gold-radiant/30"
                />
                {activePartner.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-cyber-turquoise border-2 border-[#15043a] rounded-full" />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4 className="font-bold text-sm sm:text-base text-white truncate">{activePartner.name}</h4>
                  {activePartner.verified && <ShieldCheck className="w-4 h-4 text-cyber-turquoise flex-shrink-0" />}
                  {/* Outfit color badge */}
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-gold-radiant/15 text-gold-radiant font-bold border border-gold-radiant/25">
                    {activePartner.outfitColor.length > 18 ? activePartner.outfitColor.slice(0, 18) + "…" : activePartner.outfitColor}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1 text-cyber-turquoise">
                    <MapPin className="w-3 h-3" />
                    {activePartner.venue.split(",")[0]}
                  </span>
                  <span>•</span>
                  <span>⚡ {activePartner.energyScore}/10</span>
                  <span>•</span>
                  <span>{activePartner.compatibility}% sync</span>
                </div>
              </div>
            </div>

            {/* View Profile btn */}
            <button
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/8 border border-white/15 text-xs text-neutral-300 hover:text-white hover:bg-white/12 transition-colors flex-shrink-0"
            >
              <Eye className="w-3.5 h-3.5" />
              Profile
            </button>
          </div>

          {/* ── Messages Feed ───────────────────────────────────────────── */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-white/10 relative">
            {/* Match start indicator */}
            <div className="text-center py-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-radiant/10 border border-gold-radiant/20 text-gold-radiant text-xs font-semibold">
                <span>🪔</span>
                <span>Dandiya Match — {activePartner.compatibility}% Rhythm Sync</span>
              </div>
            </div>

            {!isCurrentChatUnlocked ? (
              /* Locked Conversation Glass Overlay Card */
              <div className="py-8 px-4 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-6 sm:p-8 rounded-3xl bg-[#1b063d]/95 border border-gold-radiant/40 shadow-[0_0_50px_rgba(255,215,0,0.25)] text-center max-w-md w-full space-y-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gold-radiant/20 border border-gold-radiant/50 flex items-center justify-center text-2xl mx-auto shadow-neon-gold">
                    🔒
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">Conversation Locked</h3>
                    <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                      Unlock 1-on-1 messaging, Dandiya Outfit Coordinator, and Venue Sync with <span className="text-gold-radiant font-bold">{activePartner.name}</span> for a one-time fee of <strong className="text-white">₹50</strong>.
                    </p>
                  </div>

                  {/* Feature preview list */}
                  <div className="space-y-1.5 text-left text-xs bg-white/5 p-3 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2 text-neutral-200">
                      <span className="text-gold-radiant">✓</span> Direct unlimited chat & voice note mockup
                    </div>
                    <div className="flex items-center gap-2 text-neutral-200">
                      <span className="text-gold-radiant">✓</span> Side-by-side Dandiya Outfit Coordinator 🥻
                    </div>
                    <div className="flex items-center gap-2 text-neutral-200">
                      <span className="text-gold-radiant">✓</span> Public Venue & Timing synchronization 🎟️
                    </div>
                  </div>

                  <GlowButton
                    variant="gold"
                    size="md"
                    onClick={() => onOpenPaywall?.(activePartner)}
                    className="w-full justify-center font-black text-sm shadow-neon-gold"
                  >
                    <span>Pay ₹50 & Unlock Chat 💬</span>
                  </GlowButton>

                  <p className="text-[10px] text-neutral-400">
                    Instant activation • No subscription • 100% Secure UPI / Card
                  </p>
                </motion.div>
              </div>
            ) : (
              <>
                {partnerMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`flex flex-col ${msg.isUser ? "items-end" : "items-start"}`}
                  >
                    {/* Rich message cards */}
                    {msg.messageType === "outfit-compare" && msg.metadata && (
                      <div className={`max-w-[85%] sm:max-w-[72%] px-4 py-3 rounded-2xl border mb-1 ${
                        msg.isUser ? "bg-gradient-to-r from-[#2d0a5e] to-[#1e0845] border-gold-radiant/20 rounded-br-none" : "bg-[#1e0845] border-white/10 rounded-bl-none"
                      }`}>
                        <div className="flex items-center gap-2 text-xs text-gold-radiant font-bold mb-2">
                          <Shirt className="w-3.5 h-3.5" />
                          Outfit Coordination
                        </div>
                        <div className="flex items-center gap-3 text-xs text-neutral-200">
                          <span className="px-2 py-1 rounded-lg bg-white/10">You: {msg.metadata.userOutfit}</span>
                          <span className="text-gold-radiant">⚡</span>
                          <span className="px-2 py-1 rounded-lg bg-white/10">{activePartner.name.split(" ")[0]}: {msg.metadata.partnerOutfit}</span>
                        </div>
                      </div>
                    )}

                    {msg.messageType === "venue-sync" && msg.metadata && (
                      <div className={`max-w-[85%] sm:max-w-[72%] px-4 py-3 rounded-2xl border mb-1 ${
                        msg.isUser ? "bg-gradient-to-r from-[#0a2e3d] to-[#0e1e3d] border-cyber-turquoise/20 rounded-br-none" : "bg-[#0e1e3d] border-white/10 rounded-bl-none"
                      }`}>
                        <div className="flex items-center gap-2 text-xs text-cyber-turquoise font-bold mb-2">
                          <MapPinned className="w-3.5 h-3.5" />
                          Venue Sync
                        </div>
                        <p className="text-xs text-white font-semibold">{msg.metadata.venueName}</p>
                        <p className="text-[11px] text-neutral-400 mt-0.5">🕘 {msg.metadata.venueTime}</p>
                      </div>
                    )}

                    {msg.messageType === "garba-track" && msg.metadata && (
                      <div className={`max-w-[85%] sm:max-w-[72%] px-4 py-3 rounded-2xl border mb-1 ${
                        msg.isUser ? "bg-gradient-to-r from-[#3d0a2e] to-[#2d0a1e] border-magenta-neon/20 rounded-br-none" : "bg-[#2d0a1e] border-white/10 rounded-bl-none"
                      }`}>
                        <div className="flex items-center gap-2 text-xs text-magenta-neon font-bold mb-2">
                          <Music className="w-3.5 h-3.5" />
                          Garba Track
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-white font-semibold">{msg.metadata.trackName}</p>
                            <p className="text-[11px] text-neutral-400">{msg.metadata.trackArtist}</p>
                          </div>
                          <button
                            onClick={() => setTrackPlaying(trackPlaying === msg.id ? null : msg.id)}
                            className="w-8 h-8 rounded-full bg-magenta-neon/20 border border-magenta-neon/40 flex items-center justify-center text-magenta-neon hover:bg-magenta-neon/30 transition-colors"
                          >
                            {trackPlaying === msg.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Text bubble */}
                    <div
                      className={`max-w-[85%] sm:max-w-[72%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.isUser
                          ? "bg-gradient-to-r from-magenta-neon to-[#c9005f] text-white rounded-br-none shadow-[0_0_12px_rgba(255,0,127,0.25)]"
                          : "bg-[#1e0845] text-neutral-100 rounded-bl-none border border-white/10"
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[10px] text-neutral-500 mt-1 px-1">{msg.timestamp}</span>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <img src={activePartner.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#1e0845] rounded-2xl rounded-bl-none border border-white/10">
                        <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-2 h-2 rounded-full bg-gold-radiant" />
                        <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} className="w-2 h-2 rounded-full bg-magenta-neon" />
                        <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} className="w-2 h-2 rounded-full bg-cyber-turquoise" />
                      </div>
                      <span className="text-[10px] text-neutral-500">{activePartner.name.split(" ")[0]} is typing…</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Quick Action Pills ──────────────────────────────────────── */}
          <div className="px-4 py-2 bg-[#0c021e]/60 border-t border-white/5 flex gap-2 overflow-x-auto scrollbar-none flex-shrink-0">
            <button
              onClick={() => {
                if (!isCurrentChatUnlocked) {
                  onOpenPaywall?.(activePartner);
                } else {
                  setShowOutfitModal(true);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-radiant/10 border border-gold-radiant/30 text-xs text-gold-radiant font-semibold hover:bg-gold-radiant/20 transition-colors whitespace-nowrap"
            >
              <Shirt className="w-3 h-3" />
              Coordinate Outfits 🥻
            </button>
            <button
              onClick={() => {
                if (!isCurrentChatUnlocked) {
                  onOpenPaywall?.(activePartner);
                } else {
                  handleSendVenueCard();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyber-turquoise/10 border border-cyber-turquoise/30 text-xs text-cyber-turquoise font-semibold hover:bg-cyber-turquoise/20 transition-colors whitespace-nowrap"
            >
              <MapPinned className="w-3 h-3" />
              Sync Venue 🎟️
            </button>
            <button
              onClick={() => {
                if (!isCurrentChatUnlocked) {
                  onOpenPaywall?.(activePartner);
                } else {
                  handleSendTrack();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-magenta-neon/10 border border-magenta-neon/30 text-xs text-magenta-neon font-semibold hover:bg-magenta-neon/20 transition-colors whitespace-nowrap"
            >
              <Music className="w-3 h-3" />
              Send Garba Track 🎵
            </button>
          </div>

          {/* ── Emoji Tray (toggleable) ─────────────────────────────────── */}
          <AnimatePresence>
            {showEmoji && isCurrentChatUnlocked && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-[#0c021e]/80 border-t border-white/5 flex-shrink-0"
              >
                <div className="flex flex-wrap gap-1 p-3">
                  {festiveEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setInputText((prev) => prev + emoji)}
                      className="p-2 hover:bg-white/10 rounded-lg text-lg transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Chat Input Bar ──────────────────────────────────────────── */}
          <div className="p-3 sm:p-4 border-t border-white/10 bg-[#15043a]/90 backdrop-blur-md flex items-center gap-2 flex-shrink-0">
            {/* Emoji toggle */}
            <button
              onClick={() => {
                if (!isCurrentChatUnlocked) {
                  onOpenPaywall?.(activePartner);
                } else {
                  setShowEmoji((v) => !v);
                }
              }}
              className={`p-2 rounded-xl transition-colors ${showEmoji ? "bg-gold-radiant/20 text-gold-radiant" : "bg-white/8 text-neutral-400 hover:text-white hover:bg-white/12"}`}
            >
              <Smile className="w-5 h-5" />
            </button>

            {/* Input */}
            <input
              type="text"
              value={inputText}
              disabled={!isCurrentChatUnlocked}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={
                isCurrentChatUnlocked
                  ? `Message ${activePartner.name.split(" ")[0]}...`
                  : `🔒 Unlock chat for ₹50 to message ${activePartner.name.split(" ")[0]}...`
              }
              className={`flex-1 bg-white/5 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 outline-none transition-all ${
                isCurrentChatUnlocked
                  ? "border-white/15 focus:border-gold-radiant/60 focus:shadow-[0_0_12px_rgba(255,215,0,0.15)]"
                  : "border-gold-radiant/20 cursor-pointer opacity-70"
              }`}
              onClick={() => {
                if (!isCurrentChatUnlocked) onOpenPaywall?.(activePartner);
              }}
            />

            {/* Voice note mockup */}
            <button
              onClick={() => {
                if (!isCurrentChatUnlocked) onOpenPaywall?.(activePartner);
              }}
              className="p-2 rounded-xl bg-white/8 text-neutral-400 hover:text-white hover:bg-white/12 transition-colors"
            >
              <Mic className="w-5 h-5" />
            </button>

            {/* Send / Unlock Button */}
            {isCurrentChatUnlocked ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSend()}
                disabled={!inputText.trim()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-magenta-neon to-gold-radiant text-white font-bold disabled:opacity-30 hover:shadow-[0_0_16px_rgba(255,0,127,0.4)] transition-all flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            ) : (
              <button
                onClick={() => onOpenPaywall?.(activePartner)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-radiant to-amber-500 text-black font-black text-xs hover:shadow-neon-gold transition-all"
              >
                Unlock ₹50
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Outfit Coordinator Modal ────────────────────────────────────── */}
      <OutfitCoordinatorModal
        isOpen={showOutfitModal}
        partner={activePartner}
        currentUser={currentUser}
        onClose={() => setShowOutfitModal(false)}
        onSendCard={handleSendOutfitCard}
      />
    </div>
  );
}
