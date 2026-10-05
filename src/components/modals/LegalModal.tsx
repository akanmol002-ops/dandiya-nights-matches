"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShieldCheck,
  FileText,
  Lock,
  LifeBuoy,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  MapPin,
  Eye,
  Send,
} from "lucide-react";
import { LegalDocType } from "../../types";
import GlowButton from "../ui/GlowButton";

interface LegalModalProps {
  isOpen: boolean;
  activeDoc: LegalDocType | null;
  onClose: () => void;
  onSelectDoc?: (doc: LegalDocType) => void;
}

export default function LegalModal({
  isOpen,
  activeDoc,
  onClose,
  onSelectDoc,
}: LegalModalProps) {
  const [currentTab, setCurrentTab] = useState<LegalDocType>(activeDoc || "terms");
  const [reportCategory, setReportCategory] = useState("Inappropriate Behavior");
  const [reportDetails, setReportDetails] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Sync with prop when opened
  React.useEffect(() => {
    if (activeDoc) {
      setCurrentTab(activeDoc);
      setReportSubmitted(false);
    }
  }, [activeDoc]);

  if (!isOpen) return null;

  const handleTabChange = (tab: LegalDocType) => {
    setCurrentTab(tab);
    setReportSubmitted(false);
    onSelectDoc?.(tab);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportDetails.trim()) return;
    setReportSubmitted(true);
    setTimeout(() => {
      setReportDetails("");
    }, 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl -z-10"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 25 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-3xl bg-[#12032B] rounded-3xl border border-gold-radiant/30 shadow-[0_0_60px_rgba(255,215,0,0.2)] text-neutral-100 overflow-hidden flex flex-col my-auto max-h-[90vh]"
        >
          {/* Header & Tabs */}
          <div className="p-4 sm:p-6 border-b border-white/10 bg-[#18053a]/90 backdrop-blur-md flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-gold-radiant via-magenta-neon to-cyber-turquoise p-[2px]">
                <div className="w-full h-full bg-[#12032B] rounded-[14px] flex items-center justify-center text-lg">
                  📜
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  Safety, Terms & Legal Center
                </h3>
                <p className="text-xs text-neutral-400">
                  Dandiya Nights Matches Official Guidelines
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Pill Switcher */}
          <div className="flex items-center gap-1.5 p-2 bg-[#1a063b] border-b border-white/10 overflow-x-auto shrink-0 scrollbar-none">
            {[
              { id: "terms", label: "Terms & Conditions", icon: FileText },
              { id: "privacy", label: "Privacy Policy", icon: Lock },
              { id: "safety", label: "Dandiya Safety Guide", icon: ShieldCheck },
              { id: "report", label: "Report an Issue", icon: LifeBuoy },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as LegalDocType)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-r from-magenta-neon to-gold-radiant text-white shadow-neon-magenta"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Body */}
          <div className="flex-1 p-5 sm:p-7 overflow-y-auto space-y-6 text-xs sm:text-sm text-neutral-300 leading-relaxed scrollbar-thin scrollbar-thumb-white/10">
            {/* 1. TERMS & CONDITIONS */}
            {currentTab === "terms" && (
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-gold-radiant/10 border border-gold-radiant/30 text-gold-radiant flex items-start gap-3">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <h4 className="font-bold text-sm text-white">Summary of Core Terms</h4>
                    <p className="text-xs text-neutral-300 mt-0.5">
                      By accessing Dandiya Nights Matches, you explicitly agree to our 18+ eligibility rule, ₹50 digital chat fee policy, and zero-tolerance code for harassment.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <section>
                    <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-1.5">
                      <span>1. 18+ Age & Eligibility Requirement</span>
                    </h4>
                    <p>
                      You must be at least 18 years of age to register an account, discover matching dancers, or initiate chat conversations on Dandiya Nights Matches. Any profile determined to be created by or depicting a minor under 18 will be permanently banned immediately.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-1.5">
                      <span>2. ₹50 Digital Chat Fee Policy</span>
                    </h4>
                    <p>
                      Dandiya Nights Matches does not charge monthly subscription fees. Instead, starting a direct 1-on-1 chat session with any mutual match requires a one-time non-refundable digital access fee of <strong>₹50 (INR)</strong> per match.
                    </p>
                    <ul className="list-disc pl-5 mt-1.5 space-y-1 text-xs text-neutral-400">
                      <li>The ₹50 fee grants perpetual messaging, Outfit Coordinator access, and venue coordination for that specific matched partner.</li>
                      <li>Once a chat session is unlocked, the digital service is deemed delivered and consumed; therefore, payments are strictly non-refundable.</li>
                      <li>No recurring or hidden charges will be applied.</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-1.5">
                      <span>3. Venue Rules & Decorum at Garba Grounds</span>
                    </h4>
                    <p>
                      Navratri is an auspicious traditional celebration. Dandiya Nights Matches maintains a <strong>Strict Zero Tolerance Policy</strong> regarding:
                    </p>
                    <ul className="list-disc pl-5 mt-1.5 space-y-1 text-xs text-neutral-400">
                      <li>Harassment, non-consensual physical contact, or stalking inside or outside Garba venues.</li>
                      <li>Taking non-consensual photos or videos of fellow dancers.</li>
                      <li>Impersonation, scamming, or misrepresentation of identity or ticket passes.</li>
                      <li>Violators will be permanently blacklisted and reported to local authorities and event security.</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-1.5">
                      <span>4. Limitation of Liability</span>
                    </h4>
                    <p>
                      Dandiya Nights Matches is a partner discovery platform. Users are solely responsible for their personal safety, communications, and transport arrangements when meeting matches at public event venues.
                    </p>
                  </section>
                </div>
              </div>
            )}

            {/* 2. PRIVACY POLICY */}
            {currentTab === "privacy" && (
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-cyber-turquoise/10 border border-cyber-turquoise/30 text-cyber-turquoise flex items-start gap-3">
                  <Lock className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white">Your Privacy is Protected</h4>
                    <p className="text-xs text-neutral-300 mt-0.5">
                      We treat your Navratri festive data with state-of-the-art encryption and strict privacy boundaries.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <section>
                    <h4 className="text-sm sm:text-base font-bold text-white mb-1.5">
                      1. Data Encryption & Security
                    </h4>
                    <p>
                      All private chats, outfit coordination notes, and photo uploads are transmitted over 256-bit SSL encrypted channels. Payments are handled via certified payment gateways (UPI / RBI-approved aggregators); card and banking credentials are never stored on our servers.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-sm sm:text-base font-bold text-white mb-1.5">
                      2. Approximate Location Privacy
                    </h4>
                    <p>
                      We never display your exact live GPS coordinates to other users. Only approximate city-level distances (e.g., &ldquo;2.4 km away&rdquo;) and your selected public venue preferences (e.g., &ldquo;Kora Kendra Grounds&rdquo;) are visible.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-sm sm:text-base font-bold text-white mb-1.5">
                      3. Account & Photo Control
                    </h4>
                    <p>
                      You retain full ownership of your photos and profile details. You can edit, update, or remove profile photos at any time via the Profile tab.
                    </p>
                  </section>
                </div>
              </div>
            )}

            {/* 3. DANDIYA SAFETY GUIDE */}
            {currentTab === "safety" && (
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-magenta-neon/10 border border-magenta-neon/30 flex items-start gap-3">
                  <span className="text-2xl">🪔</span>
                  <div>
                    <h4 className="font-bold text-sm text-white">Navratri Garba Partner Safety Guide</h4>
                    <p className="text-xs text-neutral-300 mt-0.5">
                      Follow these 5 essential safety rules when meeting your Dandiya match at public venues.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-gold-radiant font-bold text-xs uppercase">
                      <span>1. Public Meeting Spots Only</span>
                    </div>
                    <p className="text-xs text-neutral-300">
                      Always meet inside well-lit, registered Garba grounds (e.g., near Main Stage, Gate 2, or food stalls). Never agree to meet in isolated parking zones.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-cyber-turquoise font-bold text-xs uppercase">
                      <span>2. Use the Buddy System</span>
                    </div>
                    <p className="text-xs text-neutral-300">
                      Inform your friends or family about whom you are meeting and share your live location via WhatsApp or emergency SOS before entering the venue.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-magenta-neon font-bold text-xs uppercase">
                      <span>3. Plan Safe Late-Night Travel</span>
                    </div>
                    <p className="text-xs text-neutral-300">
                      Arrange your own verified transport (rideshare/metro/carpool with friends) beforehand to ensure safe return after late-night Garba circles.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-[#00e676] font-bold text-xs uppercase">
                      <span>4. Trust Your Instincts</span>
                    </div>
                    <p className="text-xs text-neutral-300">
                      If anyone makes you uncomfortable or pressures you, step back into a crowded dance circle and notify on-ground event bouncers or police immediately.
                    </p>
                  </div>
                </div>

                {/* Emergency Helplines Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-red-500/20 to-magenta-neon/20 border border-red-500/40 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-white text-xs sm:text-sm">
                    <PhoneCall className="w-4 h-4 text-red-400" />
                    <span>Official Emergency Helplines (24x7)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-black/40 border border-white/10 text-center">
                      <p className="text-neutral-400 text-[10px]">Police</p>
                      <p className="text-white font-black text-sm">112 / 100</p>
                    </div>
                    <div className="p-2 rounded-xl bg-black/40 border border-white/10 text-center">
                      <p className="text-neutral-400 text-[10px]">Women Helpline</p>
                      <p className="text-white font-black text-sm">1091</p>
                    </div>
                    <div className="p-2 rounded-xl bg-black/40 border border-white/10 text-center">
                      <p className="text-neutral-400 text-[10px]">Medical Emergency</p>
                      <p className="text-white font-black text-sm">108</p>
                    </div>
                    <div className="p-2 rounded-xl bg-black/40 border border-white/10 text-center">
                      <p className="text-neutral-400 text-[10px]">Anti-Harassment</p>
                      <p className="text-white font-black text-sm">1090</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. REPORT AN ISSUE */}
            {currentTab === "report" && (
              <div className="space-y-4">
                {reportSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="py-8 text-center space-y-3"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#00e676]/20 border-2 border-[#00e676] flex items-center justify-center text-[#00e676] mx-auto shadow-[0_0_30px_rgba(0,230,118,0.5)]">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-xl font-black text-white">Report Submitted Successfully</h4>
                    <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                      Our 24x7 Safety & Moderation Team has received your report and will take action within 15 minutes.
                    </p>
                    <button
                      onClick={() => setReportSubmitted(false)}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white"
                    >
                      File another report
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmitReport} className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                        Select Issue Type
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Inappropriate Behavior",
                          "Fake Profile or Photos",
                          "Underage Account (<18)",
                          "Venue Harassment / Scam",
                          "Payment / ₹50 Unlock Issue",
                          "Other Concern",
                        ].map((cat) => (
                          <button
                            type="button"
                            key={cat}
                            onClick={() => setReportCategory(cat)}
                            className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                              reportCategory === cat
                                ? "bg-magenta-neon/20 border-magenta-neon text-white shadow-[0_0_12px_rgba(255,0,127,0.3)]"
                                : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                        Describe the Incident or Profile
                      </label>
                      <textarea
                        value={reportDetails}
                        onChange={(e) => setReportDetails(e.target.value)}
                        required
                        rows={4}
                        placeholder="Provide details such as user name, what occurred, or date/time..."
                        className="w-full bg-white/5 border border-white/15 focus:border-gold-radiant rounded-xl p-3 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none resize-none"
                      />
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-neutral-400">
                      🛡️ All reports are confidential. Our moderation team reviews flagged accounts swiftly.
                    </div>

                    <GlowButton
                      type="submit"
                      variant="magenta"
                      size="md"
                      className="w-full justify-center text-xs sm:text-sm font-bold"
                    >
                      <Send className="w-4 h-4 mr-1.5" />
                      <span>Submit Confidential Report</span>
                    </GlowButton>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Footer Close */}
          <div className="p-4 border-t border-white/10 bg-[#18053a]/90 backdrop-blur-md flex items-center justify-between shrink-0">
            <span className="text-[11px] text-neutral-400">
              Dandiya Nights Matches • Festive Safety Standard
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
