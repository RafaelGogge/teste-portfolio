"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Wrench,
  Mail,
  Menu,
  X,
  Settings,
  Accessibility,
  BookOpen,
} from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { LanguageSelector } from "./language-selector";
import { AccessibilityPanel } from "./accessibility-panel";
import { SettingsPanel } from "./settings-panel";

export function FloatingNav() {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "experience",
        "projects",
        "skills",
        "education",
        "courses",
        "contact",
      ];

      // Adjust scroll position to activate section slightly before it reaches the very top
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Dynamic hide/reveal logic for desktop navigation
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // Scrolling down and past a certain threshold
        setIsNavVisible(false);
      } else if (window.scrollY < lastScrollY || window.scrollY < 100) {
        // Scrolling up or near the top
        setIsNavVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { id: "home", icon: Home, label: t("nav.home") },
    { id: "about", icon: User, label: t("nav.about") },
    { id: "experience", icon: Briefcase, label: t("nav.experience") },
    { id: "projects", icon: Code, label: t("nav.projects") },
    { id: "skills", icon: Wrench, label: t("nav.skills") },
    { id: "education", icon: GraduationCap, label: t("nav.education") },
    { id: "courses", icon: BookOpen, label: t("nav.courses") },
    { id: "contact", icon: Mail, label: t("nav.contact") },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Mobile Menu Button - Always visible for better mobile UX */}
      <motion.button
        className="fixed top-4 right-4 z-50 p-2 bg-zinc-900/80 backdrop-blur-lg rounded-full border border-zinc-700/50 text-white md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Desktop Navigation */}
      <AnimatePresence>
        {isNavVisible && (
          <motion.nav
            className="fixed top-0 left-0 w-full z-40 hidden md:block bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800/50 py-4 px-6"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      activeSection === item.id
                        ? "text-white bg-white/10"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    } ${
                      item.id === "projects"
                        ? "font-bold text-blue-400 hover:text-blue-300"
                        : ""
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <SettingsPanel />
                <AccessibilityPanel />
                <LanguageSelector />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-lg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex flex-col items-center justify-center h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-4 mb-8">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
                      activeSection === item.id
                        ? "text-primary-foreground bg-primary/10"
                        : "text-foreground/70 hover:text-primary-foreground hover:bg-primary/5"
                    } ${
                      item.id === "projects"
                        ? "font-bold text-primary hover:text-primary/80"
                        : ""
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon size={20} />
                    <span className="text-lg font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-4">
                <AccessibilityPanel />
                <LanguageSelector />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Painel de Configurações */}
      <SettingsPanel />
    </>
  );
}
