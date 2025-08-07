"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";

interface AccessibilityContextType {
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
  largeText: boolean;
  focusIndicators: boolean;
  soundEnabled: boolean;
  soundVolume: number;
  keyboardNavigation: boolean;
  screenReaderMode: boolean;
  announcements: string[];
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  toggleLargeText: () => void;
  toggleFocusIndicators: () => void;
  toggleSound: () => void;
  setSoundVolume: (volume: number) => void;
  toggleKeyboardNavigation: () => void;
  toggleScreenReaderMode: () => void;
  announceToScreenReader: (message: string) => void;
  playSound: (type: "click" | "success" | "error") => void;
  resetAccessibility: () => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export function AccessibilityProvider({
  children,
}: AccessibilityProviderProps) {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [focusIndicators, setFocusIndicators] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundVolume, setSoundVolumeState] = useState(0.5);
  const [keyboardNavigation, setKeyboardNavigation] = useState(true);
  const [screenReaderMode, setScreenReaderMode] = useState(false);
  const [announcements, setAnnouncements] = useState<string[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const savedSettings = localStorage.getItem("accessibility-settings");
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setFontSize(settings.fontSize || 16);
        setHighContrast(settings.highContrast || false);
        setReducedMotion(settings.reducedMotion || false);
        setLargeText(settings.largeText || false);
        setFocusIndicators(
          settings.focusIndicators !== undefined
            ? settings.focusIndicators
            : true
        );
        setSoundEnabled(
          settings.soundEnabled !== undefined ? settings.soundEnabled : true
        );
        setSoundVolumeState(settings.soundVolume || 0.5);
        setKeyboardNavigation(
          settings.keyboardNavigation !== undefined
            ? settings.keyboardNavigation
            : true
        );
        setScreenReaderMode(settings.screenReaderMode || false);
      } catch (error) {
        console.error("Error loading accessibility settings:", error);
      }
    }
  }, []);

  useEffect(() => {
    const settings = {
      fontSize,
      highContrast,
      reducedMotion,
      largeText,
      focusIndicators,
      soundEnabled,
      soundVolume,
      keyboardNavigation,
      screenReaderMode,
    };
    localStorage.setItem("accessibility-settings", JSON.stringify(settings));
  }, [
    fontSize,
    highContrast,
    reducedMotion,
    largeText,
    focusIndicators,
    soundEnabled,
    soundVolume,
    keyboardNavigation,
    screenReaderMode,
  ]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${fontSize}px`;

    if (highContrast) {
      root.setAttribute("data-high-contrast", "true");
    } else {
      root.removeAttribute("data-high-contrast");
    }

    if (reducedMotion) {
      root.setAttribute("data-reduced-motion", "true");
    } else {
      root.removeAttribute("data-reduced-motion");
    }

    if (largeText) {
      root.setAttribute("data-large-text", "true");
    } else {
      root.removeAttribute("data-large-text");
    }

    if (focusIndicators) {
      root.setAttribute("data-focus-indicators", "true");
    } else {
      root.removeAttribute("data-focus-indicators");
    }

    if (keyboardNavigation) {
      root.setAttribute("data-keyboard-navigation", "true");
    } else {
      root.removeAttribute("data-keyboard-navigation");
    }

    if (screenReaderMode) {
      root.setAttribute("data-screen-reader", "true");
    } else {
      root.removeAttribute("data-screen-reader");
    }
  }, [
    fontSize,
    highContrast,
    reducedMotion,
    largeText,
    focusIndicators,
    keyboardNavigation,
    screenReaderMode,
  ]);

  const initAudioContext = () => {
    if (!audioContextRef.current && soundEnabled) {
      try {
        audioContextRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      } catch (error) {
        console.warn("Web Audio API not supported:", error);
      }
    }
  };

  const increaseFontSize = () => {
    setFontSize((prev: number) => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize((prev: number) => Math.max(prev - 2, 12));
  };

  const toggleHighContrast = () => {
    setHighContrast((prev: boolean) => !prev);
  };

  const toggleReducedMotion = () => {
    setReducedMotion((prev: boolean) => !prev);
  };

  const toggleLargeText = () => {
    setLargeText((prev: boolean) => !prev);
  };

  const toggleFocusIndicators = () => {
    setFocusIndicators((prev: boolean) => !prev);
  };

  const toggleSound = () => {
    setSoundEnabled((prev: boolean) => !prev);
  };

  const setSoundVolume = (volume: number) => {
    setSoundVolumeState(Math.max(0, Math.min(1, volume)));
  };

  const toggleKeyboardNavigation = () => {
    setKeyboardNavigation((prev: boolean) => !prev);
  };

  const toggleScreenReaderMode = () => {
    setScreenReaderMode((prev: boolean) => !prev);
  };

  const announceToScreenReader = (message: string) => {
    setAnnouncements((prev: string[]) => [...prev, message]);

    setTimeout(() => {
      setAnnouncements((prev: string[]) => prev.slice(1));
    }, 3000);
  };

  const playSound = (type: "click" | "success" | "error") => {
    if (!soundEnabled || !audioContextRef.current) {
      initAudioContext();
      return;
    }

    try {
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      let frequency = 800;
      let duration = 0.1;

      switch (type) {
        case "click":
          frequency = 800;
          duration = 0.1;
          break;
        case "success":
          frequency = 1000;
          duration = 0.2;
          break;
        case "error":
          frequency = 400;
          duration = 0.3;
          break;
      }

      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      gainNode.gain.setValueAtTime(soundVolume * 0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        ctx.currentTime + duration
      );

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (error) {
      console.warn("Error playing sound:", error);
    }
  };

  const resetAccessibility = () => {
    setFontSize(16);
    setHighContrast(false);
    setReducedMotion(false);
    setLargeText(false);
    setFocusIndicators(true);
    setSoundEnabled(true);
    setSoundVolumeState(0.5);
    setKeyboardNavigation(true);
    setScreenReaderMode(false);
    setAnnouncements([]);
  };

  const value: AccessibilityContextType = {
    fontSize,
    highContrast,
    reducedMotion,
    largeText,
    focusIndicators,
    soundEnabled,
    soundVolume,
    keyboardNavigation,
    screenReaderMode,
    announcements,
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
    toggleReducedMotion,
    toggleLargeText,
    toggleFocusIndicators,
    toggleSound,
    setSoundVolume,
    toggleKeyboardNavigation,
    toggleScreenReaderMode,
    announceToScreenReader,
    playSound,
    resetAccessibility,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      {announcements.length > 0 && (
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          role="status"
        >
          {announcements[announcements.length - 1]}
        </div>
      )}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );
  }
  return context;
}
