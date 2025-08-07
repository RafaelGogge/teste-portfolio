"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

interface AppContextType {
  // Accessibility states
  fontSize: number;
  setFontSize: (size: number) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (enabled: boolean) => void;

  // Language state
  language: string;
  setLanguage: (lang: string) => void;

  // ...existing code...
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Accessibility states
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Language state
  const [language, setLanguage] = useState("pt-BR");

  // ...existing code...

  // Apply accessibility settings
  useEffect(() => {
    // O tema dark é sempre aplicado por padrão no HTML
    document.documentElement.style.fontSize = `${fontSize}px`;
    document.documentElement.classList.toggle("high-contrast", highContrast);
    document.documentElement.classList.toggle("reduced-motion", reducedMotion);
  }, [fontSize, highContrast, reducedMotion]);

  const value: AppContextType = {
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    reducedMotion,
    setReducedMotion,
    language,
    setLanguage,
    // ...existing code...
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
