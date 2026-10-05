"use client";

import React, { useRef, useState } from "react";
import { Upload, X, Crown, Sparkles, Plus, Image as ImageIcon, Check } from "lucide-react";
import { OnboardingFormData } from "../../types";

interface Step3PhotoUploadProps {
  formData: OnboardingFormData;
  setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
  primaryIndex: number;
  setPrimaryIndex: (index: number) => void;
  onOpenLegal?: (tab: "terms" | "privacy" | "safety") => void;
}

export default function Step3PhotoUpload({
  formData,
  setFormData,
  primaryIndex,
  setPrimaryIndex,
  onOpenLegal,
}: Step3PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample curated ethnic festive avatars for instant 1-click selection
  const curatedAvatars = [
    {
      label: "Festive Kurta (Arjun)",
      url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    },
    {
      label: "Mirror Choli (Aanya)",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    },
    {
      label: "Dholak Beats (Rohan)",
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    },
    {
      label: "Turquoise Ghagra (Diya)",
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    },
    {
      label: "Kathiawadi Lead (Kabir)",
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    },
    {
      label: "Baroda Raas (Meera)",
      url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const remainingSlots = 4 - formData.photos.length;
    if (remainingSlots <= 0) return;

    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setFormData((prev) => {
            if (prev.photos.length >= 4) return prev;
            return {
              ...prev,
              photos: [...prev.photos, result],
            };
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removePhoto = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, idx) => idx !== indexToRemove),
    }));
    if (primaryIndex === indexToRemove) {
      setPrimaryIndex(0);
    } else if (primaryIndex > indexToRemove) {
      setPrimaryIndex(primaryIndex - 1);
    }
  };

  const addCuratedPhoto = (url: string) => {
    if (formData.photos.includes(url)) return;
    if (formData.photos.length >= 4) return;
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, url],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <span>Upload Profile Photos</span>
          <span className="text-xl">📸</span>
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Upload up to 4 photos showing off your festive traditional look. The primary photo is shown first on the radar!
        </p>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative p-6 sm:p-8 rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer text-center group ${
          isDragging
            ? "border-gold-radiant bg-gold-radiant/10 shadow-[0_0_35px_rgba(255,215,0,0.4)]"
            : "border-white/20 hover:border-gold-radiant/60 bg-white/5 hover:bg-white/[0.08]"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-magenta-neon via-gold-radiant to-cyber-turquoise p-[2px] shadow-neon-magenta group-hover:scale-110 transition-transform">
          <div className="w-full h-full bg-[#12032B] rounded-[14px] flex items-center justify-center">
            <Upload className="w-6 h-6 text-gold-radiant" />
          </div>
        </div>

        <h4 className="text-sm sm:text-base font-bold text-white">
          Drop photos here, or <span className="text-gold-radiant underline">browse files</span>
        </h4>
        <p className="text-xs text-neutral-400 mt-1">
          Supports PNG, JPG, WEBP • Max 4 photos ({formData.photos.length}/4 used)
        </p>
      </div>

      {/* 4-Photo Upload Grid with Glowing Neon Preview Borders */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-neutral-300">
            Profile Photo Grid (Tap Crown to set Primary)
          </label>
          <span className="text-[11px] text-neutral-400">
            {formData.photos.length} of 4 slots filled
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {[0, 1, 2, 3].map((slotIdx) => {
            const photoUrl = formData.photos[slotIdx];
            const isPrimary = slotIdx === primaryIndex;

            return (
              <div
                key={slotIdx}
                className={`relative aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-300 ${
                  photoUrl
                    ? isPrimary
                      ? "border-2 border-gold-radiant shadow-[0_0_25px_rgba(255,215,0,0.5)] ring-2 ring-gold-radiant/30"
                      : "border-2 border-magenta-neon/70 shadow-[0_0_15px_rgba(255,0,127,0.35)]"
                    : "border-2 border-dashed border-white/15 bg-white/[0.02] flex flex-col items-center justify-center text-neutral-500 hover:border-white/30 cursor-pointer"
                }`}
                onClick={() => {
                  if (!photoUrl) fileInputRef.current?.click();
                }}
              >
                {photoUrl ? (
                  <>
                    <img
                      src={photoUrl}
                      alt={`Photo ${slotIdx + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay for controls */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

                    {/* Top Row: Primary Badge or Make Primary */}
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                      {isPrimary ? (
                        <span className="px-2 py-0.5 rounded-full bg-gold-radiant text-black text-[10px] font-black uppercase flex items-center gap-1 shadow-md">
                          <Crown className="w-3 h-3 fill-black" />
                          <span>Primary</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPrimaryIndex(slotIdx);
                          }}
                          title="Set as Primary Profile Photo"
                          className="p-1 rounded-lg bg-black/60 text-neutral-300 hover:text-gold-radiant border border-white/20 transition-colors"
                        >
                          <Crown className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removePhoto(slotIdx);
                        }}
                        title="Remove photo"
                        className="p-1 rounded-lg bg-rose-500/80 hover:bg-rose-600 text-white transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Bottom slot label */}
                    <div className="absolute bottom-2 left-2 text-[10px] text-white/80 font-medium">
                      Slot {slotIdx + 1}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-1.5 p-3 text-center">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                      <Plus className="w-4 h-4 text-neutral-400" />
                    </div>
                    <span className="text-[11px] font-medium text-neutral-400">
                      Slot {slotIdx + 1}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Select Curated Festive Avatars Gallery */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gold-radiant">
            <Sparkles className="w-4 h-4" />
            <span>Fast Setup: Choose Festive Sample Looks</span>
          </div>
          <span className="text-[11px] text-neutral-400">1-click attach</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {curatedAvatars.map((item, i) => {
            const isAlreadyAdded = formData.photos.includes(item.url);
            return (
              <button
                type="button"
                key={i}
                disabled={isAlreadyAdded || formData.photos.length >= 4}
                onClick={() => addCuratedPhoto(item.url)}
                className={`relative aspect-square rounded-xl overflow-hidden border transition-all ${
                  isAlreadyAdded
                    ? "border-cyber-turquoise opacity-60 cursor-default"
                    : "border-white/20 hover:border-gold-radiant hover:scale-105 cursor-pointer"
                }`}
              >
                <img
                  src={item.url}
                  alt={item.label}
                  className="w-full h-full object-cover"
                />
                {isAlreadyAdded && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Check className="w-4 h-4 text-cyber-turquoise stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mandatory Age & Terms Consent Checkboxes */}
      <div className="p-4 rounded-2xl bg-[#190738] border border-gold-radiant/30 shadow-[0_0_20px_rgba(255,215,0,0.1)] space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-gold-radiant">
          <Sparkles className="w-4 h-4" />
          <span>Mandatory Safety & Age Consent</span>
        </div>

        {/* Checkbox 1: 18+ */}
        <label className="flex items-start gap-3 cursor-pointer group select-none">
          <div className="relative mt-0.5">
            <input
              type="checkbox"
              checked={formData.confirmed18}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  confirmed18: e.target.checked,
                }))
              }
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                formData.confirmed18
                  ? "bg-gradient-to-r from-magenta-neon to-gold-radiant border-gold-radiant shadow-[0_0_12px_rgba(255,215,0,0.5)] text-white"
                  : "border-white/30 bg-white/5 group-hover:border-gold-radiant/60"
              }`}
            >
              {formData.confirmed18 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>
          <span className="text-xs text-neutral-200 group-hover:text-white leading-relaxed">
            I confirm I am <strong>18 years of age or older</strong> to discover and match with Dandiya partners.
          </span>
        </label>

        {/* Checkbox 2: Terms & Conditions */}
        <label className="flex items-start gap-3 cursor-pointer group select-none">
          <div className="relative mt-0.5">
            <input
              type="checkbox"
              checked={formData.agreedToTerms}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  agreedToTerms: e.target.checked,
                }))
              }
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                formData.agreedToTerms
                  ? "bg-gradient-to-r from-magenta-neon to-gold-radiant border-gold-radiant shadow-[0_0_12px_rgba(255,215,0,0.5)] text-white"
                  : "border-white/30 bg-white/5 group-hover:border-gold-radiant/60"
              }`}
            >
              {formData.agreedToTerms && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>
          <span className="text-xs text-neutral-200 group-hover:text-white leading-relaxed">
            I agree to the{" "}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenLegal?.("terms");
              }}
              className="text-gold-radiant underline hover:text-white"
            >
              Terms & Conditions
            </button>{" "}
            (including ₹50 digital chat unlock policy) and{" "}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenLegal?.("privacy");
              }}
              className="text-cyber-turquoise underline hover:text-white"
            >
              Privacy Policy
            </button>
            .
          </span>
        </label>
      </div>
    </div>
  );
}
