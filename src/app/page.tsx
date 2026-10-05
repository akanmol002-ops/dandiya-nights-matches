"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar, { NavTab } from "../components/layout/Navbar";
import HeroSection from "../components/hero/HeroSection";
import DiscoverView from "../components/discover/DiscoverView";
import MatchesView from "../components/matches/MatchesView";
import ChatView from "../components/chat/ChatView";
import ProfileView from "../components/profile/ProfileView";
import FestiveParticles from "../components/effects/FestiveParticles";
import MatchCelebrationModal from "../components/modals/MatchCelebrationModal";
import UnlockChatPaywallModal from "../components/modals/UnlockChatPaywallModal";
import CheckoutModal from "../components/modals/CheckoutModal";
import LegalModal from "../components/modals/LegalModal";
import Footer from "../components/layout/Footer";
import GarbaAudioVisualizer from "../components/audio/GarbaAudioVisualizer";
import OnboardingModal from "../components/onboarding/OnboardingModal";
import {
  initialProfiles,
  initialMatches,
  initialChatMessages,
  initialCurrentUser,
} from "../data/mockData";
import {
  DandiyaProfile,
  MatchItem,
  ChatMessage,
  CurrentUserProfile,
  LegalDocType,
} from "../types";

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>("discover");
  const [profiles, setProfiles] = useState<DandiyaProfile[]>(initialProfiles);
  const [matches, setMatches] = useState<MatchItem[]>(initialMatches);
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({
    p1: initialChatMessages,
  });
  const [currentUser, setCurrentUser] = useState<CurrentUserProfile>(initialCurrentUser);
  const [activeChatPartnerId, setActiveChatPartnerId] = useState<string>("p1");
  const [unlockedChatIds, setUnlockedChatIds] = useState<string[]>(["p1"]);
  const [celebrationMatch, setCelebrationMatch] = useState<DandiyaProfile | null>(null);
  const [celebrationIsSuperLike, setCelebrationIsSuperLike] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [totalStrikesCount, setTotalStrikesCount] = useState<number>(24892);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);

  // Paywall & Legal Modals State
  const [paywallTargetProfile, setPaywallTargetProfile] = useState<DandiyaProfile | null>(null);
  const [checkoutTargetProfile, setCheckoutTargetProfile] = useState<DandiyaProfile | null>(null);
  const [legalModalTab, setLegalModalTab] = useState<LegalDocType | null>(null);

  // Helper to verify if chat is unlocked
  const isChatUnlocked = (partnerId: string) => {
    return (
      partnerId === "p1" ||
      unlockedChatIds.includes(partnerId) ||
      (currentUser.unlockedChats && currentUser.unlockedChats.includes(partnerId)) ||
      Boolean(matches.find((m) => m.profile.id === partnerId)?.isUnlocked)
    );
  };

  // Match / Strike Dandiyas handler
  const handleMatch = (profile: DandiyaProfile, isSuperLike = false) => {
    setTotalStrikesCount((prev) => prev + 1);

    const isUnlocked = isChatUnlocked(profile.id);

    const newMatch: MatchItem = {
      id: `m-${Date.now()}`,
      profile,
      matchedAt: "Just now",
      venuePlan: `Meeting at ${profile.venue.split(",")[0]} • 9:30 PM`,
      lastMessage: `You both struck dandiyas with ${profile.compatibility}% rhythm sync! 🪘`,
      unreadCount: 1,
      isUnlocked,
    };

    setMatches((prev) => {
      if (prev.some((m) => m.profile.id === profile.id)) return prev;
      return [newMatch, ...prev];
    });

    // Seed initial greeting message
    setChatMessages((prev) => {
      if (prev[profile.id]) return prev;
      return {
        ...prev,
        [profile.id]: [
          {
            id: `msg-${Date.now()}`,
            senderId: profile.id,
            senderName: profile.name,
            text: `Hey ${currentUser.name}! Happy Navratri! Struck dandiyas with you — ready for some high-energy Garba tonight? 🪘✨`,
            timestamp: "Just now",
            isUser: false,
          },
        ],
      };
    });

    // Trigger celebration modal
    setCelebrationIsSuperLike(isSuperLike);
    setCelebrationMatch(profile);
  };

  const handlePass = (_profileId: string) => {
    // Pass handler
  };

  const handleSuperAarti = (profile: DandiyaProfile) => {
    handleMatch(profile, true);
  };

  const handleResetDeck = () => {
    setProfiles([...initialProfiles]);
  };

  const handleSendMessage = (partnerId: string, text: string, extra?: Partial<ChatMessage>) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random()}`,
      senderId: extra?.senderId ?? "me",
      senderName: extra?.senderName ?? currentUser.name,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: extra?.isUser ?? true,
      messageType: extra?.messageType,
      metadata: extra?.metadata,
    };

    setChatMessages((prev) => ({
      ...prev,
      [partnerId]: [...(prev[partnerId] || []), newMsg],
    }));
  };

  const handleOpenChat = (partnerId: string) => {
    const unlocked = isChatUnlocked(partnerId);
    if (!unlocked) {
      const targetProfile = profiles.find((p) => p.id === partnerId);
      if (targetProfile) {
        setPaywallTargetProfile(targetProfile);
        return;
      }
    }
    setActiveChatPartnerId(partnerId);
    setActiveTab("chat");
  };

  const handleOpenPaywall = (profile: DandiyaProfile) => {
    setPaywallTargetProfile(profile);
  };

  const handleProceedToCheckout = (profile: DandiyaProfile) => {
    setPaywallTargetProfile(null);
    setCheckoutTargetProfile(profile);
  };

  const handlePaymentSuccess = (profileId: string) => {
    setUnlockedChatIds((prev) => Array.from(new Set([...prev, profileId])));

    setMatches((prev) =>
      prev.map((m) =>
        m.profile.id === profileId ? { ...m, isUnlocked: true } : m
      )
    );

    setCurrentUser((prev) => ({
      ...prev,
      unlockedChats: Array.from(new Set([...(prev.unlockedChats || []), profileId])),
    }));

    setActiveChatPartnerId(profileId);
    setActiveTab("chat");
  };

  const handleOpenLegal = (tab: LegalDocType) => {
    setLegalModalTab(tab);
  };

  return (
    <div className="relative min-h-screen bg-velvet text-neutral-100 flex flex-col justify-between selection:bg-magenta-neon selection:text-white">
      {/* Background Interactive Festive Canvas & Glows */}
      <FestiveParticles />

      {/* Web Audio Ambient Garba Dhol Engine */}
      <GarbaAudioVisualizer isPlaying={isAudioPlaying} />

      {/* Glassmorphic Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        matchesCount={matches.length}
        unreadChatCount={1}
        currentUser={currentUser}
        isAudioPlaying={isAudioPlaying}
        toggleAudio={() => setIsAudioPlaying((prev) => !prev)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* Main Dynamic Content */}
      <main className="relative z-10 flex-1 flex flex-col">
        {/* If in Discover tab, show Hero showcase first */}
        {activeTab === "discover" && (
          <HeroSection
            onStartMatching={() => {
              const el = document.getElementById("discover-deck");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            onExploreMatches={() => setActiveTab("matches")}
            totalStrikesCount={totalStrikesCount}
          />
        )}

        <div id="discover-deck" className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === "discover" && (
              <motion.div
                key="discover"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-magenta-neon/15 border border-magenta-neon/30 text-magenta-neon text-xs font-bold uppercase tracking-wider">
                    <span>🪘</span>
                    <span>Live Dandiya Radar</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                    Tonight&apos;s Partner Radar
                  </h2>
                </div>
                <DiscoverView
                  profiles={profiles}
                  currentUser={currentUser}
                  onMatch={handleMatch}
                  onPass={handlePass}
                  onSuperAarti={handleSuperAarti}
                  onResetDeck={handleResetDeck}
                  onOpenOnboarding={() => setIsOnboardingOpen(true)}
                />
              </motion.div>
            )}

            {activeTab === "matches" && (
              <motion.div
                key="matches"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <MatchesView
                  matches={matches}
                  unlockedChatIds={unlockedChatIds}
                  onOpenChat={handleOpenChat}
                  onOpenPaywall={handleOpenPaywall}
                  onExploreMore={() => setActiveTab("discover")}
                />
              </motion.div>
            )}

            {activeTab === "chat" && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <ChatView
                  activePartnerId={activeChatPartnerId}
                  profiles={profiles}
                  matches={matches}
                  messages={chatMessages}
                  currentUser={currentUser}
                  unlockedChatIds={unlockedChatIds}
                  onOpenPaywall={handleOpenPaywall}
                  onSendMessage={handleSendMessage}
                  onSelectPartner={setActiveChatPartnerId}
                />
              </motion.div>
            )}

            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <ProfileView
                  currentUser={currentUser}
                  onUpdateProfile={(updated) => setCurrentUser(updated)}
                  onOpenOnboarding={() => setIsOnboardingOpen(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Dandiya Match Celebration Modal */}
      <MatchCelebrationModal
        matchedProfile={celebrationMatch}
        currentUser={currentUser}
        unlockedChatIds={unlockedChatIds}
        isSuperLike={celebrationIsSuperLike}
        onClose={() => {
          setCelebrationMatch(null);
          setCelebrationIsSuperLike(false);
        }}
        onOpenChat={handleOpenChat}
        onOpenPaywall={handleOpenPaywall}
      />

      {/* ₹50 Unlock Chat Paywall Modal */}
      <UnlockChatPaywallModal
        isOpen={Boolean(paywallTargetProfile)}
        profile={paywallTargetProfile}
        onClose={() => setPaywallTargetProfile(null)}
        onProceedToPay={handleProceedToCheckout}
        onOpenLegal={handleOpenLegal}
      />

      {/* Integrated Checkout Modal (UPI / Card / NetBanking) */}
      <CheckoutModal
        isOpen={Boolean(checkoutTargetProfile)}
        profile={checkoutTargetProfile}
        onClose={() => setCheckoutTargetProfile(null)}
        onSuccess={handlePaymentSuccess}
      />

      {/* Multi-Step Onboarding Profile Flow Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        currentUser={currentUser}
        onComplete={(updatedUser) => {
          setCurrentUser(updatedUser);
        }}
        onOpenLegal={handleOpenLegal}
      />

      {/* Legal & Safety Document Modal */}
      <LegalModal
        isOpen={Boolean(legalModalTab)}
        activeDoc={legalModalTab}
        onClose={() => setLegalModalTab(null)}
        onSelectDoc={(tab) => setLegalModalTab(tab)}
      />

      {/* Global Glassmorphic Footer with Safety & Policy Links */}
      <Footer onOpenLegal={handleOpenLegal} />
    </div>
  );
}
