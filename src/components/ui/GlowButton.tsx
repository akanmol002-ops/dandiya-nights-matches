"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlowButtonProps extends HTMLMotionProps<"button"> {
  variant?: "magenta" | "gold" | "turquoise" | "glass";
  glow?: boolean;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function GlowButton({
  variant = "magenta",
  glow: _glow = true,
  children,
  className = "",
  size = "md",
  ...props
}: GlowButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const variantStyles = {
    magenta:
      "bg-gradient-to-r from-[#FF007F] via-[#E60067] to-[#B8005A] text-white shadow-neon-magenta hover:shadow-[0_0_35px_rgba(255,0,127,0.7)] border-t border-white/30",
    gold:
      "bg-gradient-to-r from-[#FFD700] via-[#FFB703] to-[#FB8500] text-black font-semibold shadow-neon-gold hover:shadow-[0_0_35px_rgba(255,215,0,0.7)] border-t border-white/50",
    turquoise:
      "bg-gradient-to-r from-[#00F5D4] via-[#01BAEF] to-[#0B525B] text-black font-semibold shadow-neon-cyber hover:shadow-[0_0_35px_rgba(0,245,212,0.7)] border-t border-white/40",
    glass:
      "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 hover:border-white/40 shadow-glass",
  };

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs font-medium rounded-full",
    md: "px-5 py-2.5 text-sm font-medium rounded-xl",
    lg: "px-7 py-3.5 text-base font-semibold rounded-2xl",
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`relative overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {/* Light-track hover spotlight */}
      {isHovered && (
        <span
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-60 transition-opacity duration-300"
          style={{
            background: `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.45), transparent 70%)`,
          }}
        />
      )}

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2 tracking-wide">
        {children}
      </span>
    </motion.button>
  );
}
