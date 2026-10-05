"use client";

import React from "react";
import { motion } from "framer-motion";

interface FestiveBadgeProps {
  children?: React.ReactNode;
  label?: string;
  variant?: "magenta" | "gold" | "turquoise" | "velvet";
  size?: "sm" | "md";
  className?: string;
  glow?: boolean;
}

export default function FestiveBadge({
  children,
  label,
  variant = "magenta",
  size = "md",
  className = "",
  glow = false,
}: FestiveBadgeProps) {
  const variantStyles = {
    magenta:
      "bg-magenta-neon/15 text-magenta-neon border-magenta-neon/30 hover:border-magenta-neon/60",
    gold:
      "bg-gold-radiant/15 text-gold-radiant border-gold-radiant/30 hover:border-gold-radiant/60",
    turquoise:
      "bg-cyber-turquoise/15 text-cyber-turquoise border-cyber-turquoise/30 hover:border-cyber-turquoise/60",
    velvet:
      "bg-white/5 text-neutral-300 border-white/10 hover:border-white/20",
  };

  const glowStyles = {
    magenta: "shadow-[0_0_12px_rgba(255,0,127,0.35)]",
    gold: "shadow-[0_0_12px_rgba(255,215,0,0.35)]",
    turquoise: "shadow-[0_0_12px_rgba(0,245,212,0.35)]",
    velvet: "shadow-[0_0_8px_rgba(255,255,255,0.1)]",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-xs sm:text-sm",
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`inline-flex items-center gap-1.5 rounded-full border backdrop-blur-md font-medium tracking-wide transition-all ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${glow ? glowStyles[variant] : ""} ${className}`}
    >
      {label ?? children}
    </motion.span>
  );
}
