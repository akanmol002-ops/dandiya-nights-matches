"use client";

import { useEffect, useRef } from "react";

interface GarbaAudioVisualizerProps {
  isPlaying: boolean;
}

export default function GarbaAudioVisualizer({ isPlaying }: GarbaAudioVisualizerProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Play a rhythmic Gujarati Garba Dhol pattern using Web Audio API
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.suspend();
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;

      // Synthesize a punchy Dhol bass hit (Dhum)
      const playDholBass = (time: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(140, time);
        osc.frequency.exponentialRampToValueAtTime(45, time + 0.18);

        gain.gain.setValueAtTime(0.35, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.26);
      };

      // Synthesize a sharp Dandiya wooden / treble strike (Tak / Chhakk)
      const playDandiyaStrike = (time: number, freq: number = 880) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.5, time + 0.08);

        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.09);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.1);
      };

      // 4-step Garba rhythmic loop (BPM ~130 => ~460ms per beat)
      let step = 0;
      const beatInterval = 230; // 8th note subdivisions

      timerRef.current = setInterval(() => {
        const now = ctx.currentTime;
        // Beat 1: Dhol Heavy Bass + Stick
        if (step === 0) {
          playDholBass(now);
          playDandiyaStrike(now, 1050);
        }
        // Beat 2: Dandiya Tap
        else if (step === 1) {
          playDandiyaStrike(now, 1400);
        }
        // Beat 3: Syncopated Dhol slap
        else if (step === 2) {
          playDholBass(now);
        }
        // Beat 4: High pitch stick click
        else if (step === 3) {
          playDandiyaStrike(now, 1700);
        }

        step = (step + 1) % 4;
      }, beatInterval);

    } catch (err) {
      console.warn("Audio playback not supported or user gesture needed", err);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  return null;
}
