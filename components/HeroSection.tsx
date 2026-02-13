"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, useAnimation } from 'framer-motion';

export default function HeroSection() {
  const { theme, themeName } = useTheme();
  const glitchControls = useAnimation();

  // Trigger glitch effect on theme change
  useEffect(() => {
    const triggerGlitch = async () => {
      await glitchControls.start({
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.2, ease: "linear" }
      });
    };
    triggerGlitch();
  }, [themeName, glitchControls]);

  return (
    <div className="flex flex-col items-center mb-4">
      {/* Hero Image Container */}
      <motion.div
        animate={glitchControls}
        className="mb-8 mt-2 relative"
      >
        {/* Scale & Rotate animation on mount, plus continuous Float/Rocking */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
          animate={{
            scale: 1,
            opacity: 1,
            rotate: [0, 2, 0, -2, 0], // Rocking/Subtle Rotation
            y: [0, -15, 0], // Float
          }}
          transition={{
            scale: { duration: 0.6, type: "spring", stiffness: 100 },
            opacity: { duration: 0.4 },
            rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative"
        >
          {/* Outer Glow Orb (Pulsing) */}
          <motion.div
            className="w-80 h-80 rounded-full absolute -top-12 -left-12 blur-3xl z-0"
            style={{ backgroundColor: theme.primary }}
            animate={{
              opacity: [0.1, 0.25, 0.1],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <img
            src={theme.heroImage}
            alt="Hero"
            className="w-56 h-56 md:w-72 md:h-72 rounded-[40px] object-cover border-2 relative z-10 shadow-2xl"
            style={{
              borderColor: `${theme.primary}50`,
              boxShadow: `0 0 50px ${theme.primary}30`
            }}
          />
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center px-4"
      >
        <div className="relative inline-block mb-4">
          <motion.h1
            className="text-[14vw] sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none relative z-10"
            style={{
              color: '#FFFFFF',
              textShadow: `0 0 30px ${theme.primary}40`,
            }}
            animate={{
              scale: [1, 1.01, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {themeName === 'hacker' ? 'Hacker' : 'Hacker'}
          </motion.h1>

          {/* Subtle Ghost/Reflection Text */}
          <h1
            className="text-[14vw] sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none absolute top-1 left-1 opacity-10 select-none z-0"
            style={{ color: theme.primary }}
          >
            {themeName === 'hacker' ? 'Hacker' : 'Hacker'}
          </h1>
        </div>

        <div
          className="h-1.5 w-24 mx-auto mb-4 rounded-full"
          style={{ backgroundColor: theme.primary }}
        />

        <p
          className="text-xl md:text-3xl font-black tracking-[0.4em] uppercase mb-4"
          style={{
            color: theme.primary,
            textShadow: `0 0 15px ${theme.primary}40`
          }}
        >
          {themeName === 'hacker' ? 'SYSTEM OVERRIDE' : 'ACCESS GRANTED'}
        </p>

        <p
          className="text-sm md:text-lg font-bold opacity-80 max-w-[280px] md:max-w-lg mx-auto leading-relaxed"
          style={{ color: theme.textSecondary }}
        >
          {themeName === 'hacker'
            ? 'Advanced neural interface for high-stakes operations.'
            : 'Decoding the matrix, one prompt at a time.'}
        </p>
      </motion.div>
    </div>
  );
}
