"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { THEMES, ThemeType, ThemeName } from '../constants/themes';

const THEME_STORAGE_KEY = 'app_theme';

interface ThemeContextType {
  theme: ThemeType;
  themeName: ThemeName;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('deadpool');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName;
    if (saved === 'hacker' || saved === 'deadpool') {
      setThemeName(saved);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsTransitioning(true);
    // Simple timeout to simulate transition if needed, or just switch
    setTimeout(() => {
      const newTheme = themeName === 'deadpool' ? 'hacker' : 'deadpool';
      setThemeName(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setIsTransitioning(false);
    }, 300); // 300ms matches existing animation roughly
  }, [themeName]);

  const theme = THEMES[themeName];

  // Prevent hydration mismatch by rendering nothing or default until mounted
  // mostly important if we care about matching server HTML exactly.
  // For now simple return.
  return (
    <ThemeContext.Provider value={{ theme, themeName, toggleTheme, isTransitioning }}>
      {/* 
        Render children always so they have access to context. 
        We use 'mounted' to optionally hide content to prevent theme flicker, 
        but for now let's just render. 
      */}
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
