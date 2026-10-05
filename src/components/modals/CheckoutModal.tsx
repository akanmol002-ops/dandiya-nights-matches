"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  CreditCard,
  Building2,
  QrCode,
  Lock,
  ArrowRight,
  Sparkles,
  Loader2,
} from "lucide-react";
import { DandiyaProfile } from "../../types";
import GlowButton from "../ui/GlowButton";

interface CheckoutModalProps {
  isOpen: boolean;
  profile: DandiyaProfile | null;
  onClose: () => void;
  onSuccess: (profileId: string) => void;
}

type PaymentMethod = "upi" | "card" | "netbanking" | "qr";

export default function CheckoutModal({
  isOpen,
  profile,
  onClose,
  onSuccess,
}: CheckoutModalProps) {
  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !profile) return null;

  const handlePay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Festive Confetti burst
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.4 },
        colors: ["#FFD700", "#FF007F", "#00F5D4", "#FFF"],
      });

      setTimeout(() => {
        setIsSuccess(false);
        onSuccess(profile.id);
        onClose();
      }, 1600);
    }, 1800);
  };

  const quickUpiApps = [
    { name: "Google Pay", icon: "🟢", id: "gpay" },
    { name: "PhonePe", icon: "🟣", id: "phonepe" },
    { name: "Paytm UPI", icon: "🔵", id: "paytm" },
    { name: "BHIM UPI", icon: "🟠", id: "bhim" },
    { name: "CRED UPI", icon: "⚪", id: "cred" },
  ];

  const popularBanks = [
    "HDFC Bank",
    "ICICI Bank",
    "State Bank of India (SBI)",
    "Axis Bank",
    "Kotak Mahindra",
    "Punjab National Bank",
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={!isProcessing ? onClose : undefined}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl -z-10"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 25 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-lg bg-[#140430] rounded-3xl p-5 sm:p-6 border border-gold-radiant/40 shadow-[0_0_70px_rgba(255,215,0,0.3)] text-neutral-100 overflow-hidden my-auto"
        >
          {/* Close button */}
          {!isProcessing && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-neutral-300 hover:text-white transition-colors z-20"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Success Overlay */}
          {isSuccess ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-10 flex flex-col items-center text-center space-y-3"
            >
              <div className="w-16 h-16 rounded-full bg-[#00e676]/20 border-2 border-[#00e676] flex items-center justify-center text-[#00e676] shadow-[0_0_30px_rgba(0,230,118,0.6)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-white">Payment Successful! 🎉</h3>
              <p className="text-sm text-neutral-300 max-w-xs">
                ₹50 paid. Chat with <span className="text-gold-radiant font-bold">{profile.name}</span> is now unlocked!
              </p>
              <div className="text-xs text-cyber-turquoise font-semibold animate-pulse">
                Opening chat session now... 🪔
              </div>
            </motion.div>
          ) : isProcessing ? (
            <div className="py-16 flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-gold-radiant/20 border-t-gold-radiant animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-xl">
                  🪘
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Processing ₹50 Securely...</h3>
                <p className="text-xs text-neutral-400 mt-1">Connecting to payment gateway</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-cyber-turquoise font-medium">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted Transaction</span>
              </div>
            </div>
          ) : (
            <div>
              {/* Header & Order Summary */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gold-radiant/20 border border-gold-radiant/40 flex items-center justify-center text-lg">
                    🪔
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">Dandiya Chat Checkout</h3>
                    <p className="text-xs text-neutral-400">Unlock 1-on-1 with {profile.name.split(" ")[0]}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-black text-gold-radiant">₹50.00</div>
                  <span className="text-[10px] text-[#00e676] font-bold">Inclusive of taxes</span>
                </div>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-4 gap-1.5 my-4 p-1 bg-white/5 rounded-2xl border border-white/10">
                {[
                  { id: "upi", label: "UPI Apps", icon: Smartphone },
                  { id: "qr", label: "Scan QR", icon: QrCode },
                  { id: "card", label: "Cards", icon: CreditCard },
                  { id: "netbanking", label: "NetBanking", icon: Building2 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isSelected = method === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setMethod(tab.id as PaymentMethod)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                        isSelected
                          ? "bg-gradient-to-r from-magenta-neon to-gold-radiant text-white shadow-neon-magenta"
                          : "text-neutral-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[10px] leading-none">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Method Panels */}
              <div className="min-h-[220px]">
                {/* UPI Panel */}
                {method === "upi" && (
                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-neutral-300 block">
                      Choose Fast UPI App
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {quickUpiApps.map((app) => (
                        <button
                          key={app.id}
                          onClick={() => setUpiId(`user@${app.id}`)}
                          className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-gold-radiant/60 hover:bg-white/10 flex flex-col items-center gap-1 transition-all group text-center"
                        >
                          <span className="text-xl group-hover:scale-110 transition-transform">
                            {app.icon}
                          </span>
                          <span className="text-[10px] font-medium text-neutral-300 group-hover:text-white">
                            {app.name}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-2">
                      <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                        Or enter UPI ID / VPA
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. yourname@okhdfcbank"
                          className="w-full bg-white/5 border border-white/15 focus:border-gold-radiant rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                        />
                        <span className="absolute right-3 top-2.5 text-[11px] text-cyber-turquoise font-bold uppercase">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* QR Code Panel */}
                {method === "qr" && (
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center space-y-2">
                    <div className="w-36 h-36 rounded-2xl bg-white p-2.5 shadow-[0_0_30px_rgba(255,215,0,0.3)] relative group">
                      {/* Stylized QR representation */}
                      <div className="w-full h-full bg-neutral-900 rounded-xl flex flex-col items-center justify-center p-2 text-white text-[10px] font-mono leading-tight">
                        <div className="text-3xl mb-1">📱</div>
                        <div className="font-bold text-gold-radiant">UPI QR</div>
                        <div className="text-[9px] text-neutral-400">Scan to Pay ₹50</div>
                      </div>
                      <div className="absolute inset-0 rounded-2xl border-2 border-gold-radiant animate-pulse pointer-events-none" />
                    </div>
                    <p className="text-xs text-neutral-300 font-semibold">
                      Scan with any UPI App (GPay, PhonePe, Paytm)
                    </p>
                    <p className="text-[10px] text-neutral-400">
                      Payment auto-detects in ~2 seconds once scanned
                    </p>
                  </div>
                )}

                {/* Card Panel */}
                {method === "card" && (
                  <div className="space-y-2.5">
                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength={19}
                        placeholder="4532 •••• •••• 8921"
                        className="w-full bg-white/5 border border-white/15 focus:border-gold-radiant rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-semibold text-neutral-300 block mb-1">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          maxLength={5}
                          placeholder="11/28"
                          className="w-full bg-white/5 border border-white/15 focus:border-gold-radiant rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-neutral-300 block mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          maxLength={4}
                          placeholder="•••"
                          className="w-full bg-white/5 border border-white/15 focus:border-gold-radiant rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Name on card"
                        className="w-full bg-white/5 border border-white/15 focus:border-gold-radiant rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* NetBanking Panel */}
                {method === "netbanking" && (
                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-neutral-300 block">
                      Select Popular Bank
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {popularBanks.map((bank) => (
                        <button
                          key={bank}
                          onClick={() => setSelectedBank(bank)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                            selectedBank === bank
                              ? "bg-gold-radiant/20 border-gold-radiant text-gold-radiant shadow-[0_0_12px_rgba(255,215,0,0.3)]"
                              : "bg-white/5 border-white/10 text-neutral-300 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          🏦 {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Pay Action Button */}
              <div className="pt-4 border-t border-white/10 mt-3">
                <GlowButton
                  variant="gold"
                  size="md"
                  onClick={handlePay}
                  className="w-full justify-center text-sm font-bold shadow-[0_0_25px_rgba(255,215,0,0.4)]"
                >
                  <Lock className="w-4 h-4 mr-1 text-black" />
                  <span>Pay ₹50 & Unlock Chat Now</span>
                  <ArrowRight className="w-4 h-4 ml-1 text-black" />
                </GlowButton>

                <div className="flex items-center justify-center gap-3 mt-3 text-[10px] text-neutral-400">
                  <span className="flex items-center gap-1 text-[#00e676]">
                    <ShieldCheck className="w-3 h-3" />
                    Instant Activation
                  </span>
                  <span>•</span>
                  <span>100% Secure Checkout</span>
                  <span>•</span>
                  <span>Non-refundable digital fee</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
