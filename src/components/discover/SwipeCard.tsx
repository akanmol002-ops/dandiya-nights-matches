"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
  PanInfo,
} from "framer-motion";
import { MapPin, Zap, ShieldCheck, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { DandiyaProfile } from "../../types";
import FestiveBadge from "../ui/FestiveBadge";

interface SwipeCardProps {
  profile: DandiyaProfile;
  isTop: boolean;
  stackIndex: number; // 0 = top, 1, 2 = below
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeUp: () => void;
}

const SWIPE_THRESHOLD = 100;
const SUPER_LIKE_THRESHOLD = -120; // upward y

export default function SwipeCard({
  profile,
  isTop,
  stackIndex,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
}: SwipeCardProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showFullBio, setShowFullBio] = useState(false);
  const photos = profile.photos?.length ? profile.photos : [profile.avatar];

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();

  // Rotation: ±20° based on x drag
  const rotate = useTransform(x, [-220, 0, 220], [-20, 0, 20]);

  // Overlay opacities
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const passOpacity = useTransform(x, [-100, -20], [1, 0]);
  const superLikeOpacity = useTransform(y, [-120, -50], [1, 0]);

  const isDragging = useRef(false);

  const handleDragEnd = async (_: unknown, info: PanInfo) => {
    const { offset } = info;
    isDragging.current = false;

    if (offset.y < SUPER_LIKE_THRESHOLD && Math.abs(offset.x) < 80) {
      // Super Like — swipe up
      await controls.start({
        y: -700,
        opacity: 0,
        transition: { duration: 0.4, ease: "easeOut" },
      });
      onSwipeUp();
    } else if (offset.x > SWIPE_THRESHOLD) {
      // Like — swipe right
      await controls.start({
        x: 600,
        rotate: 25,
        opacity: 0,
        transition: { duration: 0.35, ease: "easeOut" },
      });
      onSwipeRight();
    } else if (offset.x < -SWIPE_THRESHOLD) {
      // Pass — swipe left
      await controls.start({
        x: -600,
        rotate: -25,
        opacity: 0,
        transition: { duration: 0.35, ease: "easeOut" },
      });
      onSwipeLeft();
    } else {
      // Snap back
      controls.start({
        x: 0,
        y: 0,
        rotate: 0,
        transition: { type: "spring", stiffness: 400, damping: 28 },
      });
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
  };
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((i) => (i + 1) % photos.length);
  };

  // Stack visual offsets for cards behind the top
  const stackScale = 1 - stackIndex * 0.045;
  const stackY = stackIndex * 14;

  return (
    <motion.div
      drag={isTop ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragStart={() => { isDragging.current = true; }}
      onDragEnd={handleDragEnd}
      animate={controls}
      style={{
        x: isTop ? x : 0,
        y: isTop ? y : stackY,
        rotate: isTop ? rotate : 0,
        scale: stackScale,
        zIndex: 10 - stackIndex,
        position: "absolute",
        width: "100%",
        touchAction: "none",
      }}
      className="select-none"
    >
      <div className="relative w-full h-[560px] sm:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        {/* Photo */}
        <div className="absolute inset-0 bg-[#0c021e]">
          <img
            src={photos[photoIndex]}
            alt={profile.name}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Gradient overlay — info panel */}
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0a011c]/95 via-[#0a011c]/60 to-transparent pointer-events-none" />

        {/* Photo nav hit areas */}
        {isTop && photos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 inset-y-0 w-1/3 z-20 flex items-center justify-start pl-3 opacity-0 hover:opacity-100 transition-opacity group"
            >
              <span className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-black/60 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </span>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 inset-y-0 w-1/3 z-20 flex items-center justify-end pr-3 opacity-0 hover:opacity-100 transition-opacity group"
            >
              <span className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-black/60 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </span>
            </button>
          </>
        )}

        {/* Photo dots */}
        {photos.length > 1 && (
          <div className="absolute top-3 inset-x-0 flex justify-center gap-1.5 z-20 pointer-events-none">
            {photos.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === photoIndex
                    ? "bg-white w-6 shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                    : "bg-white/40 w-3"
                }`}
              />
            ))}
          </div>
        )}

        {/* ── Swipe Direction Overlays ── */}
        {/* Like (right) */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute inset-0 z-30 pointer-events-none flex items-start justify-start pt-12 pl-8"
        >
          <div className="rotate-[-22deg] border-4 border-[#00e676] rounded-xl px-4 py-2">
            <span className="text-[#00e676] text-2xl font-black tracking-widest uppercase drop-shadow-[0_0_10px_rgba(0,230,118,0.9)]">
              Chalo Garba! 💖
            </span>
          </div>
        </motion.div>

        {/* Pass (left) */}
        <motion.div
          style={{ opacity: passOpacity }}
          className="absolute inset-0 z-30 pointer-events-none flex items-start justify-end pt-12 pr-8"
        >
          <div className="rotate-[22deg] border-4 border-[#ff3d57] rounded-xl px-4 py-2">
            <span className="text-[#ff3d57] text-2xl font-black tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,61,87,0.9)]">
              Agli Baar ❌
            </span>
          </div>
        </motion.div>

        {/* Super Like (up) */}
        <motion.div
          style={{ opacity: superLikeOpacity }}
          className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
        >
          <div className="border-4 border-[#FFD700] rounded-xl px-6 py-3">
            <span className="text-[#FFD700] text-2xl font-black tracking-widest uppercase drop-shadow-[0_0_12px_rgba(255,215,0,1)]">
              Gold Stick 🪔
            </span>
          </div>
        </motion.div>

        {/* ── Profile Info ── */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-5 space-y-2">
          {/* Name / Age / Verified */}
          <div className="flex items-end gap-2.5 flex-wrap">
            <h2 className="text-2xl font-black text-white leading-none">
              {profile.name}
            </h2>
            <span className="text-lg font-bold text-white/80 leading-none">{profile.age}</span>
            {profile.verified && (
              <ShieldCheck className="w-5 h-5 text-cyber-turquoise drop-shadow-[0_0_6px_rgba(0,245,212,0.8)]" />
            )}
            {profile.online && (
              <span className="flex items-center gap-1 text-[10px] text-[#00e676] font-bold px-2 py-0.5 rounded-full bg-[#00e676]/15 border border-[#00e676]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse" />
                Online
              </span>
            )}
          </div>

          {/* Location / Distance */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-300">
            <MapPin className="w-3.5 h-3.5 text-magenta-neon" />
            <span>{profile.city}</span>
            <span className="text-neutral-500">·</span>
            <span>{profile.distanceKm} km away</span>
            {profile.skillLevel && (
              <>
                <span className="text-neutral-500">·</span>
                <Zap className="w-3.5 h-3.5 text-gold-radiant" />
                <span className="text-gold-radiant font-semibold">{profile.skillLevel}</span>
              </>
            )}
          </div>

          {/* Bio */}
          <p
            className={`text-xs text-neutral-300 leading-relaxed cursor-pointer ${
              showFullBio ? "" : "line-clamp-2"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setShowFullBio((v) => !v);
            }}
          >
            {profile.bio}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {profile.badges.slice(0, 3).map((badge) => (
              <FestiveBadge key={badge} label={badge} size="sm" />
            ))}
            {profile.badges.length > 3 && (
              <span className="text-[10px] text-neutral-400 self-center">
                +{profile.badges.length - 3} more
              </span>
            )}
          </div>

          {/* Compatibility bar */}
          <div className="flex items-center gap-2 pt-1">
            <Star className="w-3.5 h-3.5 text-gold-radiant" />
            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${profile.compatibility}%` }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-magenta-neon to-gold-radiant shadow-[0_0_8px_rgba(255,215,0,0.5)]"
              />
            </div>
            <span className="text-[11px] font-bold text-gold-radiant">
              {profile.compatibility}% match
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
