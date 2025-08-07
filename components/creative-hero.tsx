"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  X,
  FileText,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useI18n } from "@/hooks/use-i18n";
import { TypewriterEffect } from "./typewriter-effect";

export function CreativeHero() {
  const { t, locale } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [openCVModal, setOpenCVModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-background scanlines pt-20">
      {/* Floating Code Effect */}
      {/* <FloatingCode /> */}

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-30 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-primary to-primary/80 p-1 animate-float hover-glow"
          >
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-4xl font-bold text-foreground animate-pulse-glow">
              RG
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-primary text-lg mb-2 font-mono tracking-wider"
          >
            {">"} console.log("Hello, World!");
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-foreground mb-4 transition-all duration-700"
          >
            Rafael Vieira Gogge
          </motion.h1>

          {/* Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mb-6"
          >
            <TypewriterEffect
              texts={[
                "Desenvolvedor Frontend",
                "Especialista em UX/UI",
                "Arquiteto de Interfaces",
              ]}
              className="text-2xl md:text-3xl text-foreground/80 font-mono tracking-wide"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Desenvolvedor Frontend especializado em criar{" "}
            <span className="text-foreground font-medium">
              experiências digitais intuitivas
            </span>{" "}
            e{" "}
            <span className="text-foreground font-medium">
              interfaces acessíveis
            </span>
            , focado em usabilidade e impacto social no setor público.
          </motion.p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Dialog open={openCVModal} onOpenChange={setOpenCVModal}>
            <DialogTrigger asChild>
              <Button
                variant="default"
                size="lg"
                className="gap-2 bg-primary text-primary-foreground border-0 shadow-xl hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary transition-all duration-200"
                aria-label={t("nav.resume")}
                data-testid="cv-download-btn"
                style={{ boxShadow: '0 4px 24px 0 rgba(80, 70, 229, 0.25)' }}
              >
                <Download className="h-5 w-5" />
                {t("nav.resume")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm text-center bg-background border-0 shadow-2xl p-8 rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-foreground mb-2 flex flex-col items-center gap-2">
                  <Download className="h-8 w-8 text-primary mb-1 animate-bounce" />
                  {locale === "en" ? "Download your CV" : "Download do Currículo"}
                </DialogTitle>
              </DialogHeader>
              <p className="text-foreground/80 mb-6 text-base">
                {locale === "en"
                  ? "Choose your preferred language to download the CV."
                  : "Escolha o idioma desejado para baixar o currículo."}
              </p>
              <div className="flex flex-col gap-4">
                <a
                  href="/curriculos/Curriculo_RafaelGogge.pdf"
                  download="Rafael_Gogge_CV_pt-BR.pdf"
                  className={`flex items-center justify-center gap-3 w-full px-5 py-3 rounded-lg font-semibold text-lg border-2 transition-all duration-200 shadow-sm hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary ${locale === "pt-BR" ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:bg-primary/80 hover:text-primary-foreground hover:border-primary"}`}
                  onClick={() => setOpenCVModal(false)}
                >
                  <span className="text-2xl">🇧🇷</span> Português
                  {locale === "pt-BR" && <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">Recomendado</span>}
                </a>
                <a
                  href="/curriculos/Curriculum_RafaelGogge.pdf"
                  download="Rafael_Gogge_CV_en.pdf"
                  className={`flex items-center justify-center gap-3 w-full px-5 py-3 rounded-lg font-semibold text-lg border-2 transition-all duration-200 shadow-sm hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary ${locale === "en" ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:bg-primary/80 hover:text-primary-foreground hover:border-primary"}`}
                  onClick={() => setOpenCVModal(false)}
                >
                  <span className="text-2xl">🇺🇸</span> English
                  {locale === "en" && <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">Recommended</span>}
                </a>
              </div>
              <DialogClose asChild>
                <Button variant="ghost" className="mt-6 w-full text-foreground hover:text-primary hover:bg-background transition-all duration-200">
                  {locale === "en" ? "Close" : "Fechar"}
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex justify-center space-x-6 mb-12"
        >
          <motion.a
            href="https://github.com/rafaelgogge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-primary transition-colors duration-300"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className="h-6 w-6" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/rafaelgogge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-primary transition-colors duration-300"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin className="h-6 w-6" />
          </motion.a>
          <motion.a
            href="mailto:dev.rafaelgogge@gmail.com"
            className="text-foreground/60 hover:text-primary transition-colors duration-300"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Mail className="h-6 w-6" />
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <p className="text-foreground/50 text-sm mb-2 font-mono">
            {">"} {t("hero.scrollDown")}
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="cursor-pointer text-foreground/60 hover:text-primary transition-colors"
            onClick={() => scrollToSection("about")}
          >
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
