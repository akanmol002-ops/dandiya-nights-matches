"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  Flame,
  Crown,
  Heart,
} from "lucide-react";
import {
  CurrentUserProfile,
  OnboardingFormData,
  GarbaStyle,
  OutfitColor,
  SkillLevel,
} from "../../types";
import Step1BasicDetails from "./Step1BasicDetails";
import Step2DandiyaPreferences from "./Step2DandiyaPreferences";
import Step3PhotoUpload from "./Step3PhotoUpload";
import LiveProfilePreview from "./LiveProfilePreview";
import GlowButton from "../ui/GlowButton";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: CurrentUserProfile;
  onComplete: (updatedUser: CurrentUserProfile) => void;
  onOpenLegal?: (tab: "terms" | "privacy" | "safety") => void;
}

export default function OnboardingModal({
  isOpen,
  onClose,
  currentUser,
  onComplete,
  onOpenLegal,
}: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [primaryPhotoIndex, setPrimaryPhotoIndex] = useState<number>(0);

  // Initialize form data with current user state
  const [formData, setFormData] = useState<OnboardingFormData>({
    fullName: currentUser.name || "Arjun Trivedi",
    age: currentUser.age || 24,
    gender: currentUser.gender || "Male",
    city: currentUser.city || "Mumbai, Maharashtra",
    bio:
      currentUser.bio ||
      "Lover of intense 3-step Dodhiya and late night garba energy! Looking for a partner who keeps up with live dhol beats! 🪘⚡",
    favoriteStyles:
      currentUser.garbaStyles.length > 0
        ? currentUser.garbaStyles
        : ["3-Taali", "Dodhiyu", "Tran-Taali"],
    outfitColor: currentUser.outfitColor || "Radiant Yellow",
    preferredVenue: currentUser.venuePreference || "Kora Kendra Grounds, Borivali",
    skillLevel: currentUser.skillLevel || "Garba Pro",
    photos: currentUser.photos && currentUser.photos.length > 0
      ? [...currentUser.photos]
      : [
          currentUser.avatar,
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        ],
    confirmed18: currentUser.confirmed18 ?? true,
    agreedToTerms: currentUser.agreedToTerms ?? true,
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  // Animation variants for smooth multi-step sliding
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -40 : 40,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setValidationError(null);

    // Step 1 Validation
    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        setValidationError("Please enter your full name.");
        return;
      }
      if (!formData.age || formData.age < 18 || formData.age > 80) {
        setValidationError("Please enter a valid age (18+).");
        return;
      }
      setDirection(1);
      setCurrentStep(2);
      return;
    }

    // Step 2 Validation
    if (currentStep === 2) {
      if (formData.favoriteStyles.length === 0) {
        setValidationError("Please select at least 1 favorite dance style.");
        return;
      }
      setDirection(1);
      setCurrentStep(3);
      return;
    }

    // Step 3 Completion
    if (currentStep === 3) {
      if (formData.photos.length === 0) {
        setValidationError("Please add at least 1 profile photo.");
        return;
      }
      if (!formData.confirmed18) {
        setValidationError("You must confirm you are 18 years of age or older.");
        return;
      }
      if (!formData.agreedToTerms) {
        setValidationError("You must agree to the Terms & Conditions and Privacy Policy.");
        return;
      }

      // Trigger festive celebration confetti
      confetti({
        particleCount: 140,
        spread: 100,
        origin: { y: 0.4 },
        colors: ["#FFD700", "#FF007F", "#00F5D4", "#FFF"],
      });

      // Prepare updated user profile object
      const primaryPhoto = formData.photos[primaryPhotoIndex] || formData.photos[0];
      const updatedUser: CurrentUserProfile = {
        ...currentUser,
        name: formData.fullName,
        age: formData.age,
        gender: formData.gender,
        city: formData.city,
        currentVenue: formData.preferredVenue,
        venuePreference: formData.preferredVenue,
        bio: formData.bio,
        avatar: primaryPhoto,
        photos: formData.photos,
        garbaStyles: formData.favoriteStyles,
        outfitColor: formData.outfitColor,
        skillLevel: formData.skillLevel,
        confirmed18: formData.confirmed18,
        agreedToTerms: formData.agreedToTerms,
        onboardingCompleted: true,
      };

      onComplete(updatedUser);
      onClose();
    }
  };

  const handleBack = () => {
    setValidationError(null);
    setDirection(-1);
    if (currentStep === 3) setCurrentStep(2);
    else if (currentStep === 2) setCurrentStep(1);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl -z-10"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 25 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-5xl bg-[#12032B] rounded-3xl border border-gold-radiant/35 shadow-[0_0_60px_rgba(255,0,127,0.35)] overflow-hidden flex flex-col my-auto max-h-[92vh]"
        >
          {/* Top Bar with Step Progress Tracker */}
          <div className="p-4 sm:p-6 border-b border-white/10 bg-[#190738]/90 backdrop-blur-md flex items-center justify-between">
            
            {/* Title & Festive Icon */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-magenta-neon via-gold-radiant to-cyber-turquoise p-[2px]">
                <div className="w-full h-full bg-[#12032B] rounded-[14px] flex items-center justify-center text-lg">
                  🪔
                </div>
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-1.5">
                  <span>Festive Profile Onboarding</span>
                </h2>
                <span className="text-xs text-cyber-turquoise font-medium">
                  Step {currentStep} of 3 • {currentStep === 1 ? "Basic Details" : currentStep === 2 ? "Dandiya Preferences" : "Photo Upload"}
                </span>
              </div>
            </div>

            {/* Stepper Tabs Tracker */}
            <div className="hidden sm:flex items-center gap-2">
              {[
                { step: 1, label: "Details", icon: "1" },
                { step: 2, label: "Dance Vibe", icon: "2" },
                { step: 3, label: "Photos", icon: "3" },
              ].map((s) => (
                <div
                  key={s.step}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    currentStep === s.step
                      ? "bg-gradient-to-r from-magenta-neon to-gold-radiant text-white shadow-neon-magenta"
                      : currentStep > s.step
                      ? "bg-cyber-turquoise/20 text-cyber-turquoise border border-cyber-turquoise/30"
                      : "bg-white/5 text-neutral-400"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-black/40 flex items-center justify-center text-[10px]">
                    {currentStep > s.step ? "✓" : s.icon}
                  </span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="w-full h-1 bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-magenta-neon via-gold-radiant to-cyber-turquoise shadow-neon-gold"
              initial={{ width: "33%" }}
              animate={{ width: `${(currentStep / 3) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>

          {/* Main Body: 2 Columns (Form on Left, Live Interactive Preview on Right) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Multi-Step Form */}
            <div className="lg:col-span-7 flex flex-col justify-between min-h-[460px]">
              
              {/* Form Content Slide */}
              <div className="relative">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                  >
                    {currentStep === 1 && (
                      <Step1BasicDetails
                        formData={formData}
                        setFormData={setFormData}
                      />
                    )}

                    {currentStep === 2 && (
                      <Step2DandiyaPreferences
                        formData={formData}
                        setFormData={setFormData}
                      />
                    )}

                    {currentStep === 3 && (
                      <Step3PhotoUpload
                        formData={formData}
                        setFormData={setFormData}
                        primaryIndex={primaryPhotoIndex}
                        setPrimaryIndex={setPrimaryPhotoIndex}
                        onOpenLegal={onOpenLegal}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Validation Error Message */}
                {validationError && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-2"
                  >
                    <span>⚠️ {validationError}</span>
                  </motion.div>
                )}
              </div>

              {/* Step Navigation Controls */}
              <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                <GlowButton
                  variant={currentStep === 3 ? "gold" : "magenta"}
                  size="md"
                  onClick={handleNext}
                  className="font-bold text-xs sm:text-sm px-6"
                >
                  {currentStep === 3 ? (
                    <>
                      <Sparkles className="w-4 h-4 text-black" />
                      <span>Complete & Launch Radar 🪘</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {currentStep === 1
                          ? "Next: Dance Preferences"
                          : "Next: Upload Photos"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </GlowButton>
              </div>

            </div>

            {/* Right Column: Live Interactive Profile Preview */}
            <div className="lg:col-span-5 hidden lg:block">
              <LiveProfilePreview
                formData={formData}
                primaryPhotoIndex={primaryPhotoIndex}
              />
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
