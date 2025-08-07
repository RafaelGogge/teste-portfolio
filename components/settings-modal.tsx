"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Eye,
  Contrast,
  MousePointer,
  Keyboard,
  Speaker,
  Type,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/hooks/use-accessibility";

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: AccessibilityModalProps) {
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
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Contrast className="w-5 h-5" />
                  <div>
                    <h4 className="font-medium">Alto Contraste</h4>
                    <p className="text-sm text-muted-foreground">
                      Aumenta o contraste para melhor legibilidade
                    </p>
                  </div>
                </div>
                <Button
                  variant={highContrast ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    toggleHighContrast();
                    playSound && playSound("success");
                  }}
                >
                  {highContrast ? "Ativo" : "Inativo"}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Type className="w-5 h-5" />
                  <div>
                    <h4 className="font-medium">Texto Grande</h4>
                    <p className="text-sm text-muted-foreground">
                      Aumenta o tamanho geral do texto
                    </p>
                  </div>
                </div>
                <Button
                  variant={largeText ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    toggleLargeText();
                    playSound && playSound("success");
                  }}
                >
                  {largeText ? "Ativo" : "Inativo"}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <MousePointer className="w-5 h-5" />
                  <div>
                    <h4 className="font-medium">Indicadores de Foco</h4>
                    <p className="text-sm text-muted-foreground">
                      Destaca elementos focados
                    </p>
                  </div>
                </div>
                <Button
                  variant={focusIndicators ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    toggleFocusIndicators();
                    playSound && playSound("success");
                  }}
                >
                  {focusIndicators ? "Ativo" : "Inativo"}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Keyboard className="w-5 h-5" />
                  <div>
                    <h4 className="font-medium">Navegação por Teclado</h4>
                    <p className="text-sm text-muted-foreground">
                      Otimizada para navegação via teclado
                    </p>
                  </div>
                </div>
                <Button
                  variant={keyboardNavigation ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    toggleKeyboardNavigation();
                    playSound && playSound("success");
                  }}
                >
                  {keyboardNavigation ? "Ativo" : "Inativo"}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Speaker className="w-5 h-5" />
                  <div>
                    <h4 className="font-medium">Modo Leitor de Tela</h4>
                    <p className="text-sm text-muted-foreground">
                      Otimizações para leitores de tela
                    </p>
                  </div>
                </div>
                <Button
                  variant={screenReaderMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    toggleScreenReaderMode();
                    playSound && playSound("success");
                  }}
                >
                  {screenReaderMode ? "Ativo" : "Inativo"}
                </Button>
              </div>
            </div>
          </div>
        );

      case "audio":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
                <div>
                  <h4 className="font-medium">Efeitos Sonoros</h4>
                  <p className="text-sm text-muted-foreground">
                    Sons de feedback para interações
                  </p>
                </div>
              </div>
              <Button
                variant={soundEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  toggleSound();
                  playSound && playSound("success");
                }}
              >
                {soundEnabled ? "Ativo" : "Inativo"}
              </Button>
            </div>

            {soundEnabled && (
              <div className="p-4 rounded-lg border border-border">
                <h4 className="font-medium mb-4">Volume dos Sons</h4>
                <div className="flex items-center gap-4">
                  <VolumeX className="w-4 h-4" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={soundVolume}
                    onChange={(e) => setSoundVolume(Number(e.target.value))}
                    className="flex-1"
                  />
                  <Volume2 className="w-4 h-4" />
                  <span className="min-w-[3rem] text-sm">
                    {Math.round(soundVolume * 100)}%
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => playSound && playSound("click")}
                >
                  Testar Som
                </Button>
              </div>
            )}
          </div>
        );

      case "performance":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5" />
                <div>
                  <h4 className="font-medium">Movimento Reduzido</h4>
                  <p className="text-sm text-muted-foreground">
                    Reduz animações para usuários sensíveis ou melhor
                    performance
                  </p>
                </div>
              </div>
              <Button
                variant={reducedMotion ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  toggleReducedMotion();
                  playSound && playSound("success");
                }}
              >
                {reducedMotion ? "Ativo" : "Inativo"}
              </Button>
            </div>
          </div>
        );

      case "system":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Idioma</h3>
              <div className="flex gap-2">
                <Button
                  variant={language === "pt" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setLanguage("pt");
                    playSound && playSound("click");
                  }}
                >
                  🇧🇷 Português
                </Button>
                <Button
                  variant={language === "en" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setLanguage("en");
                    playSound && playSound("click");
                  }}
                >
                  🇺🇸 English
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Backup e Restauração
              </h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={exportSettings}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Configurações
                </Button>

                <div>
                  <input
                    type="file"
                    accept=".json"
                    onChange={importSettings}
                    className="hidden"
                    id="import-settings"
                  />
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() =>
                      document.getElementById("import-settings")?.click()
                    }
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Importar Configurações
                  </Button>
                </div>

                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive"
                  onClick={() => {
                    resetAccessibility();
                    setLanguage("pt");
                    playSound && playSound("success");
                    announceToScreenReader &&
                      announceToScreenReader(
                        "Todas as configurações foram restauradas"
                      );
                  }}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restaurar Padrões
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[85vh] bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Configurações</h2>
                  <p className="text-sm text-muted-foreground">
                    Personalize sua experiência
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex h-[calc(85vh-120px)]">
              {/* Sidebar */}
              <div className="w-64 bg-muted/10 border-r border-border p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                      whileHover={{ x: activeTab === tab.id ? 0 : 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <tab.icon className="w-5 h-5" />
                      <div>
                        <p className="font-medium">{tab.label}</p>
                        <p className="text-xs opacity-70">{tab.description}</p>
                      </div>
                    </motion.button>
                  ))}
                </nav>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderTabContent()}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
