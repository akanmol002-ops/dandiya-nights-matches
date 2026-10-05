"use client";

import React from "react";
import { motion } from "framer-motion";
import { RotateCcw, X, Flame, Heart, Info } from "lucide-react";

interface FloatingActionBarProps {
  onRewind: () => void;
  onPass: () => void;
  onSuperLike: () => void;
  onLike: () => void;
  onInfo: () => void;
  canRewind: boolean;
  superLikesLeft: number;
}

const ActionBtn = ({
  onClick,
  children,
  className,
  disabled = false,
  title,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className: string;
  disabled?: boolean;
  title?: string;
}) => (
  <motion.button
    whileHover={{ scale: disabled ? 1 : 1.12 }}
    whileTap={{ scale: disabled ? 1 : 0.92 }}
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${
      disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
    } ${className}`}
  >
    {children}
  </motion.button>
);

export default function FloatingActionBar({
  onRewind,
  onPass,
  onSuperLike,
  onLike,
  onInfo,
  canRewind,
  superLikesLeft,
}: FloatingActionBarProps) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {/* Rewind */}
      <ActionBtn
        onClick={onRewind}
        disabled={!canRewind}
        title="Rewind last swipe"
        className="w-12 h-12 bg-white/8 backdrop-blur-md border border-white/15 text-amber-400 hover:bg-amber-400/15 hover:border-amber-400/40 hover:shadow-[0_0_18px_rgba(251,191,36,0.4)]"
      >
        <RotateCcw className="w-5 h-5" />
      </ActionBtn>

      {/* Pass */}
      <ActionBtn
        onClick={onPass}
        title="Pass — Agli Baar ❌"
        className="w-16 h-16 bg-[#ff3d57]/10 backdrop-blur-md border border-[#ff3d57]/30 text-[#ff3d57] hover:bg-[#ff3d57]/20 hover:border-[#ff3d57] hover:shadow-[0_0_24px_rgba(255,61,87,0.6)]"
      >
        <X className="w-7 h-7" />
      </ActionBtn>

      {/* Super Like (center / tallest) */}
      <ActionBtn
        onClick={onSuperLike}
        title="Super Like — Gold Stick 🪔"
        className="w-20 h-20 bg-gradient-to-br from-[#FFD700]/20 to-[#FF8C00]/20 backdrop-blur-md border-2 border-[#FFD700]/60 text-[#FFD700] hover:bg-[#FFD700]/25 hover:border-[#FFD700] hover:shadow-[0_0_32px_rgba(255,215,0,0.8)] shadow-[0_0_16px_rgba(255,215,0,0.3)]"
      >
        <div className="flex flex-col items-center gap-0.5">
          <Flame className="w-7 h-7" />
          {superLikesLeft > 0 && (
            <span className="text-[9px] font-black text-[#FFD700] leading-none">
              {superLikesLeft}x
            </span>
          )}
        </div>
      </ActionBtn>

      {/* Like */}
      <ActionBtn
        onClick={onLike}
        title="Like — Chalo Garba! 💖"
        className="w-16 h-16 bg-[#FF007F]/10 backdrop-blur-md border border-[#FF007F]/30 text-[#FF007F] hover:bg-[#FF007F]/20 hover:border-[#FF007F] hover:shadow-[0_0_24px_rgba(255,0,127,0.6)]"
      >
        <Heart className="w-7 h-7" />
      </ActionBtn>

      {/* Profile Info */}
      <ActionBtn
        onClick={onInfo}
        title="View full profile"
        className="w-12 h-12 bg-white/8 backdrop-blur-md border border-white/15 text-cyber-turquoise hover:bg-cyber-turquoise/15 hover:border-cyber-turquoise/40 hover:shadow-[0_0_18px_rgba(0,245,212,0.4)]"
      >
        <Info className="w-5 h-5" />
      </ActionBtn>
    </div>
  );
}
