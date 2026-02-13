"use client";

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

export default function AnimatedBackground({ children }: { children: React.ReactNode }) {
  const { theme, themeName } = useTheme();

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: theme.background }}>
      {/* Background Gradient - more immersive */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${theme.name === 'deadpool' ? 'rgba(230, 36, 41, 0.08)' : 'rgba(0, 255, 65, 0.05)'} 0%, transparent 70%), 
                     linear-gradient(to bottom right, ${theme.background}, ${theme.name === 'deadpool' ? 'rgba(139, 0, 0, 0.1)' : 'rgba(0, 20, 10, 0.1)'}, ${theme.background})`
        }}
      />

      {/* Pulsing Glow Orb - 3s pulse loop as per spec */}
      <motion.div
        className="absolute top-[15%] left-1/2 -ml-[250px] w-[500px] h-[500px] rounded-full pointer-events-none blur-[100px] z-0"
        style={{ backgroundColor: theme.glow }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Additional subtle noise/texture could go here */}

      {/* Hacker Scan Line - Vertical scanning effect */}
      {themeName === 'hacker' && (
        <motion.div
          className="absolute left-0 right-0 h-[3px] opacity-30 pointer-events-none z-20"
          style={{
            background: `linear-gradient(to bottom, transparent, ${theme.primary}, transparent)`,
            boxShadow: `0 0 15px ${theme.primary}`
          }}
          initial={{ top: "-10%" }}
          animate={{ top: "110%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}

      {/* Content Wrapper */}
      <motion.div
        className="relative z-10 w-full min-h-screen flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full flex-1 flex flex-col items-center">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
