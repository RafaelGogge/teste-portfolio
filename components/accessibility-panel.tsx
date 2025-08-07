"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accessibility,
  Eye,
  EyeOff,
  Type,
  Volume2,
  VolumeX,
  Zap,
  RotateCcw,
  X,
  Plus,
  Minus,
  Contrast,
  MousePointer,
  Keyboard,
  Speaker,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAccessibility } from "@/hooks/use-accessibility";

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    fontSize,
    highContrast,
    reducedMotion,
    largeText,
    focusIndicators,
    soundEnabled,
    soundVolume,
    keyboardNavigation,
    screenReaderMode,
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
    resetAccessibility,
    announceToScreenReader,
    playSound,
  } = useAccessibility();

  const handleToggle = (
    action: () => void,
    soundType: "click" | "success" = "click"
  ) => {
    action();
    playSound && playSound(soundType);
  };

  const accessibilityFeatures = [
    {
      id: "font-size",
      label: "Tamanho da Fonte",
      description: `Atual: ${fontSize}px`,
      icon: Type,
      type: "control" as const,
      controls: (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleToggle(decreaseFontSize)}
            aria-label="Diminuir fonte"
            disabled={fontSize <= 12}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="min-w-[3rem] text-center text-sm font-medium">
            {fontSize}px
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleToggle(increaseFontSize)}
            aria-label="Aumentar fonte"
            disabled={fontSize >= 24}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
    {
      id: "high-contrast",
      label: "Alto Contraste",
      description: "Aumenta o contraste para melhor legibilidade",
      icon: Contrast,
      active: highContrast,
      action: () => handleToggle(toggleHighContrast, "success"),
    },
    {
      id: "large-text",
      label: "Texto Grande",
      description: "Aumenta o tamanho geral do texto",
      icon: Type,
      active: largeText,
      action: () => handleToggle(toggleLargeText, "success"),
    },
    {
      id: "reduced-motion",
      label: "Movimento Reduzido",
      description: "Reduz animações para usuários sensíveis",
      icon: Zap,
      active: reducedMotion,
      action: () => handleToggle(toggleReducedMotion, "success"),
    },
    {
      id: "focus-indicators",
      label: "Indicadores de Foco",
      description: "Destaca elementos focados",
      icon: MousePointer,
      active: focusIndicators,
      action: () => handleToggle(toggleFocusIndicators, "success"),
    },
    {
      id: "keyboard-navigation",
      label: "Navegação por Teclado",
      description: "Otimizada para navegação via teclado",
      icon: Keyboard,
      active: keyboardNavigation,
      action: () => handleToggle(toggleKeyboardNavigation, "success"),
    },
    {
      id: "screen-reader",
      label: "Modo Leitor de Tela",
      description: "Otimizações para leitores de tela",
      icon: Speaker,
      active: screenReaderMode,
      action: () => handleToggle(toggleScreenReaderMode, "success"),
    },
    {
      id: "sound",
      label: "Efeitos Sonoros",
      description: "Sons de feedback para interações",
      icon: soundEnabled ? Volume2 : VolumeX,
      active: soundEnabled,
      action: () => handleToggle(toggleSound, "success"),
    },
    {
      id: "sound-volume",
      label: "Volume do Som",
      description: `Volume: ${Math.round(soundVolume * 100)}%`,
      icon: Volume2,
      type: "control" as const,
      controls: (
        <div className="flex items-center gap-2 w-32">
          <VolumeX className="w-4 h-4 text-muted-foreground" />
          <Slider
            value={[soundVolume]}
            onValueChange={(value) => {
              setSoundVolume(value[0]);
              playSound && playSound("click");
            }}
            max={1}
            min={0}
            step={0.1}
            className="flex-1"
            disabled={!soundEnabled}
          />
          <Volume2 className="w-4 h-4 text-muted-foreground" />
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Botão de Acessibilidade na Navbar */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setIsOpen(true);
          playSound && playSound("click");
          announceToScreenReader &&
            announceToScreenReader("Painel de acessibilidade aberto");
        }}
        className="rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Abrir painel de acessibilidade"
        title="Configurações de Acessibilidade"
      >
        <Accessibility className="h-4 w-4" />
      </Button>

      {/* Modal do Painel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Painel */}
            <motion.div
              initial={{ opacity: 0, x: -300, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -300, scale: 0.9 }}
              className="fixed left-6 top-1/2 -translate-y-1/2 w-96 max-w-[calc(100vw-3rem)] bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-blue-600/10 to-purple-600/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <Accessibility className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Acessibilidade</h2>
                    <p className="text-sm text-muted-foreground">
                      Personalize sua experiência
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsOpen(false);
                    playSound && playSound("click");
                    announceToScreenReader &&
                      announceToScreenReader(
                        "Painel de acessibilidade fechado"
                      );
                  }}
                  aria-label="Fechar painel"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Conteúdo */}
              <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
                {accessibilityFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={`p-2 rounded-lg transition-colors ${
                          feature.active
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <feature.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{feature.label}</h3>
                        <p className="text-xs text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {feature.type === "control" ? (
                      feature.controls
                    ) : (
                      <Button
                        size="sm"
                        variant={feature.active ? "default" : "outline"}
                        onClick={feature.action}
                        className="shrink-0"
                        aria-pressed={feature.active}
                      >
                        {feature.active ? "Ativo" : "Inativo"}
                      </Button>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-6 border-t border-border bg-muted/20">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    resetAccessibility();
                    playSound && playSound("success");
                    announceToScreenReader &&
                      announceToScreenReader("Configurações restauradas");
                  }}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restaurar
                </Button>
                <p className="text-xs text-muted-foreground">
                  Configurações salvas automaticamente
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
